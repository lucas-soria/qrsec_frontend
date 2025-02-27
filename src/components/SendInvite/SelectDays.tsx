import { Card, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';
import { Fragment } from 'react';


export function SelectDays( { days, setDays } : { days : string[], setDays : React.Dispatch<React.SetStateAction<string[]>> } ) {

    const matches = useMediaQuery('(min-width:800px)');

    const handleDays = (event : React.MouseEvent<HTMLElement, MouseEvent>, newDays : string[] ) => {
        setDays(newDays);
    };

    return (
        <Fragment>

            <div className='custom-component'>

                <Typography variant='h6'>Días permitidos:</Typography>

                <Card elevation={6} id='card' className='card-days'>
                    <ToggleButtonGroup className='days-group' value={ days } onChange={ handleDays } orientation={ `${ matches ? `horizontal` : `vertical`}` } size='small'>
                        <ToggleButton id='day' value='1'>Lunes</ToggleButton>
                        <ToggleButton id='day' value='2'>Martes</ToggleButton>
                        <ToggleButton id='day' value='3'>Miercoles</ToggleButton>
                        <ToggleButton id='day' value='4'>Jueves</ToggleButton>
                        <ToggleButton id='day' value='5'>Viernes</ToggleButton>
                        <ToggleButton id='day' value='6'>Sabado</ToggleButton>
                        <ToggleButton id='day' value='0'>Domingo</ToggleButton>
                    </ToggleButtonGroup>
                </Card>

            </div>

        </Fragment>
    );
}
