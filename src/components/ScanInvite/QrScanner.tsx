import { DoDisturb, QrCodeScanner } from '@mui/icons-material';
import { Button } from '@mui/material';
import QRReader from 'qrreader';
import { Fragment, useCallback, useEffect, useMemo } from 'react';


export function QrScanner( { setInviteID, cameraIsActive, setCameraIsActive, setIsValid } : { setInviteID : React.Dispatch<React.SetStateAction<string>>, cameraIsActive : boolean, setCameraIsActive : React.Dispatch<React.SetStateAction<boolean>>, setIsValid : React.Dispatch<React.SetStateAction<boolean>> } ) {

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
