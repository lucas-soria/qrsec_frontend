import React, { Fragment, useEffect, useState } from 'react'
import { Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@mui/material'
import { AddLink, ContentCopy } from '@mui/icons-material'
import { SelectGuest } from '../components/SendInvite/SelectGuest'
import { SelectDays } from '../components/SendInvite/SelectDays'
import { SelectHours } from '../components/SendInvite/SelectHours'
import { SelectMaxTime } from '../components/SendInvite/SelectMaxTime'
import { SelectPassengers } from '../components/SendInvite/SelectPassengers'
import { SwitchDrop } from '../components/SendInvite/SwitchDrop'
import { createInvite } from '../data/Reducers'
import { frontUrls } from '../data/Urls'

export function SendInvite() {

    const base_url = frontUrls.wholeBase + frontUrls.view;

    var invite = {};

    const [guests, setGuests] = useState([]);
    
    const [days, setDays] = useState([]);

    const [hours, setHours] = useState([ [] ]);

    const [maxTime, setMaxTime] = useState();

    const [passengers, setPassengers] = useState(0);

    const [drop, setDrop] = useState(false);

    const [url, setUrl] = useState('');

    const [open, setOpen] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);

    useEffect( () => {

        document.title = 'QRSec - Crear invitación';

    }, [ ])

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        invite['guests'] = guests;
        invite['days'] = days,
        invite['hours'] = hours.filter( (hour) => hour.length > 0 );
        invite['maxTimeAllowed'] = maxTime;
        invite['numberOfPassengers'] = passengers;
        invite['dropsTrueGuest'] = drop;
        await createInvite(invite).then( (createInvite) => setUrl(base_url + createInvite.id) );
        handleClickOpen();
    }

    const handleCopy = () => {
        setOpenSnack(true);
        navigator.clipboard.writeText(url);
    }

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
                message='Copiado al portapapeles!'
            />

        </Fragment>
    )
}
