import { Card, TextField, Typography } from '@mui/material';
import React from 'react';


export function SelectPassengers( { setPassengers } : { setPassengers : React.Dispatch<React.SetStateAction<number>> } ) { 

    const handlePassangers = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassengers(Number(event.target.value));
    };

    return (
        <div className='custom-component'>
 
            <Typography variant='h6'>Acompañantes:</Typography>
            <Card elevation={6} id='card'>
                <TextField variant='filled' type='number' label='Ej: 3 acompañantes' className='text-fields' onChange={ handlePassangers }/>
            </Card>
 
        </div>
    );
}
