import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';


export function Map( { position } ) {

    const [map, setMap] = useState(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API
    });

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position);
        map.fitBounds(bounds);
        setMap(map);
    }, [ position ]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, [ ]);

    const showInMapClicked = () => {
        window.open('https://maps.google.com?q=' + position.lat + ',' + position.lng );
    };

    return isLoaded ? (

        <GoogleMap
            mapContainerClassName='map-container'
            center={ position }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
        >
            <Marker
                position={ position }
                onClick={ showInMapClicked }
                animation={ 0.0 }
            />
        </GoogleMap>

    ) : <></>;
}
