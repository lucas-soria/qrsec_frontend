import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';
import { CreateUser } from '../components/User/CreateUser';

/* global google */

export function SignUp() {

    let qrsecLogo = '/QRSec logo.svg';

    const [token, setToken] = useState<string>(localStorage.getItem('access_token') ?? '');

    const [decodedToken, setDecodedToken] = useState<GoogleJWT | null>(null);

    const [user, setUser] = useState<User | null>(null);

    useEffect( () => {

        const googleOAuthElement = document.getElementById('google-oauth');

        const handleCallbackResponse = ( response :  google.accounts.id.CredentialResponse ) => {
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
                    <CreateUser user={ user } setUser={ setUser } data={ decodedToken } token={ token } />
                </> :
                <>
                    <br/>
                    <div className='signin-logo'>
                        <img id='blue-logo' src={ qrsecLogo } alt='QRSec Logo' />
                    </div>
                    <br/>
                    <Typography variant='h4'>Inicia Sesion</Typography>
                    <div className='icons custom-component' id='google-oauth'></div>
                </>
            }

        </Fragment>
    );
}
