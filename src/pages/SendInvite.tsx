import { AddLink, ContentCopy } from '@mui/icons-material';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { SelectDays } from '../components/SendInvite/SelectDays.tsx';
import { SelectGuest } from '../components/SendInvite/SelectGuest.tsx';
import { SelectHours } from '../components/SendInvite/SelectHours.tsx';
import { SelectMaxTime } from '../components/SendInvite/SelectMaxTime.tsx';
import { SelectPassengers } from '../components/SendInvite/SelectPassengers.tsx';
import { SwitchDrop } from '../components/SendInvite/SwitchDrop.tsx';
import { createInvite } from '../data/Reducers.tsx';
import { frontUrls } from '../data/Urls.tsx';
import Alert from '@mui/material/Alert';
import { SelectDescription } from '../components/SendInvite/SelectDescription.tsx';
import { useNavigate } from 'react-router-dom';


export function SendInvite() {

    const base_url = frontUrls.wholeBase + frontUrls.publicInvite;

    const navigate = useNavigate();

    interface NewInvite extends Partial<Invite> {}

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

    const [openSnackCreated, setOpenSnackCreated] = useState<boolean>(false);

    useEffect( () => {

        document.title = 'QRSec - Crear invitación';

    }, [ ]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        let invite : NewInvite = {
            description: description,
            guests: guests,
            days: days,
            hours: hours.filter( (hour) => hour.length > 0 ),
            maxTimeAllowed: maxTime,
            numberOfPassengers: passengers,
            dropsTrueGuest: drop
        };

        await createInvite(invite as Invite)
            .then( (createdInvite) => {
                if (createdInvite !== null) {
                    setUrl(base_url + createdInvite.id);
                    setOpenSnackCreated(true);
                    handleClickOpen();
                } else {
                    setOpenSnackCreated(true);
                    setTimeout(function(){
                        navigate(frontUrls.base + frontUrls.invite);
                    }, 2000);
                }
            } );

    };

    const handleCopy = () => {
        setOpen(false);
        setOpenSnackCopied(true);
        navigator.clipboard.writeText(url);
		navigate(frontUrls.base + frontUrls.invite);
    };

    return (
        <Fragment>

            <SelectDescription description={ description } setDescription={ setDescription } />
            <SelectGuest guests={ guests } setGuests={ setGuests }/>
            <SelectDays days={ days } setDays={ setDays }/>
            <SelectHours hours={ hours } setHours={ setHours }/>
            <SelectMaxTime maxTime={ maxTime } setMaxTime={ setMaxTime }/>
            <SelectPassengers passengers={ passengers } setPassengers={ setPassengers }/>
            <SwitchDrop drop={ drop } setDrop={ setDrop }/>

            <Card elevation={6} id='card' className='card-send'>
                <Button variant='contained' id='button-send' startIcon={ <AddLink fontSize='large'/> } onClick={ handleCreate }>Generar link</Button>
            </Card>

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
                open={ openSnackCreated }
                onClose={ () => setOpenSnackCreated(false) }
                autoHideDuration={ 2000 }
            >
                {url !== '' ? (
                    <Alert severity='success'>
                        Invitación creada!
                    </Alert>
                ) :
                    <Alert severity='error'>
                        Error creando la invitación.
                    </Alert>
                }
            </Snackbar>

        </Fragment>
    );
}
