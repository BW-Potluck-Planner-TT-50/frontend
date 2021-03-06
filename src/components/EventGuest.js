import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import * as yup from 'yup'

// action
import { loggedInStatus } from '../store/action/eventAction'
import { isOrganizerStatus } from '../store/action/eventAction'

// redux hooks
import { useDispatch } from 'react-redux'

const StyledEventGuest = styled.div`
  background-color: #202C59;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  form {
    background-color: #F0A202;
    box-shadow: 3px 3px 5px black;
    padding: 3%;
    min-width: 35%;
    color: white;
    text-shadow: 1px 1px 1px black;
    h1 {
      @media(max-width: 500px) {
        width: 200px;
        font-size: 1.2rem;
      }
    }
    h2 {
      margin: 0px auto;
      width: 350px;
      @media(max-width: 500px) {
        width: 200px;
        font-size: 1.1rem;
      }
    }
    .errors {
      height: 20px;
      color: red;
      font-weight: bold;
      font-size: 1.2rem;
      width: 400px;
      margin: 0px auto;
      @media(max-width: 500px) {
        width: 200px;
        font-size: 1rem;
      }
    }
    input {
      padding: 2%;
      text-align: center;
      font-size: 1.5rem;
      @media(max-width: 500px) {
        margin: 2%;
        padding: .5%;
        font-size: 1rem;
      }
    }
    .login-error {
      height: 20px;
      width: 350px;
      color: red;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0px auto;
      @media(max-width: 500px) {
        width: 200px;
        font-size: 1rem;
      }
    }
    button {
      padding: 2% 5%;
      font-size: 2rem;
      background-color: #202C59;
      color: white;
      transform: all .2s;
      box-shadow: 3px 3px 5px black;
      margin-top: 3%;
      cursor: pointer;
      @media(max-width: 500px) {
        padding: .5% 2.5%;
        font-size: 1rem;
        margin-top: 2%;
      }
    }
    .disabled {
      color: rgba(16, 16, 16, 0.3);
      background-color: rgba(239, 239, 239, 0.3);
      border: 0px solid transparent;
      box-shadow: 0px 0px 0px black;
    }
  }
`

const schema = yup.object().shape({
  invite_code: yup.string().required("You Must Enter An Event Code To Continue").min(7, "Must be at least 7 characters"),
  name: yup.string().required("You must enter your name")
})


function EventGuest() {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: "",
    invite_code: "",
  })

  const history = useHistory()

  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({  invite_code: "", incorrectLogin: "" })
  
  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({...errors, [name]: '', incorrectLogin: ""}))
    .catch(err => setErrors({...errors, [name]: err.errors[0], incorrectLogin: ""}))
  }

  function handleChange(e) {
    const { value, name} = e.target
    setFormErrors(name, value)
    setForm({ ...form, [name]: value})
  }

  useEffect(() => {
    schema.isValid(form).then(valid => {
      const submit = document.querySelector('#submit')
      !valid ? submit.classList.add('disabled') : submit.classList.remove('disabled')
      setDisabled(!valid)
    })
  }, [form])

  function handleSubmit(e) {
    e.preventDefault()
    axiosWithAuth()
      .post("/api/auth-guest/login", form)
      .then((res) =>
      {
        setErrors({
          ...errors,
          incorrectLogin: ""
        })
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("organizer", false);
        dispatch(loggedInStatus(true))
        dispatch(isOrganizerStatus(false))
        
        history.push("/plan");
      })
      .catch(err => {
        setErrors({
          ...errors,
          incorrectLogin: "Invalid name or event code"
        })
      })
  };
  

  return (
    <StyledEventGuest>
      <form onSubmit={handleSubmit}>
        <h1>Join An Event!</h1>
        <h2>Enter Your Name and Event Code Below</h2>
        <div className="errors">{errors.name}</div>
        <div>
          <input autoComplete="off" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="errors">{errors.invite_code}</div>
        <div>
          <input autoComplete="off" placeholder="Event Code" name="invite_code" value={form.invite_code} onChange={handleChange} />
        </div>
        <div className="login-error">{errors.incorrectLogin}</div>
        <button disabled={disabled} id="submit">Submit</button>
      </form>
    </StyledEventGuest>
  )
}

export default EventGuest