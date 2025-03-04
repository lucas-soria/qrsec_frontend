import { PersonAdd } from '@mui/icons-material';
import { Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import { createGuest } from '../../data/Reducers.tsx';


export function CreateGuest( { open, setOpen } : { open : boolean, setOpen : React.Dispatch<React.SetStateAction<boolean>> } ) {

    const [dni, setDNI] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');

    const [lastName, setLastName] = useState<string>('');

	const [phone, setPhone] = useState<string>('');

    const [openSnack, setOpenSnack] = useState<boolean>(false);
    
    const [guest, setGuest] = useState<Guest | null>(null);

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

	const handleClick = async () => {
		let guest : NewGuest = {
            dni: dni,
			firstName: firstName,
			lastName: lastName,
			phone: phone
		};

        let createdGuest = await createGuest(guest as Guest);
        setGuest(createdGuest);
        handleClose();
        setOpenSnack(true);
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

            <Snackbar
                open={ openSnack }
                onClose={ () => setOpenSnack(false) }
                autoHideDuration={ 2000 }
            >
                {guest !== null ? (
                    <Alert severity='success'>
                        Invitado creado!
                    </Alert>
                ) :
                    <Alert severity='error'>
                        Error creando el invitado.
                    </Alert>
                }
            </Snackbar>

        </Fragment>
    );
}

