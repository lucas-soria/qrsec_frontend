import { Delete, Edit, ExpandMore } from '@mui/icons-material';
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
import { v4 as uuidv4 } from 'uuid';
import { NotFound } from '../components/NotFound.tsx';
import { deleteGuest, getGuests } from '../data/Reducers.tsx';


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


export function ListGuests () {

    useEffect( () => {

        document.title = 'QRSec - Invitados';

        const doRequest = async() => {
            await getGuests().then( (guests) => {
                setGuests(guests);
                setFoundContent(guests?.length > 0);
            } );
        };

        doRequest();

    }, []);

    const [guests, setGuests] = useState<Guest[]>([]);

    const [guest, setGuest] = useState<Guest | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedGuest, setExpandedGuest] = useState<string>('');

    const [foundContent, setFoundContent] = useState<boolean | null>(null);

    const [deleted, setDeleted] = useState<boolean>(false);

    let authoritiesString : string = localStorage.getItem('authorities') ?? '';
    let authorities : string[] = authoritiesString.split(',');
    const OWNER = 'OWNER';
    const ADMIN = 'ADMIN';

    const handleExpandClick = ( id: string ) => {
        setExpandedGuest(id !== expandedGuest ? id : '')
    };

    return (
        <>
            {guests?.length > 0 ? (
                <>
                    <Fragment>

                        <List>
                            {guests.map( (guest) => (
                                <div key={ guest.id }>
                                    <br/>
                                    <ListItem disablePadding key={ guest.id } >
                                        <Card sx={ [ { width: '100%' } ] } variant='outlined'>
                                            <CardHeader 
                                                title={ guest.firstName + ' ' + guest.lastName }
                                                titleTypographyProps={
                                                    {
                                                        fontSize: '2rem'
                                                    }
                                                }
                                            />
                                            <CardActions>
                                                <ExpandMoreComponent
                                                    expand={guest.id === expandedGuest}
                                                    onClick={ () => handleExpandClick(guest.id) }
                                                    aria-expanded={guest.id === expandedGuest}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMore />
                                                </ExpandMoreComponent>
                                            </CardActions>
                                            <Collapse in={guest.id === expandedGuest} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography variant='h5'>DNI</Typography>
                                                    <Typography variant='body1'>{ guest.dni }</Typography>
                                                    
                                                    <Typography variant='h5'>Teléfono</Typography>
                                                    <Typography variant='body1'>{ guest.phone }</Typography>
                                                    
                                                    <Typography variant='h5'>Propietarios asociados</Typography>
                                                    <List>
                                                        {
                                                            guest.owners?.map( ( owner ) => {
                                                                return (
                                                                <ListItem key={ uuidv4() } >
                                                                    <Typography variant='body1'>{ owner.firstName + ' ' + owner.lastName }</Typography>
                                                                </ListItem>
                                                            )})
                                                        }
                                                    </List>
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'flex-end' }} >
                                                    <>
                                                        { authorities.includes(OWNER) ? (
                                                            <IconButton aria-label="delete invite" onClick={
                                                                () => {
                                                                    setGuest(guest);
                                                                    setOpen(true);
                                                                }
                                                            }>
                                                                <Delete color='error' fontSize='large' />
                                                            </IconButton>
                                                        ) :
                                                            <></>
                                                        }
                                                    </>
                                                    <>
                                                        { authorities.includes(ADMIN) ? (
                                                            <IconButton aria-label="edit invite" onClick={
                                                                () => {
                                                                    window.open(`/guest/${guest.id}`, '_self');
                                                                }
                                                            }>
                                                                <Edit color='primary' fontSize='large' />
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
                            { deleted ? (
                                <Alert severity='success'>
                                    Invitado eliminado!
                                </Alert>
                            ):
                                <Alert severity='error'>
                                    Error al eliminar el invitado.
                                </Alert>
                            }
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar el invitado "{guest?.firstName} {guest?.lastName}"?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (guest !== null) {
                                            let deleted = await deleteGuest(guest.id);
                                            setDeleted(deleted);
                                            setOpenSnack(true);
                                            setOpen(false);
                                            setTimeout(function(){
                                                window.location.reload();
                                            }, 2000);
                                        }
                                    }
                                }>Eliminar</Button>
                                <Button variant='contained' onClick={ () => setOpen(false) }>Salir</Button>
                            </DialogActions>

                        </Dialog>

                    </Fragment>
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
                            <Typography variant='h5'>No hay invitados disponibles</Typography>
                        </NotFound>
                    )}
                </>
            }
        </>
    );
}
