import { Button, Card, Grid, Snackbar, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { createUser, validateGoogleJWT } from '../../data/Reducers.tsx';
import { useNavigate } from 'react-router-dom';
import { frontUrls } from '../../data/Urls.tsx';
import { useLocation } from 'react-router';


export function CreateUser( { token, decodedToken } : { token : string, decodedToken : GoogleJWT } ) {

    interface NewUser extends Partial<User> {};

    interface State {
        from: Location;
    };

    const navigate = useNavigate();
    const location = useLocation();

    const user = useRef<User | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);
    
    const [settingToken, setSettingToken] = useState<boolean>(false);

    const validatedUser = useRef<NewUser | null>(null);

    const [email, setEmail] = useState<string>('');

    const objectIsEmpty = (object : Object) => {
        return Object.keys(object).length === 0;
    };

    const setTokenAndRedirect = useCallback( () => {
        if (user.current === null) {
            if (validatedUser.current !== null) {
                if (objectIsEmpty(validatedUser.current as NewUser) && user.current === null) {
                    setEmail(decodedToken.email);
                    user.current = {email: decodedToken.email} as User;
                    setSettingToken(true);
                    return;
                }
                validatedUser.current.email = decodedToken.email;
                user.current = validatedUser.current as User;
            } else {
                debugger
                return;
            }
        }
        if ( user.current === null) {
            return;
        }

        localStorage.setItem('access_token', token);

        let authorities : string[] = [];
        authorities = user.current.authorities.map( (authority) => authority.authority );
        localStorage.setItem('authorities', authorities.join(','));
        localStorage.setItem('first_name', decodedToken?.given_name ?? '');
        localStorage.setItem('last_name', decodedToken?.family_name ?? '');
        localStorage.setItem('picture', decodedToken?.picture ?? '');

        let state = location.state as State;
        let url = frontUrls.base;
        if (!!state){
            url += state.from.pathname.substring(1, state.from.pathname.length);
        }
        navigate(url);
    }, [ user, validatedUser, setSettingToken, token, decodedToken, location.state, navigate, setEmail ]);

    useEffect( () => {

        const validateToken = () => {
            if (validatedUser.current === null) {
                validateGoogleJWT(decodedToken.email)
                    .then( (validatedEntity) => {
                        if (validatedEntity === null) {
                            return;
                        }
                        validatedUser.current = validatedEntity as NewUser;
                        setTokenAndRedirect();
                    })
                    .catch( () => null);
            }
        };
        validateToken();

    }, [ setTokenAndRedirect, decodedToken ]);
    
    const [firstName, setFirstName] = useState<string>('');

    const [lastName, setLastName] = useState<string>('');

	const [phone, setPhone] = useState<string>('');

    const [dni, setDNI] = useState<string>('');

	const handleClick = async() => {
        if (user.current === null) {
            return;
        }
		let userToCreate : NewUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            dni: dni,
		};

        await createUser(userToCreate as User)
            .then( (createdUser) => {
                user.current = createdUser;
            } );
        setOpenSnack(true);
        setTimeout(function(){
            setSettingToken(false);
            navigate(frontUrls.base);
        }, 2000);
    };

    return (
        <Fragment>
            { settingToken ?
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
                                <TextField variant='filled' type='text' label='Ej: lucas@qrsec.com' className='text-fields' value={ email } disabled={ true }/>
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
                        <Button variant='contained' id='button-send' startIcon={ <HomeIcon fontSize='large'/> } onClick={ handleClick }>Crear usuario</Button>
                    </Card>
                </> :
                <></>
            }

            <Snackbar
                open={ openSnack }
                onClose={ () => setOpenSnack(false) }
                autoHideDuration={ 2000 }
            >
                {user.current !== null ? (
                    <Alert severity='success'>
                        <Typography variant='body1'>Usuario creado!</Typography>
                        <Typography variant='body1'>Pidele a tu administrador que te otorgue un rol antes de ingresar</Typography>
                    </Alert>
                ) :
                    <Alert severity='error'>
                        Error creando usuario, volver a intentar mas tarde!
                    </Alert>
                }
            </Snackbar>

        </Fragment>
    );
}

