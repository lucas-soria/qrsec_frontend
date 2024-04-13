import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { Fragment, useEffect, useState } from 'react';

export function SignUp() {

    const [image, setimage] = useState<string>('');

    function handleCallbackResponse( response :  google.accounts.id.CredentialResponse ) {
        var jwt : GoogleJWT = jwt_decode(response.credential);
        setimage(jwt.picture);
        localStorage.setItem('access_token', response.credential);
    }

    useEffect( () => {

        const googleOAuthElement = document.getElementById('google-oauth');

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ?? '',
            callback: handleCallbackResponse,
            cancel_on_tap_outside: true,
            ux_mode: 'popup',
            context: 'use',
            itp_support: true
        });

        google.accounts.id.prompt();

        if (googleOAuthElement) {
            google.accounts.id.renderButton(
                googleOAuthElement,
                { theme: 'outline', type: 'icon', shape: 'square', size: 'large', text: 'signin_with' }
            );
        }

    }, [ ]);

    return (
        <Fragment>

            <Typography variant='h5'>Inicia Sesion</Typography>
            <div className='icons custom-component' id='google-oauth'></div>
            <div>
                {image ? <img src={ image } alt='alternatetext'></img> : <></>}
            </div>

        </Fragment>
    );
}
