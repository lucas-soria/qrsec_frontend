import { DoDisturb, QrCodeScanner } from '@mui/icons-material';
import { Button } from '@mui/material';
import QRReader from 'qrreader';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';


export function QrScanner( { setInviteID, cameraIsActive, setCameraIsActive } : { setInviteID : React.Dispatch<React.SetStateAction<string>>, cameraIsActive : boolean, setCameraIsActive : React.Dispatch<React.SetStateAction<boolean>> } ) {

    var qrCodeReader = useMemo( () => new QRReader(), []);

    const stopCapture = useCallback( () => {
        if (!!qrCodeReader) {
            qrCodeReader.stopCapture();
        }
    }, [ qrCodeReader ]);

    const startCapture = useCallback( (videoElement : HTMLVideoElement) => {
        qrCodeReader.startCapture(videoElement)
            .then((result) => {
                console.log(result)
                setInviteID(result);
                setCameraIsActive(false);
                stopCapture();
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ qrCodeReader, setCameraIsActive, setInviteID, stopCapture ]);

    const handleClick = () => {
        if (cameraIsActive) {
            setCameraIsActive(false);
            stopCapture();
            setInviteID('')
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
