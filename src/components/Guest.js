import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'
import * as yup from 'yup'

const StyledGuest = styled.div`
  background-color: #202C59;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .guest-select-box {
    text-align: center;
    background-color: #F0A202;
    box-shadow: 3px 3px 5px black;
    padding: 3%;
    min-width: 45%;
    color: white;
    text-shadow: 1px 1px 1px black;
    h1 {

    }
    form {
      input, label {
        padding: 3%;
        margin-bottom: 6%;
        text-align: center;
        font-size: 2rem;
      }
      input[type="checkbox"] {
        width:30px;
        height:30px;
        vertical-align: top;
      }
      select {
        margin-left: 2%;
        text-align: center;
        font-size: 1.5rem;
      }
      .login-error {
        height: 20px;
        width: 450px;
        color: red;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0px auto;
      }
      button {
        padding: 2% 5%;
        font-size: 2rem;
        background-color: #202C59;
        color: white;
        transform: all .2s;
        box-shadow: 3px 3px 5px black;
        margin-top: 2%;
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

function Guest({ inviteCode }) {

   const [info, setInfo] = useState({
      termStatus: false,
      foodItems: '',
   })
   const [foodList, setFoodList] = useState([])
   const [errors, setErrors] = useState("")

   useEffect(() => {
      axiosWithAuth()
         .get('/api/guest/food')
         .then(res => {
            setFoodList(res.data)
         })
   },[])

   const handleChange = (e) => {
      setErrors("")
      // Check if the current targeting input is checkbox or not
      let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

      setInfo({...info, [e.target.name]: value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      e.persist()

      axiosWithAuth()
         .put('/api/guest', info)
         .then(res => {
            console.log(res)
            setErrors("")
         })
         .catch(err => {
            setErrors("You must confirm attendance and select a food")
         })
   }

   return (
      <StyledGuest className='guest'>
        <div className="guest-select-box">
        <h1>Welcome Suzanne</h1>
          <form onSubmit={handleSubmit}>
            {/* RSVP STATUS */}
            <div className="input-container">
              <label htmlFor='termStatus'>
                I will be attending the event 
                <input id='termStatus' type='checkbox' name='termStatus' checked={info.termStatus} onChange={handleChange} />
              </label>
            </div>
            {/* DROP DOWN FOOD ITEMS */}
            <div className="input-container">
              <label htmlFor='foodItems'>
                I will be bringing 
                <select id='foodItems' name='foodItems' onChange={handleChange} value={info.foodItems}>
                  <option value=''>-- Select Food Item --</option>
                  {
                    foodList.map((eachFood) => {
                      return (
                        <option key={eachFood.id} value={eachFood.name}>{eachFood.name}</option>
                      )
                    })
                  }
                </select>
              </label>
            </div>
                <div className="login-error">{errors}</div>
            <div className="input-container">
              <button>Confirm</button>
            </div>
          </form>
        </div>
      </StyledGuest>
   )
}

export default Guest
