import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';

export function SignUp() {

    const [image, setimage] = useState('');

    function handleCallbackResponse(response) {
        var jwt = jwt_decode(response.credential);
        console.log('Encoded JWT Token: ', jwt);
        console.log(jwt.picture);
        setimage(jwt.picture);
    }

    useEffect( () => {
        /* global google */

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
            callback: handleCallbackResponse,
            login_uri: 'http://localhost:8080/v1/oauth/google/',
            cancel_on_tap_outside: true,
            ux_mode: 'redirect',
            context: 'use',
            itp_support: true
        });

        google.accounts.id.prompt();

        google.accounts.id.renderButton(
            document.getElementById('google-oauth'),
            { theme: 'outline', type: 'icon', shape: 'round', size: 'large', text: 'signin_with' }
        );

    }, [ ]);

    return (
        <Fragment>

            <Typography variant='h5'>Inicia Sesion</Typography>
            <div className='icons custom-component' id='google-oauth'></div>
            <div>
                <img src={ image } alt='alternatetext'></img>
            </div>

        </Fragment>
    );
}
