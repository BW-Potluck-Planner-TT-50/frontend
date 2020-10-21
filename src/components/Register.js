import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import styled from 'styled-components'

const StyledRegister = styled.div`

  height: 80vh;
  width: 100%;
  background-color: #D95D39;
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;

      form {
        padding: 3%;
        box-shadow: 3px 3px 3px black;
        background-color: #202C59;
        color: white;
        label {
          font-size: 2rem;
        }
        input {
          margin: 3%;
          padding: 2%;
        }
        .error {
          min-height: 20px;
        }
        button {
          padding: 2% 5%;
          font-size: 2rem;
          cursor: pointer;
          margin-bottom: 4%;
          color: white;
          &:hover {
            background-color: #581F18;
          }
        }
        a {
          display: inline-block;
          color: #F0A202;
          font-size: 1.2rem;
          width: 350px;
          margin: 0 auto;
        }
      }
    }
`

const schema = yup.object().shape({
    username: yup.string().required('Name is required').min(5, 'Name needs to be 5 chars min'),
    password: yup.string().required('Password is required').min(8, 'Password needs to be 8 chars min').matches(/[A-Z]/, 'Passwords must include an uppercase letter').matches(/[a-z]/, 'Passwords must include a lowercase letter').matches(/\d/, 'Passwords must include a number').matches(/\W/, 'Passwords must include a special character')
})

function Register()
{


  const history = useHistory()

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: ""
  })

  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({  username: "", password: "" })

    const setFormErrors = (name, value) =>
    {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    function handleChange(e)
    {
        const { value, name } = e.target
        setFormErrors(name, value)
        setRegisterForm({
            ...registerForm,
            [name]: value
        })
    }


  useEffect(() => {
    schema
      .isValid(registerForm)
      .then(valid => setDisabled(!valid))
  }, [registerForm])

  function submit(e) {

    e.preventDefault()

    axiosWithAuth()
      .post('/api/auth/register', {
        username: registerForm.username.trim(),
        password: registerForm.password.trim()
      })
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/login')
      })
      .catch(err => {
        console.log(err)
      })
      setRegisterForm({
        username: '',
        password: '',
      })
  }

    return (
        <StyledRegister>
            <div className="register-container">
                <form onSubmit={submit}>
                    <h1>Register</h1>
                    <div>
                        <label> Username
              <input name="username" value={registerForm.username} onChange={handleChange} />

            </label>
            <div className="error" style={{ color: "red" }}>
              {errors.username}
            </div>
          </div>
          <div>
            <label> Password   
              <input name="password" type="password" value={registerForm.password} onChange={handleChange} />
                        </label>
                        <div className="error" style={{ color: "red" }}>
                            {errors.password}
                        </div>
                    </div>
                    <div>
                        <button id="submit" disabled={disabled}>Submit</button>
                    </div>
                    <Link to="/login">Already Have An Account? Click Here To Login</Link>
                </form>

            </div>

        </StyledRegister>
    )
}

export default Register