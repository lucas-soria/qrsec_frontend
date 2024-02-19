import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { InviteInfo } from '../components/ScanInvite/InviteInfo'
import { QrScanner } from '../components/ScanInvite/QrScanner'

export function ScanInvite () {

    const [cameraIsActive, setCameraIsActive] = useState(false);

    const [inviteID, setInviteID] = useState("");

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
    )
}
