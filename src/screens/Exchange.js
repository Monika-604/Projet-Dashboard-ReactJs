import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap';
import {
    fetchCrypto,
    fetchFiat,
    fetchWidgets
} from '../services/userService';
import { useDispatch, useSelector } from "react-redux";
import { HOST } from '../services/config'
import { toast } from 'react-toastify';
import axios from 'axios'
const Exchange = (props) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCrypto());
        dispatch(fetchFiat())
        dispatch(fetchWidgets())

    }, [dispatch])
    const crypto = useSelector(
        (state) => state.widgets.crypto
    );
    const fiat = useSelector(
        (state) => state.widgets.fiat
    );
    const widgets = useSelector(
        (state) => state.widgets.widgets
    );
    const addToWidgets = (widget) => {
        axios.post(`${HOST}user-widgets`,
            {
                "service": "exchange",
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
        <Row className="w-75 m-auto">
            <Col>
                <h5>Crypto</h5>
                <div className="widgets-box  exchange-widget" style={{ background: "#69c29e" }}>
                    {
                        crypto && (
                            <div>
                                <div>
                                    <b>BTC: </b>{
                                        crypto.currencies.btc
                                    }
                                </div>
                                <div>
                                    <b>ETH: </b> {
                                        crypto.currencies.eth
                                    }
                                </div>
                                <div>
                                    <b>BNB: </b> {
                                        crypto.currencies.bnb
                                    }
                                </div>
                                <div>
                                    <b>TRX: </b>{
                                        crypto.currencies.trx
                                    }
                                </div>

                            </div>
                        )
                    }

                </div>
            </Col>
            <Col >
                <h5 className="ml-5">Fiat</h5>
                <div className="widgets-box exchange-widget ml-5" style={{ background: "#69c29e" }}>
                    {
                        fiat && (
                            <div>
                                <div>
                                    <b>EUR: </b>{
                                        fiat.currencies.EUR
                                    }
                                </div>
                                <div>
                                    <b>GBP: </b>{
                                        fiat.currencies.GBP
                                    }
                                </div>
                                <div>
                                    <b>KRO: </b>{
                                        fiat.currencies.KRO
                                    }
                                </div>
                                <div>
                                    <b>RUB: </b>{
                                        fiat.currencies.RUB
                                    }
                                </div>

                            </div>
                        )
                    }

                </div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label><b>Dollar </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} type="number" placeholder="Enter Dollar" onChange={(e) => setValue(e.target.value)} />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                        <b>BTC </b>
                    </Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={crypto && crypto.currencies.btc * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>ETH </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={crypto && crypto.currencies.eth * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>BNB </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={crypto && crypto.currencies.bnb * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>TRX </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={crypto && crypto.currencies.trx * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
        </Row>
        <Row>

            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>EUR </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={fiat && fiat.currencies.EUR * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>GBP </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }}  value={fiat && fiat.currencies.GBP * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>KRO </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={fiat && fiat.currencies.KRO * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
            <Col lg={3}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><b>RUB </b></Form.Label>
                    <Form.Control className="rounded-pill" style={{ background: "#69c29e" }} value={fiat && fiat.currencies.RUB * value} placeholder="Enter email" disabled />

                </Form.Group>
            </Col>
        </Row>


    </Container>
}
export default Exchange;