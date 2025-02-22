import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../data/Reducers.tsx';
import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import { AddLink } from '@mui/icons-material';
import { Button, Card, Snackbar, TextField, Typography, Grid, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SelectAddress } from '../components/User/SelectAddress.tsx';
import { SelectAuthority } from '../components/User/SelectAuthotity.tsx';


export function ViewUser() {

    const { id } = useParams();

	const [user, setUser] = useState<User>();

    const [lastName, setLastName] = useState<string>('');
    
    const [firstName, setFirstName] = useState<string>('');

    const [dni, setDNI] = useState<string>('');

    const [phone, setPhone] = useState<string>('');

    const [email, setEmail] = useState<string>('');

    const [address, setAddress] = useState<Address>({} as Address);

    const [authorities, setAuthorities] = useState<Authority[]>([]);

    const [enabled, setEnabled] = useState<boolean>(false);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

	useEffect( () => {

		const setInitialValues = async () => {
	
			let user = await getUser(id);
			setUser(user);
			setLastName(user.lastName);
			setFirstName(user.firstName);
			setDNI(user.dni);
			setPhone(user.phone);
			setEmail(user.email);
            setAddress(user.address);
            setAuthorities(user.authorities);
            setEnabled(user.enabled);
		
		};

		document.title = 'QRSec - Ver usuario';
		setInitialValues();

	}, [ id ]);

    const handleUpdate = async () => {
		if (!!user) {
			let userToUpdate = user;
			userToUpdate.lastName = lastName;
			userToUpdate.firstName = firstName;
			userToUpdate.dni = dni;
			userToUpdate.phone = phone;
            userToUpdate.email = email;
            userToUpdate.address = address;
			userToUpdate.authorities = authorities;
            userToUpdate.enabled = enabled;

			await updateUser(userToUpdate);
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

    const handleEnabled = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEnabled(Boolean(event.target.checked));
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
                    <Typography>Email:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: lucas@qrsec.com' className='text-fields' value={ email!=='' ? email : '' } autoFocus={ email !== '' } disabled={ true }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Teléfono:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: +54 9 261 389 3771' className='text-fields' value={ phone!=='' ? phone : '' } autoFocus={ phone !== '' } onChange={ handlePhone }/>
                    </Card>
                </Grid>
            </Grid>
			<SelectAddress address={ address ? address : {} as Address } setAddress={ setAddress }/>
            <SelectAuthority authorities={ authorities ? authorities : [] } setAuthorities={ setAuthorities } />
            <div className='custom-component'>
                <Typography variant='h6' style={ { display: 'inline-block' } } >Habilitado:</Typography>
                <Switch checked={ enabled } value={ enabled } onChange={ handleEnabled }/>
            </div>

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
