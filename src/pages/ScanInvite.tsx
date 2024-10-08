import { Fragment, useEffect, useState } from 'react';
import { InviteInfo } from '../components/ScanInvite/InviteInfo.tsx';
import { QrScanner } from '../components/ScanInvite/QrScanner.tsx';


export function ScanInvite () {

    const [cameraIsActive, setCameraIsActive] = useState<boolean>(false);

    const [inviteID, setInviteID] = useState<string>('');

    useEffect(() => {

        document.title = 'QRSec - Escanear invitaciones';

    }, []);

    return (
        <Fragment>

            <br />

            <QrScanner setInviteID={ setInviteID } cameraIsActive={ cameraIsActive } setCameraIsActive={ setCameraIsActive }/>

            <br /><br />

            {inviteID && (

                <InviteInfo inviteID={ inviteID } cameraIsActive={ cameraIsActive }/>

            )}

        </Fragment>
    );
}
