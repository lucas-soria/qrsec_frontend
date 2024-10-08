import { PersonAdd } from '@mui/icons-material';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import { createGuest } from '../../data/Reducers.tsx';


export function CreateGuest( { open, setOpen } : { open : boolean, setOpen : React.Dispatch<React.SetStateAction<boolean>> } ) {

    const [dni, setDNI] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');

    const [lastName, setLastName] = useState<string>('');

	const [phone, setPhone] = useState<string>('');

	const handleDNI = (event : React.ChangeEvent<HTMLInputElement>) => {
        setDNI(event.target.value);
    };
    
    const handleFirstName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

	const handleLastName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handlePhone = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

	const handleClose = () => {
        setOpen(false);
    };

    interface NewGuest extends Partial<Guest> {}

	const handleClick = () => {
		let guest : NewGuest = {
            dni: dni,
			firstName: firstName,
			lastName: lastName,
			phone: phone
		};

        createGuest(guest as Guest);
		handleClose();
    };

    return (
        <Fragment>

            <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
            >

                <DialogTitle id='responsive-dialog-title'>
                    Ingresa los datos del nuevo invitado:
                </DialogTitle>

                <DialogContent>
                    <Grid container rowSpacing={1} columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                        <Grid item xs={6}>
                            <DialogContentText>Nombre:</DialogContentText>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: Lucas Damián' className='text-fields' onChange={ handleFirstName }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>Apellido:</DialogContentText>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: Soria Gava' className='text-fields' onChange={ handleLastName }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>DNI:</DialogContentText>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='number' label='Ej: 42670490' className='text-fields' onChange={ handleDNI }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>Teléfono:</DialogContentText>
                            <Card elevation={6} id='card'>
							    <TextField variant='filled' type='text' label='Ej: +542613893772' className='text-fields' onChange={ handlePhone }/>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant='contained' startIcon={ <PersonAdd fontSize='large'/> } onClick={ handleClick }>Crear</Button>
                </DialogActions>

            </Dialog>

        </Fragment>
    );
}

