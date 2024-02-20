import { TextField } from '@mui/material';
import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';


export function Hours( { hours } : { hours : string[][] } ) { 

    const handleMinHour = (event : React.ChangeEvent<HTMLInputElement>, setOfHours : string[]) => {
        setOfHours[0] = event.target.value;
    };

    const handleMaxHour = (event : React.ChangeEvent<HTMLInputElement>, setOfHours : string[]) => {
        setOfHours[1] = event.target.value;
    };

    return (
        hours.map( (setOfHours) => (
            <Fragment key={ uuidv4() }>

                <br />

                <TextField defaultValue={ setOfHours[0] } type='time' className='text-fields hour' onChange={ (event : React.ChangeEvent<HTMLInputElement>) => handleMinHour(event, setOfHours) }/>
                <TextField defaultValue={ setOfHours[1] } type='time' className='text-fields hour' onChange={ (event : React.ChangeEvent<HTMLInputElement>) => handleMaxHour(event, setOfHours) }/>

            </Fragment>
        ))
    );
}
