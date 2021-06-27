import React, { useEffect } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap';
import {
    fetchTemprature,
    fetchClimate,
    fetchRainfall,
    fetchWidgets
} from '../services/userService';
import { useDispatch, useSelector } from "react-redux";
import { HOST } from '../services/config'
import { toast } from 'react-toastify';
import axios from 'axios'
const Weather = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTemprature('tehran'));
        dispatch(fetchClimate('tehran'))
        dispatch(fetchRainfall('tehran'))
        dispatch(fetchWidgets())

    }, [])
    const rain = useSelector(
        (state) => state.widgets.rain
    );
    const climate = useSelector(
        (state) => state.widgets.climate
    );
    const temprature = useSelector(
        (state) => state.widgets.temprature
    );
    const widgets = useSelector(
        (state) => state.widgets.widgets
    );
    console.log('widgets', widgets)
    const addToWidgets = (widget) => {
        axios.post(`${HOST}user-widgets`,
            {
                "service": "weather",
                widget: widget,
            }
        ).then((response) => {
            if (response) {
                if (response?.response?.data.statusCode === 401) {
                   
                }
                else if (response.status === 201) {

                    toast.success("َAdding Widget has been successful!")
                   
                }

               

            }
            return response
        }).catch((error) => {

            
            toast.error("Something went wrong. Try again.")
           
        });
    }
    return <Container className="mt-5">
        <Row className="w-75 m-auto ">
            <Col lg={4} >
                <Form.Group controlId="exampleForm.ControlSelect1" onChange={(e) => {
                    dispatch(fetchTemprature(e.target.value));
                    dispatch(fetchClimate(e.target.value))
                    dispatch(fetchRainfall(e.target.value))
                }}>
                    <h5>Please Select City</h5>
                    <Form.Control as="select" className="rounded-pill">
                        <option value="paris">Paris</option>
                        <option value="london">London</option>
                        <option value="new york">New York</option>
                        <option value="berlin">Berlin</option>
                        <option value="canberra">Canberra</option>
                        <option value="ottawa">Ottawa</option>
                        <option value="tehran">Tehran</option>
                        <option value="washington">Washington</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col lg={8} >
                <Col >

                    <h5>Temperature</h5>
                    <div className="widgets-box mx-auto mb-3 px-4" style={{ background: "#69c29e" }}>
                        <button onClick={() => addToWidgets('temperature')}>+</button>
                        <div>city:{rain && rain.city}</div>
                        <div>snow:{rain && rain.snow}</div>
                        <div> rain:{rain && rain.rain}</div>
                    </div>
                </Col>
                <Col>

                    <h5>Climate</h5>
                    <div className="widgets-box  mx-auto mb-3 px-4" style={{ background: "#69c29e" }}>
                        <button onClick={() => addToWidgets('climate')}>+</button>
                        <div>city:{climate && climate.city}</div>
                        <div>condition:{climate && climate.condition}</div>
                    </div>
                </Col>
                <Col >

                    <h5>Rainfall</h5>
                    <div className="widgets-box  mx-auto mb-3 px-4" style={{ background: "#69c29e" }} >
                        <button onClick={() => addToWidgets('rainfall')}>+</button>
                        <div>city:{temprature && temprature.city}</div>
                        <div>humidity:{temprature && temprature.humidity}</div>
                        <div> temperature:{temprature ? `${temprature.temperature} ${temprature.unit}` : ''}</div>
                    </div>
                </Col>
            </Col>


        </Row>
    </Container>
}
export default Weather;