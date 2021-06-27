import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { setLogin, setVrified } from '../Redux/Actions'
import axios from 'axios'
import { HOST } from '../services/config'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Header from '../components/header/Header'

const Register = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [waiting, setWaiting] = useState(false)
    const [error, setError] = useState('')
    function validateForm() {
        if (email.length === 0) {
            alert('Please Enter the Email')
        }
        if (name.length === 0) {
            alert('Please Enter the name')
        }
        if (username.length === 0) {
            alert('Please Enter the family')
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
            try {
                return axios.post(`${HOST}auth/signup`,
                    {
                        username: username,
                        password: password,
                        email: email,
                        name: name
                    }
                ).then((response) => {
                    if (response) {
                        if (response?.response?.data.statusCode === 401) {
                            toast.error("username or password are wrong!")
                        }
                        else if (response.status === 201) {

                            toast.success("Register has been successful!")
                            props.history.push('/login')
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

    return (
        <>
            <Header />
            <div className="Login">
                <Form >
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <Button block size="lg" onClick={(e) => handleSubmit(e)}>
                        {
                            waiting ? 'loading...' : 'Register'
                        }

                    </Button>
                </Form>
            </div>
        </>
    );
}
export default (withRouter(Register));