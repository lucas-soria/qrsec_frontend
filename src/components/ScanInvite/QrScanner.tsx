import { DoDisturb, QrCodeScanner } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import QRReader from 'qrreader';
import { Fragment, useCallback, useEffect, useMemo } from 'react';


export function QrScanner( { setInviteID, cameraIsActive, setCameraIsActive, setIsValid } : { setInviteID : React.Dispatch<React.SetStateAction<string>>, cameraIsActive : boolean, setCameraIsActive : React.Dispatch<React.SetStateAction<boolean>>, setIsValid : React.Dispatch<React.SetStateAction<boolean>> } ) {

    let qrsecLogo = '/QRSec logo.svg';

    var qrCodeReader = useMemo( () => new QRReader(), []);

    const stopCapture = useCallback( () => {
        if (!!qrCodeReader) {
            qrCodeReader.stopCapture();
        }
    }, [ qrCodeReader ]);

    const startCapture = useCallback( (videoElement : HTMLVideoElement) => {
        qrCodeReader.startCapture(videoElement)
            .then((result) => {
                setInviteID(result);
                setIsValid(false); // Still not validated
                setCameraIsActive(false);
                stopCapture();
            })
            .catch((error) => {
            });
    }, [ qrCodeReader, setCameraIsActive, setInviteID, stopCapture, setIsValid ]);

    const handleClick = () => {
        if (cameraIsActive) {
            setCameraIsActive(false);
            stopCapture();
            setInviteID('');
            setIsValid(false);
        } else {
            setCameraIsActive(true);
        }
    };

    useEffect( () => {

        const videoElement : HTMLVideoElement | null = document.querySelector('video');
        if (videoElement !== null) {
            startCapture(videoElement);
        };

    }, [ cameraIsActive, startCapture ]);

    return (

        <Fragment>

            <br />

            <Typography variant='h5'>Escanee el código QR de la entrada</Typography>

            <br />

            {cameraIsActive ? (
                <>
                    <video  
                        autoPlay={true}
                        id='video'
                        muted={true}
                        style={{width: '100%'}}
                    />
                    <br />
                    <Typography>Asegurece de que la pantalla del telefono se encuentre bien iluminada</Typography>
                    <br />
                </>
            ) : 
                <>
                    <div className='signin-logo'>
                        <img id='blue-logo' src={ qrsecLogo } alt='QRSec Logo' />
                    </div>
                    <br />
                </>
            }

            <div style={{display: 'flex', justifyContent:'center'}}>
                <Button 
                    variant='contained'
                    startIcon={ cameraIsActive ? <DoDisturb fontSize='large' /> : <QrCodeScanner fontSize='large' /> }
                    color={ cameraIsActive ? 'error' : 'primary' }
                    onClick={ handleClick }
                >
                    { cameraIsActive ? 'Cancelar' : 'Escanear' }
                </Button>
            </div>

        </Fragment>

    );
}
