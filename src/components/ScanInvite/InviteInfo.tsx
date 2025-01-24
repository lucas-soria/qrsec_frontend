import { Card, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInvite, validateInvite } from '../../data/Reducers.tsx';
import { Map } from '../ShowInvite/Map.tsx';


export function InviteInfo( { inviteID, cameraIsActive, isValid, setIsValid } : { inviteID : string, cameraIsActive : boolean, isValid : boolean, setIsValid : React.Dispatch<React.SetStateAction<boolean>> } ) {

    const [invite, setInvite] = useState<Invite>();

    useEffect( () => {
	
        if (inviteID !== '') {
            (async () => {

                setInvite(await getInvite(inviteID));
                setIsValid(await validateInvite(inviteID));

            })();
        } else {
            setInvite(undefined);
            setIsValid(false);
        }
	
	}, [ inviteID, isValid, setIsValid ]);

    return (
        <>
        {!cameraIsActive ? (
            <>
            {!!invite && isValid ? (
                <>

                <Card elevation={ 6 } id='valid'>

                    <Typography variant='h5'>Información de los invitados:</Typography>

                    {invite.maxTimeAllowed ? <Typography variant='body1'>Tiempo máximo de estadía: { invite.maxTimeAllowed } hs.</Typography> : <></>}
                    {invite.guests.map( (guest) => 

                        <Fragment key={ uuidv4() }>
                            <Typography variant='body1'>Nombre: { guest.firstName }.</Typography>
                            <Typography variant='body1'>Apellido: { guest.lastName }.</Typography>
                            <Typography variant='body1'>DNI: { guest.dni }.</Typography>
                            <br />
                        </Fragment>

                    )}

                    <Typography variant='h5'>Información del residente:</Typography>
                    <Typography variant='body1'>Nombre: { invite.owner.firstName }.</Typography>
                    <Typography variant='body1'>Apellido: { invite.owner.lastName }.</Typography>
                    <Typography variant='body1'>Teléfono: { invite.owner.phone }.</Typography>
                    <Typography variant='body1'>Casa: { invite.owner.address.house.block } { invite.owner.address.house.house }.</Typography>
                    <Map position={ { lat: invite.owner.address.location.coordinates[0], lng: invite.owner.address.location.coordinates[1] } }/>

                </Card>

                </>
            ):
                <>

                <Card id='invalid'>

                    <Typography>Invitación invalida</Typography>

                </Card>

                </>
            }
            </>
        ):
            <>
            </>
        }
        </>
    );
}
