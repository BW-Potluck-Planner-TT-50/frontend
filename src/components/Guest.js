import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

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

function Guest({ setLoggedIn }) {

   const history = useHistory()

   const [info, setInfo] = useState({
      rsvp: false,
      // guest_id: '',
      foodId: '',
   })

   const [guestInfo, setGuestInfo] = useState('')
   const [foodList, setFoodList] = useState([])
   const [errors, setErrors] = useState("")

   // const eventInfo = { eventId: parseInt(guestInfo.event_id) }
   console.log(guestInfo)

   useEffect(() => {

      axiosWithAuth()
         .get('/api/guest')
         .then(res => {
            setGuestInfo(res.data[0])
         })
         .catch(err => {
            console.log(err)
         })

      axiosWithAuth()
         .get('/api/guest/food')
         .then(res => {
            setFoodList(res.data)
         })
         .catch(err => {
            console.log(err)
         })

      // axiosWithAuth()
      //    .get('/api/guest/events', eventInfo)
      //    .then(res => {
      //       console.log(res.data)
      //    })
      //    .catch(err => {
      //       console.log(err)
      //    })

   },[info])

   const handleSubmit = (e) => {
      e.preventDefault()
      e.persist()

      // const guestId = parseInt(localStorage.getItem('id'))

      const food = { rsvp: info.rsvp, foodId: info.foodId }
  
      axiosWithAuth()
         .put('/api/guest', food)
         .then(res => {
            console.log(res)
            setErrors("")
            setLoggedIn(false)
            localStorage.removeItem('token')
            history.push('/success')
         })
         .catch(err => {
            setErrors("You must confirm attendance and select a food")
         })
         .catch(err => {
            console.log(err)
         })
   }

   const confirmation = (e) => {
      const result = window.confirm('You will not be able to make any changes after the confirmation. \nAre you sure to confirm?')
      e.persist()
      if(result){
         handleSubmit(e)
      }
   }
   const handleFoodChange = e => {
      setInfo({ ...info, [e.target.name]: parseInt(e.target.value) })
   }
 

   const handleChange = (e) => {
      e.persist()

      if(e.target.name === 'foodId'){

         handleFoodChange(e)

      } else {

         // Check if the current targeting input is checkbox or not
         let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
   
         // const selectedFood = foodList.find((eachFood) => value === eachFood.name)
         
         setInfo({...info, [e.target.name]: value })
         // selectedFood ? setInfo({...info, [e.target.name]: selectedFood.id}) :
      }
      
      
   }

   return (
      <StyledGuest className='guest'>
        <div className="guest-select-box">
        <h1>Welcome {guestInfo.name}</h1>
          <form onSubmit={confirmation}>
            {/* RSVP STATUS */}
            <div className="input-container">
              <label htmlFor='rsvp'>
                I will be attending the event 
                <input id='rsvp' type='checkbox' name='rsvp' checked={info.rsvp} onChange={handleChange} />
              </label>
            </div>
            {/* DROP DOWN FOOD ITEMS */}
            <div className="input-container">
              <label htmlFor='foodId'>
                I will be bringing 
                <select id='foodId' name='foodId' onChange={handleChange} value={info.foodId}>
                  <option value=''>-- Select Food Item --</option>
                  {
                     foodList.map((eachFood) => {
                        if(eachFood.guest_id === null){
                           return (
                              <option key={eachFood.id} id={eachFood.id} value={eachFood.id}>{eachFood.name}</option>
                           )
                        }
                        return null
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
