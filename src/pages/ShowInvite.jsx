import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map } from '../components/ShowInvite/Map';
import { QRCodeComponent } from '../components/ShowInvite/QRCode';
import { getPublicInvite } from '../data/Reducers';


export function ShowInvite() {

    const { id } = useParams();

	const [invite, setInvite] = useState();

	var inviteBoolean = !!invite;

	useEffect( () => {
	
		(async () => {
		  	setInvite(await getPublicInvite(id));
		})();
	
	}, [ inviteBoolean, id ]);

	useEffect( () => {

		document.title = 'QRSec - Ver invitación';

	}, [ ]);

    return (
		<>
        {!!invite ? (
            <>
            	<br />

			  	<QRCodeComponent id={ id }/>

				<br />

				<Typography variant='h5'>¿Cómo llegar? Presiona el punto para abrir Maps</Typography>
				<Map position={ { lat: invite.location.coordinates[0], lng: invite.location.coordinates[1] } }/>

				<br />

            </>
        ):
			<Typography variant='h5'>Invitación invalida</Typography>
		}
        </>
    );
}
