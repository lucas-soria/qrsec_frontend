import { Button, Card, Grid, Snackbar, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import { Fragment, useState } from 'react';
import { createAddress } from '../../data/Reducers.tsx';


export function CreateAddress( { setAddress } : { setAddress : React.Dispatch<React.SetStateAction<Address | null>> } ) {

    interface NewAddress extends Partial<Address> {};

    const [openSnack, setOpenSnack] = useState<boolean>(false);

    const handler = () => {
        setOpenSnack(true);
        handleClick();
    };
    
    const [street, setStreet] = useState<string>('');

    const [number, setNumber] = useState<number>(0);

    const [block, setBlock] = useState<string>('');

	const [house, setHouse] = useState<number>(0);

    const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

    const handlerCoordinate = (latitude : number | null, longitude : number | null) => {
        if (latitude !== null) {
            setCoordinates([latitude, coordinates[1]]);
        }
        if (longitude !== null) {
            setCoordinates([coordinates[0], longitude]);
        }
    }

	const handleClick = async() => {
		let address : NewAddress = {
            street: street,
            number: number,
            house: {
                block: block,
                house: house
            },
            location: {
                type: 'point',
                coordinates: coordinates
            }
		};

        await createAddress(address as Address).then( (createdAddress) => {
            setAddress(createdAddress)
        } );
    };

    return (
        <Fragment>
        
            <Grid container rowSpacing={1} columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                <Grid item xs={6}>
                    <Typography>Calle:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: Pinzón' className='text-fields' onChange={ (street) => setStreet(street.target.value) }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Número:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='number' label='Ej: 276' className='text-fields' onChange={ (streetNumber) => setNumber(Number(streetNumber.target.value)) }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Manzana:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='text' label='Ej: C' className='text-fields' onChange={ (block) => setBlock(block.target.value) }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Casa:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='number' label='Ej: 19' className='text-fields' onChange={ (house) => setHouse(Number(house.target.value)) }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Latitud:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='number' label='Ej: -32.9769444444' className='text-fields' onChange={ (latitude) => handlerCoordinate(Number(latitude.target.value), null) }/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Longitud:</Typography>
                    <Card elevation={6} id='card'>
                        <TextField variant='filled' type='number' label='Ej: -68.8537222222' className='text-fields' onChange={ (longitude) => handlerCoordinate(null, Number(longitude.target.value)) }/>
                    </Card>
                </Grid>
            </Grid>

            <br />

            <Card elevation={6} id='card' className='card-send'>
                <Button variant='contained' id='button-send' startIcon={ <HomeIcon fontSize='large'/> } onClick={ handler }>Crear Dirección</Button>
            </Card>

            <Snackbar
                open={ openSnack }
                onClose={ () => setOpenSnack(false) }
                autoHideDuration={ 2000 }
            >
                <Alert severity='success'>
                    Dirección creada!
                </Alert>
            </Snackbar>

        </Fragment>
    );
}

