import { Card, TextField, Typography } from '@mui/material';
import React from 'react';


export function SelectMaxTime( { setMaxTime } : { setMaxTime : React.Dispatch<React.SetStateAction<number | null>> } ) { 

    const handleMaxTime = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMaxTime(Number(event.target.value));
    };

    return (
        <div className='custom-component'>

            <Typography variant='h6'>Tiempo máximo de estadía:</Typography>
            <Card elevation={6} id='card'>
                <TextField variant='filled' type='number' label='Ej: 5hs' className='text-fields' onChange={ handleMaxTime }/>
            </Card>

        </div>
    );
}
