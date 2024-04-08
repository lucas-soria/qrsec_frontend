import { Typography } from '@mui/material';
import { Fragment } from 'react';
import QRCode from 'react-qr-code';


export function QRCodeComponent( { id } : { id : string } ) { 

  	return (
    	<Fragment>

			<Typography variant='h5'>Mostrá este código en la entrada:</Typography>
			<QRCode value={ id } bgColor='rgba(0,0,0,0)' fgColor='white' level='H' size={ 256 } style={{ height: "auto", maxWidth: "100%", width: "100%" }}/>

		</Fragment>
  	);
}
