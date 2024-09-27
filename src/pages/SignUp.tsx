import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';
import { CreateUser } from '../components/User/CreateUser';
import QRSecLogo from '../Screenshot_2021-10-07_184334.svg';

/* global google */

export function SignUp() {

    const [token, setToken] = useState<string>(localStorage.getItem('access_token') ?? '');

    const [decodedToken, setDecodedToken] = useState<GoogleJWT | null>(null);

    const [user, setUser] = useState<User | null>(null);

    useEffect( () => {

        const googleOAuthElement = document.getElementById('google-oauth');

        const handleCallbackResponse = ( response :  google.accounts.id.CredentialResponse ) => {
            localStorage.setItem('access_token', response.credential);
            setToken(response.credential);
        }

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ?? '',
            callback: handleCallbackResponse,
            cancel_on_tap_outside: true,
            ux_mode: 'popup',
            context: 'use',
            itp_support: true
        });

        if (!!!decodedToken) {
            if (token) {
                setDecodedToken(jwt_decode(token));
            } else {
                google.accounts.id.prompt();
            }
        }

        if (googleOAuthElement) {
            google.accounts.id.renderButton(
                googleOAuthElement,
                { theme: 'outline', type: 'icon', shape: 'square', size: 'large', text: 'signin_with' }
            );
        }

    }, [ decodedToken, setDecodedToken, token, user ]);

    return (
        <Fragment>

            {!!decodedToken ?
                <>
                    <CreateUser user={ user } setUser={ setUser } data={ decodedToken } />
                </> :
                <>
                    <br/>
                    <div className='signin-logo'>
                        <img id='logo' src={ QRSecLogo } alt='QRSec Logo' style={ {width: '50%', height: 'auto' } } />
                    </div>
                    <br/>
                    <Typography variant='h5'>Inicia Sesion</Typography>
                    <div className='icons custom-component' id='google-oauth'></div>
                </>
            }

        </Fragment>
    );
}
