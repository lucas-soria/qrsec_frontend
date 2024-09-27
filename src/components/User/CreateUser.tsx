import { Button, Card, Grid, Snackbar, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import { Fragment, useState, useMemo, useEffect, useCallback } from 'react';
import { createUser } from '../../data/Reducers.tsx';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


export function CreateUser( { user, setUser, data } : { user: User | null, setUser : React.Dispatch<React.SetStateAction<User | null>>, data : GoogleJWT | null } ) {

    interface NewUser extends Partial<User> {
        password: string,
    };

    const mockPassword : string = "mock la tremenda password";

    const navigate = useNavigate();

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const handler = () => {
        setOpenSnack(true);
        handleClick();
    };

    const [shouldCreateUser, setShouldCreateUser] = useState<boolean>(true);

    useEffect( () => {

        // TODO: check if user exists
        if (user?.email === 'luscasoria@hotmail.com') {
            navigate('/invite');
        } else {
            setShouldCreateUser(true);
        }

    }, [ setShouldCreateUser, user, navigate ]);
    
    const [firstName, setFirstName] = useState<string>('');

    const [lastName, setLastName] = useState<string>('');

	const [phone, setPhone] = useState<string>('');

    const [dni, setDNI] = useState<string>('');

	const handleClick = async() => {
		let user1 : NewUser = {
            firstName: firstName,
            lastName: lastName,
            email: user?.email + uuidv4(),
            password: mockPassword, // TODO: Remove password no longer needed
            phone: phone,
            dni: dni,
		};

        await createUser(user1 as User).then( (createdUser) => {
            setUser(createdUser)
        } );

        setShouldCreateUser(false);
        navigate('/invite');
    };

    const updateMemorizedUser = useCallback(() => {

        let user : NewUser = {
            email: data?.email,
            password: "",
        }

        if (!!data) {
            setUser(user as User);
        }

        return user

    }, [ data, setUser ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memorizedUser = useMemo(() => updateMemorizedUser(), [ shouldCreateUser, updateMemorizedUser ]);

    return (
        <Fragment>

            {shouldCreateUser ?
                <>
                    <Grid container rowSpacing={1} columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                        <Grid item xs={6}>
                            <Typography>Nombre:</Typography>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: Lucas Damián' className='text-fields' onChange={ (firstName) => setFirstName(firstName.target.value)} />
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Apellido:</Typography>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: Soria Gava' className='text-fields' onChange={ (lastName) => setLastName(lastName.target.value) }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Email:</Typography>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: lucas@qrsec.com' className='text-fields' value={ memorizedUser?.email!=='' ? memorizedUser?.email : '' } autoFocus={ memorizedUser?.email !== '' } disabled={ true }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Teléfono:</Typography>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: +54 9 261 389 3775' className='text-fields' onChange={ (phone) => setPhone(phone.target.value) }/>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>DNI:</Typography>
                            <Card elevation={6} id='card'>
                                <TextField variant='filled' type='text' label='Ej: 40234912' className='text-fields' onChange={ (dni) => setDNI(dni.target.value) }/>
                            </Card>
                        </Grid>
                    </Grid>

                    <br />

                    <Card elevation={6} id='card' className='card-send'>
                        <Button variant='contained' id='button-send' startIcon={ <HomeIcon fontSize='large'/> } onClick={ handler }>Crear usuario</Button>
                    </Card>
                </> :
                <></>
            }

            <Snackbar
                open={ openSnack }
                onClose={ () => setOpenSnack(false) }
                autoHideDuration={ 2000 }
            >
                <Alert severity='success'>
                    Usuario creado!
                </Alert>
            </Snackbar>

        </Fragment>
    );
}

