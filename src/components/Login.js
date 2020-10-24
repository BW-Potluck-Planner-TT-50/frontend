import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router";
import schema from "./loginValidation";
import * as yup from "yup";
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// action
import { loggedInStatus } from '../store/action/eventAction'
import { isOrganizerStatus } from '../store/action/eventAction'

// redux hook
import { useDispatch } from 'react-redux'

const StyledLogin = styled.div`
  background-color: #D95D39;
  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
      form {
        text-align: center;
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
          padding: 2% 5%;
          font-size: 2rem;
          background-color: #581F18;
          color: white;
          margin-bottom: 4%;
          cursor: pointer;
        }
        .disabled {
          color: rgba(16, 16, 16, 0.3);
          background-color: rgba(239, 239, 239, 0.3);
          border: 0px solid transparent;
          box-shadow: 0px 0px 0px black;
          cursor: unset;
        }
        a {
          display: inline-block;
          color: #F0A202;
          font-size: 1.2rem;
          width: 350px;
          margin: 0 auto;
        }
      }
`

const blankData = {
    username: "",
    password: "",
};
const errorStrings = {
    username: "",
    password: "",
};

function Login()
{
  const dispatch = useDispatch()
    
    const [userData, setUserData] = useState(blankData);
    const [formErrors, setFormErrors] = useState(errorStrings);
    const [disabled, setDisabled] = useState(true);
    let history = useHistory();

    const change = (evt) =>
    {
        const { name, value } = evt.target;
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
                localStorage.setItem("organizer", true);
                dispatch(loggedInStatus(true))
                dispatch(isOrganizerStatus(true))
                setUserData(blankData)
                history.push("/events");
            })
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
                const submitBtnStyle = document.querySelector('#submit')
                submitBtnStyle.classList.remove('disabled')
                setDisabled(false)
            })

            .catch((err) =>
            {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                });
                const submitBtnStyle = document.querySelector('#submit')
                submitBtnStyle.classList.add('disabled')
                setDisabled(true)
            });
    };

    return (
        <StyledLogin>
          <form onSubmit={submit}>
            <h1>Login</h1>
            <div>
              <input type="text" name="username" placeholder="Username" value={userData.username} onChange={change} />
              <div className="error" style={{ color: "red" }}>{formErrors.username}</div>
            </div>
            <div> 
              <input type="password" name="password" placeholder="Password" value={userData.password} onChange={change} />
              <div className="error" style={{ color: "red" }}>{formErrors.password}</div>
            </div>
            <div>
                <button id="submit" className="disabled" disabled={disabled}>Submit</button>
            </div>
            <Link to="/register">Don't have an account? Click Here To Create One</Link>
          </form>
      </StyledLogin>
    );
}
export default Login 