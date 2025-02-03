import { Typography } from '@mui/material';
import { Fragment } from 'react';
import QRCode from 'react-qr-code';


export function QRCodeComponent( { id } : { id : string } ) { 

  	return (
    	<Fragment>

			<Typography variant='h5'>Mostrá este código en la entrada:</Typography>
			<QRCode className='qrcode' value={ id } bgColor='rgba(0,0,0,0)' fgColor='black' level='H' size={ 256 } />

		</Fragment>
  	);
}
