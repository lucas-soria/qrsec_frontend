import { Delete, Edit, ExpandMore } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogTitle, List, ListItem, Skeleton, Snackbar, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotFound } from '../components/NotFound.tsx';
import { Map } from '../components/ShowInvite/Map.tsx';
import { deleteUser, getUsers } from '../data/Reducers.tsx';


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

        document.title = 'QRSec - Usuarios';

        const doRequest = async() => {
            await getUsers().then( (users) => {
                setUsers(users);
                setFoundContent(users?.length > 0);
            } );
        };

        doRequest();

    }, []);

    const [users, setUsers] = useState<User[]>([]);

    const [user, setUser] = useState<User | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedUser, setExpandedUser] = useState<string>('');

    const [foundContent, setFoundContent] = useState<boolean | null>(null);

    const [deleted, setDeleted] = useState<boolean>(false);

    const handleExpandClick = ( id: string ) => {
        setExpandedUser(id !== expandedUser ? id : '')
    };

    return (
        <>
            {users?.length > 0 ? (
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
                                                titleTypographyProps={
                                                    {
                                                        fontSize: '2rem'
                                                    }
                                                }
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

                                                    {!user.enabled ?
                                                        <>
                                                            <Typography variant='body1'>Usuario deshabilitado</Typography>
                                                        </> : 
                                                        <></>
                                                    }

                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'flex-end' }} >
                                                    <IconButton aria-label="edit user" onClick={
                                                        () => {
                                                            window.open(`/user/${user.id}`, '_self');
                                                        }
                                                    }>
                                                        <Edit color='primary' fontSize='large' />
                                                    </IconButton>
                                                    <IconButton aria-label="delete user" onClick={
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
                            { deleted ? (
                                <Alert severity='success'>
                                    Usuario eliminado!
                                </Alert>
                            ):
                                <Alert severity='error'>
                                    Error al eliminar el usuario.
                                </Alert>
                            }
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar el usuario "{user?.firstName} {user?.lastName}"?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (user !== null) {
                                            let deleted = await deleteUser(user.id);
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
                            <Typography variant='h5'>No hay usuarios disponibles</Typography>
                        </NotFound>
                    )}
                </>
            }
        </>
    );
}
