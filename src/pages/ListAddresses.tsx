import { List, ListItem } from '@mui/material';
import { Delete, ExpandMore } from '@mui/icons-material';
import { Fragment, useEffect, useState } from 'react';
import { Map } from '../components/ShowInvite/Map.tsx';
import { getAddresses, deleteAddress } from '../data/Reducers.tsx';
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


export function ListAddresses () {

    useEffect( () => {

        document.title = 'QRSec - Direcciones';

        const doRequest = async() => {
            await getAddresses().then( (addresses) => {
                setAddresses(addresses);
            } );
        };

        doRequest();

    }, []);

    const [addresses, setAddresses] = useState<Address[]>([]);

    const [address, setAddress] = useState<Address | null>(null);

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [expandedAddress, setExpandedAddress] = useState<string>('');

    const handleExpandClick = ( id: string ) => {
        setExpandedAddress(id !== expandedAddress ? id : '')
    };

    return (
        <>
            {addresses?.length > 0 ? (
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
                            <Alert severity='info'>
                                Dirección eliminada!
                            </Alert>
                        </Snackbar>

                        <Dialog
                            open={open}
                            scroll='paper'
                        >

                            <DialogTitle id='responsive-dialog-title'>
                                ¿Desea borrar la dirección {address?.house.block} {address?.house.house}?
                            </DialogTitle>

                            <DialogActions>
                                <Button color='error' variant='contained' onClick={
                                    async() => {
                                        if (address !== null) {
                                            await deleteAddress(address.id).then( () => setOpenSnack(true) );
                                        }
                                        setOpen(false);
                                        window.location.reload();
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
                    <br />
                    <Typography variant='h5'>No hay direcciones disponibles</Typography>
                </>
            }
        </>
    );
}
