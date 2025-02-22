import { Button, Card, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map } from '../components/ShowInvite/Map.tsx';
import { QRCodeComponent } from '../components/ShowInvite/QRCode.tsx';
import { validateAccessToPublicInvite } from '../data/Reducers.tsx';
import { NotFound } from '../components/NotFound.tsx';


export function ViewPublicInvite() { 

    const { id } = useParams();

	const [invite, setInvite] = useState<PublicInvite>();

	const [guestDNI, setGuestDNI] = useState<string>('');

	const [contentFound, setContentFound] = useState<boolean | null>(null);

	const handleDNI = (event : React.ChangeEvent<HTMLInputElement>) => {
        setGuestDNI(event.target.value);
    };

	const handleValidate = () => {
		(async () => {
		  	setInvite(await validateAccessToPublicInvite(id, guestDNI));
			setContentFound(!!invite);
		})();
	};

	useEffect( () => {

		document.title = 'QRSec - Ver invitación';

	}, [ ]);

    return (
		<>
			{!!invite ? (
				<>
					<br />

					<QRCodeComponent id={ id ?? '' }/>

					<br />

					<Typography variant='h5'>¿Cómo llegar? Presiona el punto para abrir Maps</Typography>
					<Map position={ { lat: invite.location.coordinates[0], lng: invite.location.coordinates[1] } }/>

					<br />

				</>
			):
				<>
					{!(!!guestDNI && !!invite) ? (
						<>
							<div className='custom-component' style={{ alignContent:'center', height:'90cqh'}}>
							
								<Typography variant='h6'>Ingrese su DNI:</Typography>
								<Card elevation={6} id='card' className='card-send-invite'>
									<TextField variant='filled' type='number' label='Ej: 42670490' className='text-fields max-width' onChange={ handleDNI } />
								</Card>
								<br />
								<Button variant='contained' onClick={ handleValidate } style={{float:'right'}}>Validar</Button>
							
							</div>
						</>
					) :
						<>
							{contentFound === null ? (
								<></>
							) :
								<NotFound>
									<Typography variant='h2'>404</Typography>
									<Typography variant='h6'>Invitación inválida</Typography>
								</NotFound>
							}
						</>
					}
				</>
			}
        </>
    );
}
