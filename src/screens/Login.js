import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { setLogin, setUser } from '../Redux/Actions'
import axios from 'axios'
import { HOST } from '../services/config'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import Header from '../components/header/Header'
import GmailIcon from './gmail.jpg';


const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [waiting, setWaiting] = useState(false)
    const [error, setError] = useState('')

    function validateForm() {
        if (email.length === 0) {
            alert('Please Enter the Email')
        }
        else if (password.length === 0) {
            alert('Please Enter the Password')
        }
        else {
            return true;
        }

    }

    function handleSubmit(event) {

        if (validateForm()) {
            setWaiting(true)
            try {
                return axios.post(`${HOST}auth/login`,
                    {
                        username: email,
                        password: password
                    }
                ).then((response) => {
                    if (response) {
                        if (response?.response?.data.statusCode === 401) {
                            toast.error("username or password are wrong!")
                        }
                        else if (response.status === 201) {
                            const instance = axios.create({
                                baseURL: `${HOST}auth/profile`,
                                timeout: 2000,
                                headers: { 'Authorization': `Bearer ${localStorage.getItem("jwt")}` }
                            })
                            instance.get(`${HOST}auth/profile`).then((response) => {
                                if (response) {
                                    dispatch(setUser(response.data))
                                }

                            }).catch((error) => {

                            });
                            toast.success("Login has been successful!")
                            localStorage.setItem('jwt', response.data.access_token)
                            dispatch(setLogin(true))
                            props.history.push('/dashboard')
                        }

                        setWaiting(false)

                    }
                    return response
                }).catch((error) => {

                    setWaiting(false)
                    toast.error("Something went wrong. Try again.")
                    setError("Something went wrong. Try again.")
                });
            } catch (error) {
                return error
            }

        }


    }
    const responseGoogle = (response) => {
        console.log(response);
    }
    return (
        <>
            <Header />
            <div className="Login">
                <Form >
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="btn-login">
                        <Button
                            disabled={waiting}
                            block
                            size="lg" onClick={(e) => handleSubmit(e)}>
                            {
                                waiting ? 'loading...' : 'Login'
                            }

                        </Button>
                        <img src={GmailIcon} style={{ width: '40%',height:60 }} onClick={() => window.open('https://secret-savannah-85166.herokuapp.com/auth/google/login')} />
                    </div>

                </Form>
                <div>

                </div>
            </div>
        </>
    );
}
export default (withRouter(Login));