import { ArrowDropDown } from '@mui/icons-material';
import { Autocomplete, Card, TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getAddresses } from '../../data/Reducers.tsx';


export function SelectAddress( { address, setAddress } : { address : Address, setAddress : React.Dispatch<React.SetStateAction<Address>> } ) { 

    interface OptionAddress extends Partial<Address> {
        name: string
    }

    const [open, setOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<OptionAddress[]>([]);

    const loading = open && options.length === 0;
  
    useEffect( () => {
  
        if (!loading) {
            return undefined;
        }
  
        (async () => {

            const addresses : Address[] = await getAddresses();
            setOptions(addresses.map( (address : Address) => ( { ...address, name: address.house.block + ' ' + address.house.house } )));

        })();
  
    }, [ loading ]);
  
    useEffect( () => {

        if (!open) {
            setOptions([]);
        }

    }, [ open ]);

    const handleSelect = (event : React.SyntheticEvent<Element, Event>, selectedAddress : OptionAddress | null) => {
        if (selectedAddress) {
            setAddress(selectedAddress as Address);
        }
    };

    return (
        <Fragment>

            <div className='custom-component'>
                <Typography variant='h6'>Dirección:</Typography>
                <Card elevation={6} id='card' className='autocomplete'>
                    <Autocomplete
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
                        getOptionLabel={ (option) => option.name }
                        onChange={ handleSelect }
                        renderInput={ (user) => <TextField variant='outlined' className='text-fields' {...user} label='Seleccionar dirección'/> }
                    />
                </Card>
            </div>

        </Fragment>
    );
}
