import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 43.4050,
    lng: -72.7277
};

console.log("🚀 ~ file: MountainMap.jsx:18 ~ MountainMap ~ process.env.G_MAPS_API_KEY:", process.env.REACT_APP_G_MAPS_API_KEY)
function MountainMap() {
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_G_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
            >
                {/* You can add markers or other components here */}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MountainMap);