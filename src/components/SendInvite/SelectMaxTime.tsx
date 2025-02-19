import { Card, TextField, Typography } from '@mui/material';
import React from 'react';


export function SelectMaxTime( { maxTime, setMaxTime } : { maxTime: number|null, setMaxTime : React.Dispatch<React.SetStateAction<number | null>> } ) { 

    const handleMaxTime = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMaxTime(Number(event.target.value));
    };

    return (
        <div className='custom-component'>

            <Typography variant='h6'>Tiempo máximo de estadía:</Typography>
            <Card elevation={6} id='card' className='card-send-invite'>
                <TextField variant='filled' type='number' label='Ej: 5hs' className='text-fields max-width' value={ !!maxTime ? String(maxTime) : '' } autoFocus={ !!maxTime } onChange={ handleMaxTime } />
            </Card>

        </div>
    );
}
