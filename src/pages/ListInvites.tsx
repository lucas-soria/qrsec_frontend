import { Delete, Edit, ExpandMore, Visibility } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle, List, ListItem, Skeleton, Snackbar, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { FloatingAddButton } from '../components/AddButton.tsx';
import { NotFound } from '../components/NotFound.tsx';
import { deleteInvite, getInvites } from '../data/Reducers.tsx';
import { frontUrls } from '../data/Urls.tsx';


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
                setFoundContent(invites?.length > 0);
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

    const [foundContent, setFoundContent] = useState<boolean | null>(null);

    let authoritiesString : string = localStorage.getItem('authorities') ?? '';
    let authorities : string[] = authoritiesString.split(',');
    const OWNER = 'OWNER';

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
                                                titleTypographyProps={
                                                    {
                                                        fontSize: '2rem'
                                                    }
                                                }
                                                subheader={
                                                    <>
                                                        Haz click <a href={ `${ base_url }${ invite.id }` }  onClick={ (event) => handleCopy(event, base_url+invite.id) } > aquí </a> para copiar el link a la invitación
                                                    </>
                                                    }
                                                subheaderTypographyProps={
                                                    {
                                                        style: {
                                                            fontSize: 14
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
                                                        <>
                                                            { authorities.includes(OWNER) ? (
                                                                <Edit color='primary' fontSize='large' />
                                                            ) :
                                                                <Visibility color='primary' fontSize='large' />
                                                            }
                                                        </>
                                                    </IconButton>
                                                    <>
                                                        { authorities.includes(OWNER) ? (
                                                            <IconButton aria-label="delete invite" onClick={
                                                                () => {
                                                                    setInvite(invite);
                                                                    setOpen(true);
                                                                }
                                                            }>
                                                                <Delete color='error' fontSize='large' />
                                                            </IconButton>
                                                        ) :
                                                            <></>
                                                        }
                                                    </>
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

                    <>
                        {authorities.includes(OWNER) ? (
                            <FloatingAddButton />
                        ) :
                            <></>
                        }
                    </>

                </>

            ) :
                <>
                    {foundContent === null ? (
                        <div>
                            <br />
                            <Skeleton variant='rounded' animation='wave' width='100%' >
                                <Card>
                                    <CardHeader />
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <CardContent />
                                        <CardActions>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Collapse> 
                                </Card>
                            </Skeleton>
                            <br />
                            <Skeleton variant='rounded' animation='wave' width='100%' >
                                <Card>
                                    <CardHeader />
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <CardContent />
                                        <CardActions>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Collapse> 
                                </Card>
                            </Skeleton>
                            <br />
                            <Skeleton variant='rounded' animation='wave' width='100%' >
                                <Card>
                                    <CardHeader />
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <CardContent />
                                        <CardActions>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Collapse> 
                                </Card>
                            </Skeleton>
                        </div>
                    ) : (
                        <NotFound>
                            <Typography variant='h5'>No hay invitaciones disponibles</Typography>
                        </NotFound>
                    )}
                </>
            }
        </>
    );
}
