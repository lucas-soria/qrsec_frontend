import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';
import { CreateUser } from '../components/User/CreateUser';

/* global google */

export function SignUp() {

    let qrsecLogo = '/QRSec logo.svg';

    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token') ?? null);

    const [decodedToken, setDecodedToken] = useState<GoogleJWT | null>(null);

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

        if (decodedToken === null) {
            if (token !== null) {
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

    }, [ decodedToken, setDecodedToken, token ]);

    return (
        <Fragment>

            {token !== null && decodedToken !== null ?
                <>
                    <CreateUser token={ token } decodedToken={ decodedToken } />
                </> :
                <>
                    <br/>
                    <div className='signin-logo'>
                        <img id='blue-logo' src={ qrsecLogo } alt='QRSec Logo' />
                    </div>
                    <br/>
                    <br/>
                    <div style={ { display: 'flex', justifyContent: 'center' } } >
                        <Typography variant='h4'>Inicia sesión</Typography>
                    </div>
                    <div className='icons custom-component' id='google-oauth'></div>
                </>
            }

        </Fragment>
    );
}
