import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'

const StyledEventGuest = styled.div`
  background-color: #202C59;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .form-container {
    background-color: #F0A202;
    box-shadow: 3px 3px 5px black;
    padding: 3%;
    h2 {
      margin-bottom: 0px;
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
      margin: 2%;
      padding: 2%;
      font-size: 1.2rem;
    }
    button {
      font-size: 2.5rem;
      padding: 2% 5%;
      background-color: #202C59;
      color: white;
      border: 2px solid black;
      transform: all .2s;
      box-shadow: 3px 3px 5px black;
    }
    .disabled {
      color: rgba(16, 16, 16, 0.3);
      background-color: rgba(239, 239, 239, 0.3);
      border: 2px solid #666;
      box-shadow: 0px 0px 0px black;
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
        <h1>Join An Event!</h1>
        <form onSubmit={handleSubmit}>
          <h2>Enter Event Code Below</h2>
          <div className="errors">{errors.name}</div>
          <div>
            <input autoComplete="off" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="errors">{errors.eventCode}</div>
          <div>
            <input autoComplete="off" name="eventCode" value={form.eventCode} onChange={handleChange} />
          </div>
          <button disabled={disabled} id="submit">Submit</button>
        </form>
      </div>
      
    </StyledEventGuest>
  )
}

export default EventGuest