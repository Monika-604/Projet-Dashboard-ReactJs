import React, { useEffect } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap';
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
const Widgets = (props) => {
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
    const removeToWidgets = (widget) => {
        axios.delete(`${HOST}user-widgets/${widget}`).then((response) => {
            if (response) {
                if (response?.response?.data.statusCode === 401) {

                }
                else if (response.status === 200) {
                    dispatch(fetchWidgets())
                    toast.success("َRemoving Widget has been successful!")

                }
            }
            return response
        }).catch((error) => {
            toast.error("Something went wrong. Try again.")

        });
    }
    return <Container className="mt-5">
        <Row className="w-75 m-auto ">
            {
                widgets.map((item, index) => {
                    return <Col key={index} lg={12}>
                        <h1>{item.service} {item.widget} <Button variant="danger" onClick={() => removeToWidgets(item._id)}>remove</Button>
                        </h1>
                    </Col>
                })
            }

        </Row>
    </Container>
}
export default Widgets;