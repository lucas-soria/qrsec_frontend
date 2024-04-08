import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';


export function Map( { position } : { position : {lat: number, lng: number} } ) { 

    const [ , setMap] = useState<google.maps.Map | null>(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API as string
    });

    const onLoad = useCallback( (map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(position);
        map.fitBounds(bounds);
        setMap(map);
    }, [ position ]);

    const onUnmount = useCallback( () => {
        setMap(null);
    }, [ ]);

    const showInMapClicked = () => {
        window.open('https://maps.google.com?q=' + position.lat + ',' + position.lng );
    };

    return isLoaded ? (

        <GoogleMap
            mapContainerClassName='map-container'
            center={ position }
            zoom={ 15 }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
        >
            <Marker
                position={ position }
                onClick={ showInMapClicked }
                animation={ google.maps.Animation.BOUNCE }
            />
        </GoogleMap>

    ) : <></>;
}
