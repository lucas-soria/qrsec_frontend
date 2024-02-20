import { ArrowDropDown } from '@mui/icons-material';
import { Autocomplete, Card, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { getMyGuests } from '../../data/Reducers';
import { CreateGuest } from './CreateGuest';


export function SelectGuest( { guests, setGuests } ) {

    const addGuest = 'Agregar un nuevo invitado';

    const loading = open && options.length === 0;

    const [open, setOpen] = useState(false);

	const [openGuest, setOpenGuest] = useState(false);

    const [options, setOptions] = useState([]);
  
    useEffect( () => {
  
        if (!loading) {
            return undefined;
        }
  
        (async () => {

            const guests = await getMyGuests();
            setOptions([{ name: addGuest }, ...guests.map( guest => ( { ...guest, name: guest.firstName + ' ' + guest.lastName } ))]);

        })();
  
    }, [ loading ]);
  
    useEffect( () => {

        if (!open) {
            setOptions([]);
        }

    }, [ open ]);

    const removeFrom = (list, value) => {
        return list.filter(item => item !== value);
    };

    const handleSelect = (event, selectedGuests=undefined) => {
        let guestsHasAddGuest = false;
        selectedGuests.map(
            (guest) => {
                if (guest.name === addGuest) {
                    guestsHasAddGuest = true;
                }
            }
        );
        if (guestsHasAddGuest) {
            setOpenGuest(true);
            guests = removeFrom(guests, addGuest);
            setGuests(guests);
        } else {
            setGuests(selectedGuests);
        }
    };

    return (
        <Fragment>

            <div className='custom-component'>
                <Typography variant='h6'>Invitado:</Typography>
                <Card elevation={6} id='card' className='autocomplete'>
                    <Autocomplete
                        multiple
                        popupIcon={ <ArrowDropDown className='arrow-icon'/> }
                        blurOnSelect
                        open={ open }
                        onOpen={ () => {
                            setOpen(true);
                        }}
                        onClose={ () => {
                            setOpen(false);
                        }}
                        clearOnEscape
                        options={ options }
                        loading={ loading }
                        isOptionEqualToValue={ (option, value) => option.name === value.name }
                        value={ guests }
                        getOptionLabel={ (option) => option.name }
                        onChange={ handleSelect }
                        renderInput={ (guest) => <TextField variant='outlined' className='text-fields' {...guest} label='Seleccionar invitados'/> }
                    />
                </Card>
            </div>

		    <CreateGuest open={ openGuest } setOpen={ setOpenGuest }/>

        </Fragment>
    );
}
