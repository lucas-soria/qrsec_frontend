import { Delete, ExpandMore } from '@mui/icons-material';
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
import { Map } from '../components/ShowInvite/Map.tsx';
import { deleteAddress, getAddresses } from '../data/Reducers.tsx';


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


export function ListAddresses () {

    useEffect( () => {

        document.title = 'QRSec - Direcciones';

        const doRequest = async() => {
            await getAddresses().then( (addresses) => {
                setAddresses(addresses);
                setFoundContent(addresses?.length > 0);
            } );
        };

        doRequest();

    }, []);

    const [addresses, setAddresses] = useState<Address[]>([]);

    const [address, setAddress] = useState<Address | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedAddress, setExpandedAddress] = useState<string>('');

    const [foundContent, setFoundContent] = useState<boolean | null>(null);

    const [deleted, setDeleted] = useState<boolean>(false);

    const handleExpandClick = ( id: string ) => {
        setExpandedAddress(id !== expandedAddress ? id : '')
    };

    return (
        <>
            {addresses?.length > 0 && (foundContent !== null && foundContent) ? (
                <>
                    <Fragment>

                        <List>
                            {addresses.map( (address) => (
                                <div key={ address.id }>
                                    <br/>
                                    <ListItem disablePadding key={ address.id } >
                                        <Card sx={ [ { width: '100%' } ] } variant='outlined'>
                                            <CardHeader 
                                                title={ address.house.block + ' ' + address.house.house }
                                                titleTypographyProps={
                                                    {
                                                        fontSize: '2rem'
                                                    }
                                                }
                                            />
                                            <CardActions>
                                                <ExpandMoreComponent
                                                    expand={address.id === expandedAddress}
                                                    onClick={ () => handleExpandClick(address.id) }
                                                    aria-expanded={address.id === expandedAddress}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMore />
                                                </ExpandMoreComponent>
                                            </CardActions>
                                            <Collapse in={address.id === expandedAddress} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Map position={ { lat: address.location.coordinates[0], lng: address.location.coordinates[1] } }/>
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'flex-end' }} >
                                                    <IconButton aria-label="delete address" onClick={
                                                        () => {
                                                            setAddress(address);
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
                                    Dirección eliminada!
                                </Alert>
                            ):
                                <Alert severity='error'>
                                    Error al eliminar la dirección.
                                </Alert>
                            }
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar la dirección "{address?.house.block} {address?.house.house}"?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (address !== null) {
                                            let deleted = await deleteAddress(address.id);
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

                        <FloatingAddButton />

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
                        <>
                            <NotFound>
                                <Typography variant='h5'>No hay direcciones disponibles</Typography>
                            </NotFound>

                            <FloatingAddButton />
                        </>
                    )}
                </>
            }
        </>
    );
}
