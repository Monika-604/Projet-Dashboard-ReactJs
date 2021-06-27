import { useState } from 'react';
import {  withRouter} from "react-router-dom";
import { Bar, Line } from 'react-chartjs-2';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import {
    Container,
    Col,
    Row
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { connect } from "react-redux";


import "react-datepicker/dist/react-datepicker.css";
const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};

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
function Home(props) {
    const [startDate, setStartDate] = useState(new Date());
    const time=new Date()
    const [value, setValue] = useState(time.toLocaleTimeString());
    const { isLoging } = props;


    return (
        <div >
            <Container>
                <Row>
                    <Col lg={6}>
                        <Bar data={data} options={options} />
                    </Col>
                    <Col lg={6}>
                        <Line data={data} options={options} />
                    </Col>
                </Row>
            </Container>

           
            {
                isLoging && (
                    <div className="map-container">
                        <MapWithAMarkerClusterer />
                    </div>
                )
            }
            <Container className="w-75 mx-auto mt-5 rounded-pill bg-light" style={{ boxShadow:"0px 0px 10px rgba(0,0,0,0.2)", padding:"25px"}}>
                <Row>
                    <Col>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </Col>
                    <Col>
                        <TimePicker className="bg-light"
                            onChange={(e) => {
                                setValue(e)
                            }}
                            value={value}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
const mapStateToProps = (state) => {
    const { isLoging, services } = state.userDetail;

    return {
        isLoging,
        services
    };
};

export default connect(mapStateToProps)(withRouter(Home));

