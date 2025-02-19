import { Card, TextField, Typography } from '@mui/material';
import React from 'react';


export function SelectPassengers( { passengers, setPassengers } : { passengers : number, setPassengers : React.Dispatch<React.SetStateAction<number>> } ) { 

    const handlePassangers = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassengers(Number(event.target.value));
    };

    return (
        <div className='custom-component'>
 
            <Typography variant='h6'>Acompañantes:</Typography>
            <Card elevation={6} id='card card-sedn-invite'>
                <TextField variant='filled' type='number' label='Ej: 3 acompañantes' className='text-fields max-width' value={ passengers>0 ? String(passengers) : '' } autoFocus={ passengers>0 } onChange={ handlePassangers }/>
            </Card>
 
        </div>
    );
}
