import { Card, CardHeader, CardContent, Typography, Skeleton } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInvite, validateInvite } from '../../data/Reducers.tsx';
import { Map } from '../ShowInvite/Map.tsx';


export function InviteInfo( { inviteID, cameraIsActive, isValid, setIsValid } : { inviteID : string, cameraIsActive : boolean, isValid : boolean, setIsValid : React.Dispatch<React.SetStateAction<boolean>> } ) {

    const [invite, setInvite] = useState<Invite | null>(null);

    const [foundContent, setFoundContent] = useState<boolean | null>(null);

    useEffect( () => {
	
        if (inviteID !== '') {
            (async () => {

                let invite = await getInvite(inviteID);
                setInvite(invite);
                let isValid = await validateInvite(inviteID);
                setIsValid(isValid);
                setFoundContent(isValid);

            })();
        } else {
            setInvite(null);
            setIsValid(false);
        }
	
	}, [ inviteID, isValid, setIsValid ]);

    return (
        <>
            {!cameraIsActive ? (
                <>
                    {foundContent !== null ? (
                        <>
                            {!!invite && isValid ? (
                                <>
        
                                    <Card id='valid' sx={ { width: '100%' } } variant='outlined'>
        
                                        <CardHeader
                                            title='Información de la invitación'
                                            titleTypographyProps={
                                                {
                                                    fontSize: '2rem'
                                                }
                                            }
                                        />
        
                                        <CardContent>
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
                                        </CardContent>
        
                                        <CardContent>
                                            <Typography variant='h5'>Información del residente:</Typography>
                                            <Typography variant='body1'>Nombre: { invite.owner.firstName }.</Typography>
                                            <Typography variant='body1'>Apellido: { invite.owner.lastName }.</Typography>
                                            <Typography variant='body1'>Teléfono: { invite.owner.phone }.</Typography>
                                            <Typography variant='body1'>Casa: { invite.owner.address.house.block } { invite.owner.address.house.house }.</Typography>
                                            <Map position={ { lat: invite.owner.address.location.coordinates[0], lng: invite.owner.address.location.coordinates[1] } } />
                                        </CardContent>
        
                                    </Card>
        
                                    <br />
        
                                </>
                            ) :
                                <>
        
                                    <Card id='invalid'>
        
                                        <CardHeader 
                                            title='Invitación invalida'
                                            titleTypographyProps={
                                                {
                                                    fontSize: '2rem'
                                                }
                                            }
                                        />
        
                                    </Card>
        
                                </>
                            }
                        </>
                    ) :
                        <>
                            <Skeleton variant='rounded' animation='wave' width='100%' >
                                <Card>
                                    <CardHeader />
                                </Card>
                            </Skeleton>
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
