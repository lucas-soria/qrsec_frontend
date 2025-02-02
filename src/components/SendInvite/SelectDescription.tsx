import { Card, TextField, Typography } from '@mui/material';
import React from 'react';


export function SelectDescription( { description, setDescription } : { description: string, setDescription : React.Dispatch<React.SetStateAction<string>> } ) { 

    const handleDescription = (event : React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <div className='custom-component'>

            <Typography variant='h6'>Nombre descriptivo de la invitación:</Typography>
            <Card elevation={6} id='card' className='card-send-invite'>
                <TextField variant='filled' type='text' label='Ej: Invitación Oracio (todos los días)' className='text-fields max-width' value={ !!description ? description : '' } autoFocus={ !!description } onChange={ handleDescription } />
            </Card>

        </div>
    );
}
