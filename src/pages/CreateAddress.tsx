import { Fragment, useEffect, useState } from 'react';
import { CreateAddress } from '../components/CreateAddress/Address.tsx';
import { Map } from '../components/ShowInvite/Map.tsx';


export function CreateNewAddress () {

    useEffect(() => {

        document.title = 'QRSec - Crear dirección';

    }, []);

    const [address, setAddress] = useState<Address | null>(null);

    return (
        <Fragment>

            <br />

            <CreateAddress address={ address } setAddress={ setAddress }/>

            {address && (
                <div>
                    <br />
                    <Map position={ { lat: address.location.coordinates[0], lng: address.location.coordinates[1] } }/>
                </div>
            )}

        </Fragment>
    );
}
