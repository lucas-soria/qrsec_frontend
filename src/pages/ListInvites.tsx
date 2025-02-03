import { List, ListItem } from '@mui/material';
import { Delete, ExpandMore, Edit } from '@mui/icons-material';
import { Fragment, useEffect, useState } from 'react';
import { frontUrls } from '../data/Urls.tsx';
import { getInvites, deleteInvite } from '../data/Reducers.tsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogTitle, Snackbar, Typography } from '@mui/material';
import FloatingAddButton from '../components/AddButton.tsx';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreComponent = styled( ( props: ExpandMoreProps ) => {
    const { expand, ...other } = props;
    return (
        <IconButton {...other} />
    );
})( ( { theme, expand } ) => (
    {
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform',
            {
                duration: theme.transitions.duration.shortest,
            }
        ),
    }
));

const weekDays : { [ id: string ] : string } = {
    '0': 'Domingo',
    '1': 'Lunes',
    '2': 'Martes',
    '3': 'Miercoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sábado',
};

export function ListInvites () {

    useEffect( () => {

        document.title = 'QRSec - Invitaciones';

        const doRequest = async() => {
            await getInvites().then( (invites) => {
                setInvites(invites);
            } );
        };

        doRequest();

    }, []);

    const base_url = frontUrls.wholeBase + frontUrls.publicInvite;

    const [invites, setInvites] = useState<Invite[]>([]);

    const [invite, setInvite] = useState<Invite | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedInvite, setExpandedInvite] = useState<string>('');

    const [openCopySnack, setOpenCopySnack] = useState<boolean>(false);

    const handleExpandClick = ( id: string ) => {
        setExpandedInvite(id !== expandedInvite ? id : '')
    };

    const handleCopy = ( event : React.MouseEvent<HTMLAnchorElement>, url : string ) => {
        event.preventDefault();
        setOpenCopySnack(true);
        navigator.clipboard.writeText(url);
    };

    return (
        <>
            {invites?.length > 0 ? (
                <>
                    <Fragment>

                        <List>
                            {invites.map( (invite) => (
                                <div key={ invite.id }>
                                    <br/>
                                    <ListItem disablePadding key={ invite.id } >
                                        <Card sx={ [ { width: '100%' } ] } variant='outlined'>
                                            <CardHeader 
                                                title={ invite.description }
                                                subheader={
                                                    <>
                                                        ID: <a href={ `${ base_url }${ invite.id }` }  onClick={ (event) => handleCopy(event, base_url+invite.id) } > { `${ invite.id }` } </a>
                                                    </>
                                                    }
                                                subheaderTypographyProps={
                                                    {
                                                        style: {
                                                            fontSize:14
                                                        }
                                                    }
                                                }
                                            />

                                            <CardActions>
                                                <ExpandMoreComponent
                                                    expand={invite.id === expandedInvite}
                                                    onClick={ () => handleExpandClick(invite.id) }
                                                    aria-expanded={invite.id === expandedInvite}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMore />
                                                </ExpandMoreComponent>
                                            </CardActions>
                                            <Collapse in={invite.id === expandedInvite} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography variant='h5'>Invitados</Typography>
                                                    <List>
                                                        {
                                                            invite.guests.map( ( guest ) => (
                                                                <ListItem key={ guest.id } >
                                                                    <Typography>{ guest.firstName + ' ' + guest.lastName }</Typography>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List>

                                                    {invite.days.length !== 0 ? (
                                                        <>
                                                            <Typography variant='h5'>Dias</Typography>
                                                            <List>
                                                                {
                                                                    invite.days.sort( ( a : string, b : string ) => Number(a) - Number(b) ).map( ( day ) => (
                                                                        <ListItem key={ day }>
                                                                            <Typography>{ weekDays[day] }</Typography>
                                                                        </ListItem>
                                                                    ))
                                                                }
                                                            </List>
                                                        </>
                                                    ) :
                                                        <></>
                                                    }

                                                    {invite.hours.length !== 0 ? (
                                                        <>
                                                            <Typography variant='h5'>Horarios</Typography>
                                                            <List>
                                                                {
                                                                    invite.hours.map( ( hourRange ) => (
                                                                        <ListItem key={ hourRange[0] + ' - ' + hourRange[1] } >
                                                                            <Typography>{ hourRange[0] + ' - ' + hourRange[1] }</Typography>
                                                                        </ListItem>
                                                                    ))
                                                                }
                                                            </List>
                                                        </>
                                                    ) :
                                                        <></>
                                                    }
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'flex-end' }} >
                                                    <IconButton aria-label="edit invite" onClick={
                                                        () => {
                                                            window.open(`/invite/${invite.id}`, '_self');
                                                        }
                                                    }>
                                                        <Edit color='primary' fontSize='large' />
                                                    </IconButton>
                                                    <IconButton aria-label="delete invite" onClick={
                                                        () => {
                                                            setInvite(invite);
                                                            setOpen(true);
                                                        }
                                                    }>
                                                        <Delete color='error' fontSize='large' />
                                                    </IconButton>
                                                </CardActions>
                                            </Collapse> 
                                        </Card>
                                    </ListItem>
                                </div>
                            ))}

                        </List>

                        <Snackbar
                            open={ openSnack }
                            onClose={ () => setOpenSnack(false) }
                            autoHideDuration={ 2000 }
                        >
                            <Alert severity='info'>
                                Dirección eliminada!
                            </Alert>
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar la dirección {invite?.id}?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (invite !== null) {
                                            await deleteInvite(invite.id).then( () => setOpenSnack(true) );
                                        }
                                        setOpen(false);
                                        window.location.reload();
                                    }
                                }>Eliminar</Button>
                                <Button variant='contained' onClick={ () => setOpen(false) }>Salir</Button>
                            </DialogActions>

                        </Dialog>

                    </Fragment>

                    <Snackbar
                        open={ openCopySnack }
                        onClose={ () => setOpenCopySnack(false) }
                        autoHideDuration={ 2000 }
                    >
                        <Alert severity='success'>
                            Copiado al portapapeles!
                        </Alert>
                    </Snackbar>

                    <FloatingAddButton />

                </>

            ) :
                <>
                    <br />
                    <Typography variant='h5'>No hay invitaciones disponibles</Typography>
                </>
            }
        </>
    );
}
