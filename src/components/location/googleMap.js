import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

let markers = [
    {
        id: 1,
        latitude: 25.0391667,
        longitude: 121.525,
        shelter: 'marker 1',
    },
    {
        id: 2,
        latitude: 24.0391667,
        longitude: 110.525,
        shelter: 'marker 2'

    },
    {
        id: 3,
        latitude: 20.0391667,
        longitude: 100.525,
        shelter: 'marker 3'

    }
]

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZN6EEeeaHPlqNx9fAV4YQgR7ksGNoWaQ&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        {markers.map(marker => {
            //const onClick = props.onClick.bind(this, marker)
            return (
                <Marker
                    key={marker.id}
                  

                    position={{ lat: marker.latitude, lng: marker.longitude }}
                >
                    <InfoWindow>
                        <div>{marker.shelter}</div>
                    </InfoWindow>
                </Marker>
            )
        })}
    </GoogleMap>
);

class googleMap extends Component {

    render() {
        return (
            <div className="location-container">
            
                <MapWithAMarkerClusterer />
            </div>

        )
    }
}

export default googleMap;
