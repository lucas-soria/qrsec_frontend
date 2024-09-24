import { List, ListItem } from '@mui/material';
import { Delete, ExpandMore } from '@mui/icons-material';
import { Fragment, useEffect, useState } from 'react';
import { Map } from '../components/ShowInvite/Map.tsx';
import { getUsers, deleteUser } from '../data/Reducers.tsx';
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


export function ListUsers () {

    useEffect( () => {

        document.title = 'QRSec - Direcciones';

        const doRequest = async() => {
            await getUsers().then( (users) => {
                setUsers(users);
            } );
        };

        doRequest();

    }, []);

    const [users, setUsers] = useState<User[]>([]);

    const [user, setUser] = useState<User | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedUser, setExpandedUser] = useState<string>('');

    const handleExpandClick = ( id: string ) => {
        setExpandedUser(id !== expandedUser ? id : '')
    };

    return (
        <>
            {users.length > 0 ? (
                <>
                    <Fragment>

                        <List>
                            {users.map( (user) => (
                                <div key={ user.id }>
                                    <br/>
                                    <ListItem disablePadding key={ user.id } >
                                        <Card sx={ [ { width: '100%' } ] } variant='outlined'>
                                            <CardHeader 
                                                title={ user.firstName + ' ' + user.lastName }
                                            />
                                            <CardActions>
                                                <ExpandMoreComponent
                                                    expand={user.id === expandedUser}
                                                    onClick={ () => handleExpandClick(user.id) }
                                                    aria-expanded={user.id === expandedUser}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMore />
                                                </ExpandMoreComponent>
                                            </CardActions>
                                            <Collapse in={user.id === expandedUser} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography variant='h5'>Mail</Typography>
                                                    <Typography variant='body1'>{ user.email }</Typography>
                                                    
                                                    <Typography variant='h5'>Teléfono</Typography>
                                                    <Typography variant='body1'>{ user.phone }</Typography>
                                                    
                                                    <Typography variant='h5'>Roles</Typography>
                                                    <List>
                                                        {
                                                            user.authorities.map( ( authority ) => {
                                                                return (
                                                                <ListItem key={ uuidv4() } >
                                                                    <Typography variant='body1'>{ authority.authority }</Typography>
                                                                </ListItem>
                                                            )})
                                                        }
                                                    </List>

                                                    {!!user.address ?
                                                        <>
                                                            <Typography variant='h5'>Dirección</Typography>
                                                            <Typography variant='body1'>{ 'Dirección: ' + user.address.street + ' ' + user.address.number }</Typography>
                                                            <Typography variant='body1'>{ 'Casa: ' + user.address.house.block + ' ' + user.address.house.house }</Typography>
                                                            <Map position={ { lat: user.address.location.coordinates[0], lng: user.address.location.coordinates[1] } }/>
                                                        </> :
                                                        <></>
                                                    }
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'flex-end' }} >
                                                    <IconButton aria-label="delete address" onClick={
                                                        () => {
                                                            setUser(user);
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
                                ¿Desea borrar el usuario {user?.firstName} {user?.lastName}?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (user !== null) {
                                            await deleteUser(user.id).then( () => setOpenSnack(true) );
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
                    <br />
                    <Typography variant='h5'>No hay usuarios disponibles</Typography>
                </>
            }
        </>
    );
}
