import { List, ListItem } from '@mui/material';
import { Delete, ExpandMore, Edit } from '@mui/icons-material';
import { Fragment, useEffect, useState } from 'react';
import { getGuests, deleteGuest } from '../data/Reducers.tsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogTitle, Snackbar, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { NotFound } from '../components/NotFound.tsx';


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
            } );
        };

        doRequest();

    }, []);

    const [guests, setGuests] = useState<Guest[]>([]);

    const [guest, setGuest] = useState<Guest | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedGuest, setExpandedGuest] = useState<string>('');

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
                                                    <IconButton aria-label="edit invite" onClick={
                                                        () => {
                                                            window.open(`/guest/${guest.id}`, '_self');
                                                        }
                                                    }>
                                                        <Edit color='primary' fontSize='large' />
                                                    </IconButton>
                                                    <IconButton aria-label="delete invite" onClick={
                                                        () => {
                                                            setGuest(guest);
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
                                Invitado eliminado!
                            </Alert>
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar el invitado {guest?.firstName} {guest?.lastName}?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (guest !== null) {
                                            await deleteGuest(guest.id).then( () => setOpenSnack(true) );
                                        }
                                        setOpen(false);
                                        window.location.reload();
                                    }
                                }>Eliminar</Button>
                                <Button variant='contained' onClick={ () => setOpen(false) }>Salir</Button>
                            </DialogActions>

                        </Dialog>

                    </Fragment>
                </>

            ) :
                <>
                    <NotFound>
                        <Typography variant='h5'>No hay invitados disponibles</Typography>
                    </NotFound>
                </>
            }
        </>
    );
}
