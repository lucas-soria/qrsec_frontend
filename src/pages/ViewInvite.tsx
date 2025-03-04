import { AddLink, ContentCopy } from '@mui/icons-material';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectDays } from '../components/SendInvite/SelectDays.tsx';
import { SelectDescription } from '../components/SendInvite/SelectDescription.tsx';
import { SelectGuest } from '../components/SendInvite/SelectGuest.tsx';
import { SelectHours } from '../components/SendInvite/SelectHours.tsx';
import { SelectMaxTime } from '../components/SendInvite/SelectMaxTime.tsx';
import { SelectPassengers } from '../components/SendInvite/SelectPassengers.tsx';
import { SwitchDrop } from '../components/SendInvite/SwitchDrop.tsx';
import { getInvite, updateInvite } from '../data/Reducers.tsx';
import { frontUrls } from '../data/Urls.tsx';


export function ViewInvite() { 

    const { id } = useParams();

	const [invite, setInvite] = useState<Invite>();

	const base_url = frontUrls.wholeBase + frontUrls.publicInvite;

	const navigate = useNavigate();

    const [description, setDescription] = useState<string>('');

	const [guests, setGuests] = useState<Guest[]>([]);
    
    const [days, setDays] = useState<string[]>([]);

    const [hours, setHours] = useState<string[][]>([ [] ]);

    const [maxTime, setMaxTime] = useState<number|null>(null);

    const [passengers, setPassengers] = useState<number>(0);

    const [drop, setDrop] = useState<boolean>(false);

	const [url, setUrl] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);

    const [openSnackCopied, setOpenSnackCopied] = useState<boolean>(false);

	const [openSnackUpdated, setOpenSnackUpdated] = useState<boolean>(false);

	let authoritiesString : string = localStorage.getItem('authorities') ?? '';
    let authorities : string[] = authoritiesString.split(',');
	const OWNER = 'OWNER';

	useEffect( () => {

		const setInitialValues = async () => {

			let invite = await getInvite(id);
			if (invite === null) {
                setOpenSnackUpdated(true);
				setTimeout(function(){
					navigate(frontUrls.base + frontUrls.invite);
				}, 2000);
            }

			setInvite(invite);
			if (invite !== null) {
				setDescription(invite.description);
				setGuests(invite.guests as Guest[]);
				setDays(invite.days);
				setHours(invite.hours.length === 0 ? [ [] ] : invite.hours);
				setMaxTime(invite.maxTimeAllowed);
				setPassengers(invite.numberOfPassengers);
				setDrop(invite.dropsTrueGuest);
			}
		
		};

		document.title = 'QRSec - Ver invitación';
		setInitialValues();

	}, [ id, navigate ]);

	const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
		if (!!invite) {
			let inviteToUpdate = invite;
			inviteToUpdate.description = description;
			inviteToUpdate.guests = guests;
			inviteToUpdate.days = days;
			inviteToUpdate.hours = hours.filter( (hour) => hour.length > 0 );
			inviteToUpdate.maxTimeAllowed = maxTime;
			inviteToUpdate.numberOfPassengers =  passengers;
			inviteToUpdate.dropsTrueGuest = drop;

			await updateInvite(inviteToUpdate)
				.then( (updatedInvite) => {
					if (updatedInvite !== null) {
						setUrl(base_url + id);
						setOpenSnackUpdated(true);
						handleClickOpen();
					} else {
						setOpenSnackUpdated(true);
						setTimeout(function(){
							navigate(frontUrls.base + frontUrls.invite);
						}, 2000);
					}
				} );
		}
    };

    const handleCopy = () => {
		setOpen(false);
        setOpenSnackCopied(true);
		setTimeout(function(){
			navigator.clipboard.writeText(url);
			navigate(frontUrls.base + frontUrls.invite);
		}, 2000);
    };

    return (
		<Fragment>

			<SelectDescription description={ description ? description : '' } setDescription={ setDescription } />
			<SelectGuest guests={ guests ? guests : [] } setGuests={ setGuests }/>
			<SelectDays days={ days } setDays={ setDays }/>
			<SelectHours hours={ hours } setHours={ setHours }/>
			<SelectMaxTime maxTime={ maxTime } setMaxTime={ setMaxTime }/>
			<SelectPassengers passengers={ passengers } setPassengers={ setPassengers }/>
			<SwitchDrop drop={ drop } setDrop={ setDrop }/>

			<>
				{ authorities.includes(OWNER) ? (
					<Card elevation={6} id='card' className='card-send'>
						<Button variant='contained' id='button-send' startIcon={ <AddLink fontSize='large'/> } onClick={ handleUpdate }>Guardar</Button>
					</Card>
				) :
					<></>
				}
			</>

			<Dialog open={open} onClose={ handleClose }>
				<DialogTitle id='responsive-dialog-title'>Copiá y compartí la invitación!</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ 
							overflow: 'hidden', 
							textOverflow: 'ellipsis', 
							whiteSpace: 'nowrap', 
							display: 'inline-block', 
							maxWidth: '100%' 
						}}
					>
						{url}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' startIcon={ <ContentCopy fontSize='large'/> } onClick={ handleCopy }>Copiar</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={ openSnackCopied }
				onClose={ () => setOpenSnackCopied(false) }
				autoHideDuration={ 2000 }
			>
				<Alert severity='success'>
					Copiado al portapapeles!
				</Alert>
			</Snackbar>

			<Snackbar
				open={ openSnackUpdated }
				onClose={ () => setOpenSnackUpdated(false) }
				autoHideDuration={ 2000 }
			>
				{url !== '' ? (
					<Alert severity='success'>
						Invitación actualizada!
					</Alert>
				) :
					<Alert severity='error'>
						Error actualizando la invitación.
					</Alert>
				}
			</Snackbar>

		</Fragment>
				
    );
}
