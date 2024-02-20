import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';

export function SignUp() {

    const [image, setimage] = useState('');

    function handleCallbackResponse(response) {
        var jwt : any = jwt_decode(response.credential); // TODO: Give a proper type
        console.log('Encoded JWT Token: ', jwt);
        console.log(jwt.picture);
        setimage(jwt.picture);
    }

    useEffect( () => {
        /* global google */

        // TODO: Give a proper type
        (google as any).accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
            callback: handleCallbackResponse,
            cancel_on_tap_outside: true,
            ux_mode: 'redirect',
            context: 'use',
            itp_support: true
        });

        // TODO: Give a proper type
        (google as any).accounts.id.prompt();

        // TODO: Give a proper type
        (google as any).accounts.id.renderButton(
            document.getElementById('google-oauth'),
            { theme: 'outline', type: 'icon', shape: 'round', size: 'large', text: 'signin_with' }
        );

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
