import { Switch, Typography } from '@mui/material';
import React from 'react';


export function SwitchDrop( { setDrop } : { setDrop : React.Dispatch<React.SetStateAction<boolean>> } ) { 

    const handleDrop = (event : React.ChangeEvent<HTMLInputElement>) => {
        setDrop(event.target.checked);
    };

    return (
        <div className='custom-component'>

            <Typography variant='h6' style={ { display: 'inline-block' } }>¿Deja una o más personas?</Typography>
            <Switch onChange={ handleDrop }/>

        </div>
    );
}
