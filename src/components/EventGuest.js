import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'

const StyledEventGuest = styled.div`
  background-color: #202C59;
  height: 80vh;
  width: 100%;
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    form {
      background-color: #F0A202;
      box-shadow: 3px 3px 5px black;
      padding: 3%;
      min-width: 35%;
      color: white;
      text-shadow: 1px 1px 1px black;
      h2 {
        margin: 0px auto;
        width: 350px;
      }
      .errors {
        height: 20px;
        color: red;
        font-weight: bold;
        font-size: 1.2rem;
        width: 400px;
        margin: 0px auto;
      }
      input {
        padding: 2%;
        text-align: center;
        font-size: 1.5rem;
      }
      button {
        padding: 2% 5%;
        font-size: 2rem;
        background-color: #202C59;
        color: white;
        transform: all .2s;
        box-shadow: 3px 3px 5px black;
        margin-top: 3%;
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

const schema = yup.object().shape({
  eventCode: yup.string().required("You Must Enter An Event Code To Continue").min(7, "Must be at least 7 characters"),
  name: yup.string().required("You must enter your name")
})

function EventGuest() {
  const [form, setForm] = useState({
    eventCode: "",
    name: ""
  })
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({  eventCode: "" })
  
  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({...errors, [name]: ''}))
    .catch(err => setErrors({...errors, [name]: err.errors[0]}))
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
    console.log(form.eventCode)
    // axios.post('https://dosomestuff.com', {form})
    // .then(res => {
    //   //Do some stuff
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  return (
    <StyledEventGuest>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Join An Event!</h1>
          <h2>Enter Your Name and Event Code Below</h2>
          <div className="errors">{errors.name}</div>
          <div>
            <input autoComplete="off" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="errors">{errors.eventCode}</div>
          <div>
            <input autoComplete="off" placeholder="Event Code" name="eventCode" value={form.eventCode} onChange={handleChange} />
          </div>
          <button disabled={disabled} id="submit">Submit</button>
        </form>
      </div>
      
    </StyledEventGuest>
  )
}

export default EventGuest