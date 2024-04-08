import { Card, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInvite } from '../../data/Reducers.tsx';


export function InviteInfo( { inviteID, cameraIsActive } : { inviteID : string, cameraIsActive : boolean } ) {

    const [invite, setInvite] = useState<Invite>();

    useEffect( () => {
	
        if (inviteID !== '') {
            (async () => {

                setInvite(await getInvite(inviteID));

            })();
        } else {
            setInvite(undefined);
        }
	
	}, [ inviteID ]);

    const validate = (invite : Invite) => {

        if (Object.keys(invite.days).length === 0) {

            return true;

        }

        let now = new Date();
        if (invite.days.includes(now.getDay().toString())) {
            let hoursValidation = invite.hours.map( (hour) => {
                let start = new Date();
                start.setHours(Number(hour[0].split(':')[0]));
                start.setMinutes(Number(hour[0].split(':')[1]));

                let end = new Date();
                end.setHours(Number(hour[1].split(':')[0]));
                end.setMinutes(Number(hour[1].split(':')[1]));

                if (start > now || now > end) {

                    return false;

                } else {

                    return true;

                }
            } )

            if (hoursValidation.includes(true)) {

                return true;

            }
        }

        return false;

    };

    return (
        <>
        {!cameraIsActive ? (
            <>
            {!!invite && validate(invite) ? (
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
