import { ArrowDropDown } from '@mui/icons-material';
import { Autocomplete, Card, TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getMyGuests } from '../../data/Reducers.tsx';
import { CreateGuest } from './CreateGuest.tsx';


export function SelectGuest( { guests, setGuests } : { guests : Guest[], setGuests : React.Dispatch<React.SetStateAction<Guest[]>> } ) { 

    interface OptionGuest extends Partial<Guest> {
        name: string
    }

    const [open, setOpen] = useState<boolean>(false);

	const [openGuest, setOpenGuest] = useState<boolean>(false);

    const [options, setOptions] = useState<OptionGuest[]>([]);

    const addGuest = 'Agregar un nuevo invitado';

    const loading = open && options.length === 0;
  
    useEffect( () => {
  
        if (!loading) {
            return undefined;
        }
  
        (async () => {

            const guests : Guest[] = await getMyGuests();
            setOptions([{ name: addGuest }, ...guests.map( (guest : Guest) => ( { ...guest, name: guest.firstName + ' ' + guest.lastName } ))]);

        })();
  
    }, [ loading ]);
  
    useEffect( () => {

        if (!open) {
            setOptions([]);
        }

    }, [ open ]);

    const removeFrom = (list : any[], value : any) => {
        return list.filter(item => item !== value);
    };

    const handleSelect = (event : React.SyntheticEvent<Element, Event>, selectedGuests : OptionGuest[]) => {
        let guestsHasAddGuest = false;
        selectedGuests.forEach(
            (guest : OptionGuest) => {
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
            setGuests(selectedGuests as Guest[]);
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
                        value={ guests.map( (guest) => {return {...guest, name: guest.firstName + ' ' + guest.lastName}} ) }
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
