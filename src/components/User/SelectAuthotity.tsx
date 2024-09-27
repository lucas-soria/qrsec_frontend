import { ArrowDropDown } from '@mui/icons-material';
import { Autocomplete, Card, TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';


export function SelectAuthority( { authorities, setAuthorities } : { authorities : Authority[], setAuthorities : React.Dispatch<React.SetStateAction<Authority[]>> } ) { 

    interface OptionAuthority extends Partial<Authority> {
        name: string
    }

    const [open, setOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<OptionAuthority[]>([]);

    const loading = open && options.length === 0;
  
    useEffect( () => {

        const hardcodedAuthorities : Authority[] = [
            {
                authority: 'OWNER',
            },
            {
                authority: 'GUARD',
            },
            {
                authority: 'ADMIN',
            }
        ]
  
        if (!loading) {
            return undefined;
        }
  
        (async () => {

            setOptions(hardcodedAuthorities.map( (authority : Authority) => ( { ...authority, name: authority.authority.charAt(0).toUpperCase() + authority.authority.toLocaleUpperCase().slice(1) } )));

        })();
  
    }, [ loading ]);
  
    useEffect( () => {

        if (!open) {
            setOptions([]);
        }

    }, [ open ]);

    const handleSelect = (event : React.SyntheticEvent<Element, Event>, selectedAuthorities : OptionAuthority[]) => {
        setAuthorities(selectedAuthorities as Authority[]);
    };

    return (
        <Fragment>

            <div className='custom-component'>
                <Typography variant='h6'>Roles:</Typography>
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
                        value={ authorities.map( (authority) => {return {...authority, name: authority.authority.charAt(0).toUpperCase() + authority.authority.toLocaleUpperCase().slice(1)}} ) }
                        getOptionLabel={ (option) => option.name }
                        onChange={ handleSelect }
                        renderInput={ (user) => <TextField variant='outlined' className='text-fields' {...user} label='Seleccionar roles'/> }
                    />
                </Card>
            </div>

        </Fragment>
    );
}
