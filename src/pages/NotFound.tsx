import { Fragment } from 'react';
import { NotFound } from '../components/NotFound';
import { Typography } from '@mui/material';


export function PageNotFound() {

    return (
        <Fragment>
            <NotFound>
            <Typography variant='h2'>404</Typography>
            <Typography variant='h6'>Ups!</Typography>
            <Typography variant='h6'>No hay nada que ver aquí</Typography>
            </NotFound>
        </Fragment>
    );
}
