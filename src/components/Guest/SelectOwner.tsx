import { ArrowDropDown } from '@mui/icons-material';
import { Autocomplete, Card, TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getUsers } from '../../data/Reducers.tsx';


export function SelectOwner( { users, setUsers } : { users : User[], setUsers : React.Dispatch<React.SetStateAction<User[]>> } ) { 

    interface OptionUser extends Partial<User> {
        name: string
    }

    const [open, setOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<OptionUser[]>([]);

    const loading = open && options.length === 0;
  
    useEffect( () => {
  
        if (!loading) {
            return undefined;
        }
  
        (async () => {

            const users : User[] = await getUsers();
            setOptions(users.map( (user : User) => ( { ...user, name: user.firstName + ' ' + user.lastName } )));

        })();
  
    }, [ loading ]);
  
    useEffect( () => {

        if (!open) {
            setOptions([]);
        }

    }, [ open ]);

    const handleSelect = (event : React.SyntheticEvent<Element, Event>, selectedUsers : OptionUser[]) => {
        setUsers(selectedUsers as User[]);
    };

    return (
        <Fragment>

            <div className='custom-component'>
                <Typography variant='h6'>Propietarios relacionados:</Typography>
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
                        value={ users.map( (user) => {return {...user, name: user.firstName + ' ' + user.lastName}} ) }
                        getOptionLabel={ (option) => option.name }
                        onChange={ handleSelect }
                        renderInput={ (user) => <TextField variant='outlined' className='text-fields' {...user} label='Seleccionar propietarios'/> }
                    />
                </Card>
            </div>

        </Fragment>
    );
}
