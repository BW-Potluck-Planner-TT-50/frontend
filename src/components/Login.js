import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link, useHistory } from "react-router-dom";
import schema from "./loginValidation";
import * as yup from "yup";
import styled from "styled-components"
import { Card, Container, Col, Button, Form, Input } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './Login.scss'


const StyledLogin = styled.div`
  background-color: #f88e79;
  width: 60vw;
  height: 70vh;
  margin: 15vh auto;
    .login-container {
      display: flex;
      text-align: center;
      form {
        background-color: #202C59;
        box-shadow: 3px 3px 3px black;
        padding: 3%;
        min-width: 35%;
        color: white;
        text-shadow: 1px 1px 1px black;
        .errors {
          height: 20px;
          color: red;
          font-weight: bold;
          font-size: 1.2rem;
          width: 400px;
          margin: 0px auto;
        }
        input {
          margin: 3%;
          padding: 2%;
          text-align: center;
          font-size: 1.5rem;
        }
        button {
            font-size: 1em;
            margin: 1em;
            padding: 0.25em 1em;
            border-radius: 3px;
            background-color: #581F18;
            color:olive;
        }
        .disabled {
          color: rgba(16, 16, 16, 0.3);
          background-color: rgba(239, 239, 239, 0.3);
          border: 0px solid transparent;
          box-shadow: 0px 0px 0px black;
        
        }
    }
    }
    `



function Login({ setLoggedIn, setIsOrganizer })
{
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [disabled, setDisabled] = useState(true);
    const [formErrors, setFormErrors] = useState({ username: "", password: "" });

    let history = useHistory();

    const change = (e) =>
    {
        const { name, value } = e.target;
        validate(name, value);
        setUserData({ ...userData, [name]: value });
    };


    const submit = (evt) =>
    {
        evt.preventDefault();
        axiosWithAuth()
            .post("/api/auth/login", userData)
            .then((res) =>
            {
                localStorage.setItem("token", res.data.token);
                history.push("/protected");
            })
            .catch((err) =>
            {
                console.log(err);
            })
            .finally(() =>
            {
                setUserData('');
                window.location.reload()
            });
    };


    const validate = (name, value) =>
    {
        yup
            .reach(schema, name)
            .validate(value)
            .then((valid) =>
            {
                setFormErrors({
                    ...formErrors,
                    [name]: "",
                });
                setDisabled(false)
            })

            .catch((err) =>
            {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                });
                setDisabled(true)
            });
    };


    useEffect(() =>
    {
        schema.isValid(userData).then((valid) =>
        {
            setDisabled(!valid);
        });
    }, [userData]);




    return (
        <Container className=".logincontainer">
            <Col>
                <Card className='loginCard'>            
                    <h1 className='loginHeader'>Sign in to your account</h1>
                    <Form onSubmit={submit}>
                        <Input
                            type='text'
                            name='username'
                            placeholder='Username'
                            className='loginInput'
                            value={userData.username}
                            onChange={change}
                        />

                        <p className="errorMsg">{formErrors.username}</p>


                        <Input
                            type='password'
                            name='password'
                            placeholder='Password'
                            className='loginInput'
                            value={userData.password}
                            onChange={change}
                        />

                        <Button className='loginButton' type='submit'>Login </Button>
                    </Form>
                </Card>
            </Col>
        </Container>

    )
}

export default Login 