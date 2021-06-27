import { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
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
import Sidebar from "react-sidebar";

import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/header/Header'


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
  const [value, setValue] = useState('10:00');
  const { isLoging, services } = props;
  const styles = {
    sidebar: {
      width: 256,
      height: "100%"
    },
    sidebarLink: {
      display: "block",
      padding: "16px 0px",
      color: "#757575",
      textDecoration: "none"
    },
    divider: {
      margin: "8px 0",
      height: 1,
      backgroundColor: "#757575"
    },
    content: {
      paddingLeft: "6px",
      height: "100%",
      backgroundColor: "white"
    }
  };

  return (
    <div className="bg-info">
      <Sidebar
        styles={styles}
        sidebar={
          <div>
            <h1>Title</h1>
            <div className="sidebar-list">
              {
                services.map((item, index) => {
                  return <div key={index} className="pb-4">
                    <Link to={`/dashboard/${item.name}`}>
                      {item.name}
                    </Link>
                  
                    </div>
                })
              }
              <div  className="pb-4">
                <Link to={`/dashboard/my-widgets`}>
                  My widgets
                </Link>

              </div>
            </div>
          </div>}
        docked={true}


      >
        <Header />
        {
          isLoging && (
            <div className="map-container">
              <MapWithAMarkerClusterer />
            </div>
          )
        }
        <Container style={{ marginTop: 30, marginBottom: 30 }}>
          <Row>
            <Col>
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </Col>
            <Col>
              <TimePicker
                onChange={(e) => {
                  setValue(e)


                }}
                value={value}
              />
            </Col>
          </Row>
        </Container>

      </Sidebar>

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

