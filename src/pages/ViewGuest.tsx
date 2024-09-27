import { useParams } from 'react-router-dom';
import { getGuest, updateGuest } from '../data/Reducers.tsx';
import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import { AddLink } from '@mui/icons-material';
import { Button, Card, Snackbar, TextField, Typography, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SelectOwner } from '../components/Guest/SelectOwner.tsx';


export function ViewGuest() {

    const { id } = useParams();

	const [guest, setGuest] = useState<Guest>();

    const [lastName, setLastName] = useState<string>('');
    
    const [firstName, setFirstName] = useState<string>('');

    const [dni, setDNI] = useState<string>('');

    const [phone, setPhone] = useState<string>('');

    const [owners, setOwners] = useState<User[]>([]);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

	useEffect( () => {

		const setInitialValues = async () => {
	
			let guest = await getGuest(id);
			setGuest(guest);
			setLastName(guest.lastName);
			setFirstName(guest.firstName);
			setDNI(guest.dni);
			setPhone(guest.phone);
			setOwners(guest.owners);
		
		};

		document.title = 'QRSec - Ver invitado';
		setInitialValues();

	}, [ id ]);

    const handleUpdate = async () => {
		if (!!guest) {
			let guestToUpdate = guest;
			guestToUpdate.lastName = lastName;
			guestToUpdate.firstName = firstName;
			guestToUpdate.dni = dni;
			guestToUpdate.phone = phone;
			guestToUpdate.owners =  owners;

			await updateGuest(guestToUpdate);
        	setOpenSnack(true);
		}
    };

	const handleFirstName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(String(event.target.value));
    };

	const handleLastName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLastName(String(event.target.value));
    };

	const handlePhone = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPhone(String(event.target.value));
    };

    return (
		<Fragment>

			<br/>

			<Grid container rowSpacing={1} columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                <Grid item xs={6}>
                    <Typography>Nombre:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: Lucas Damián' className='text-fields' value={ firstName!=='' ? firstName : '' } autoFocus={ firstName !== '' } onChange={ handleFirstName }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Apellido:</Typography>
                    <Card elevation={6} id='card'>
                    <TextField variant='filled' type='text' label='Ej: Soria Gava' className='text-fields' value={ lastName!=='' ? lastName : '' } autoFocus={ lastName !== '' } onChange={ handleLastName }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>DNI:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: 40234560' className='text-fields' value={ dni!=='' ? dni : '' } autoFocus={ dni !== '' } disabled={ true }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Teléfono:</Typography>
                    <Card elevation={6} id='card'>
                    <TextField variant='filled' type='text' label='Ej: +54 9 261 389 3771' className='text-fields' value={ phone!=='' ? phone : '' } autoFocus={ phone !== '' } onChange={ handlePhone }/>
                    </Card>
                </Grid>
            </Grid>
			<SelectOwner users={ owners ? owners : [] } setUsers={ setOwners }/>

			<br/>

			<Card elevation={6} id='card' className='card-send'>
				<Button variant='contained' id='button-send' startIcon={ <AddLink fontSize='large'/> } onClick={ handleUpdate }>Guardar</Button>
			</Card>

			<Snackbar
				open={ openSnack }
				onClose={ () => setOpenSnack(false) }
				autoHideDuration={ 2000 }
			>
				<Alert severity='success'>
					Invitado actualizado!
				</Alert>
			</Snackbar>

		</Fragment>
				
    );
}
