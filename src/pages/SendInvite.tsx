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


export function SendInvite() {

    const base_url = frontUrls.wholeBase + frontUrls.view;

    let invite : Invite;

    const [guests, setGuests] = useState<Guest[]>([]);
    
    const [days, setDays] = useState<string[]>([]);

    const [hours, setHours] = useState<string[][]>([ [] ]);

    const [maxTime, setMaxTime] = useState<number|null>(null);

    const [passengers, setPassengers] = useState<number>(0);

    const [drop, setDrop] = useState<boolean>(false);

    const [url, setUrl] = useState<string>('');

    const [open, setOpen] = useState<boolean>(false);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

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
        invite.guests = guests;
        invite.days = days;
        invite.hours = hours.filter( (hour) => hour.length > 0 );
        invite.maxTimeAllowed = maxTime;
        invite.numberOfPassengers = passengers;
        invite.dropsTrueGuest = drop;
        await createInvite(invite).then( (createInvite) => setUrl(base_url + createInvite.id) );
        handleClickOpen();
    };

    const handleCopy = () => {
        setOpenSnack(true);
        navigator.clipboard.writeText(url);
    };

    return (
        <Fragment>

            <SelectGuest guests={ guests } setGuests={ setGuests }/>
            <SelectDays days={ days } setDays={ setDays }/>
            <SelectHours hours={ hours } setHours={ setHours }/>
            <SelectMaxTime setMaxTime={ setMaxTime }/>
            <SelectPassengers setPassengers={ setPassengers }/>
            <SwitchDrop setDrop={ setDrop }/>

            <Card elevation={6} id='card' className='card-send'>
                <Button variant='contained' id='button-send' startIcon={ <AddLink fontSize='large'/> } onClick={ handleCreate }>Generar link</Button>
            </Card>

            <Dialog open={open} onClose={ handleClose }>
                <DialogTitle id='responsive-dialog-title'>Copiá y compartí la invitación!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {url} <Button variant='contained' startIcon={ <ContentCopy fontSize='large'/> } onClick={ handleCopy }>Copiar</Button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={ handleClose } autoFocus>Hecho</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={ openSnack }
                onClose={ () => setOpenSnack(false) }
                autoHideDuration={ 2000 }
            >
                <Alert severity='success'>
                    Copiado al portapapeles!
                </Alert>
            </Snackbar>

        </Fragment>
    );
}
