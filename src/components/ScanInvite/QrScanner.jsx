import { DoDisturb, QrCodeScanner } from '@mui/icons-material';
import { Button } from '@mui/material';
import QRReader from 'qrreader';
import React, { Fragment, useEffect } from 'react';


export function QrScanner( { setInviteID, cameraIsActive, setCameraIsActive } ) {

    var qrCodeReader;

    const handleClick = () => {
        if (cameraIsActive) {
            setCameraIsActive(false);
            stopCapture();
        } else {
            setCameraIsActive(true);
        }
    };

    const startCapture = (videoElement) => {
        qrCodeReader.startCapture(videoElement)
            .then((result) => {
                setInviteID(result);
                setCameraIsActive(false);
                stopCapture();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const stopCapture = () => {
        if (!!qrCodeReader) {
            qrCodeReader.stopCapture();
        }
    };

    useEffect( () => {

        if (QRReader) {
            qrCodeReader = new QRReader();
            const videoElement = document.querySelector('video');
            startCapture(videoElement);
        }

    }, [ QRReader, cameraIsActive ]);

    return (

        <Fragment>

            {cameraIsActive && (
                <video  
                    autoPlay={true}
                    id='video'
                    muted={true}
                    style={{width: '100%'}}
                />
            )}

            <Button 
                variant='contained'
                startIcon={ cameraIsActive ? <DoDisturb fontSize='large' /> : <QrCodeScanner fontSize='large' /> }
                onClick={ handleClick }
            >
                { cameraIsActive ? 'Cancelar' : 'Escanear' }
            </Button>

        </Fragment>

    );
}
