import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function Guest() {

   const [info, setInfo] = useState({
      rsvp: false,
      // guest_id: '',
      foodId: null,
   })

   const [food, setFood] = useState('')

   const [guestInfo, setGuestInfo] = useState('')
   const [foodList, setFoodList] = useState([])

   console.log(foodList)

   console.log(foodList)
   useEffect(() => {

      axiosWithAuth()
         .get('/api/guest')
         .then(res => {
            setGuestInfo(res.data[0])
            localStorage.setItem('id',res.data[0].id)
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

      // Not working
      axiosWithAuth()
         .get('/api/guest/events', { eventId: '' })
         .then(res => {
            console.log(res.data)
         })
         .catch(err => {
            console.log(err)
         })

   },[])

   const handleSubmit = (e) => {
      
      e.preventDefault()

      // const guestId = parseInt(localStorage.getItem('id'))

      const food = { rsvp: info.rsvp, foodId: info.foodId }
  
      // Not working
      axiosWithAuth()
         .put('/api/guest', food)
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
         })
   }
// fe73Z2UNc
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
      <div className='guest'>
         <h1>Welcome {guestInfo.name}</h1>
         <form onSubmit={handleSubmit}>
            {/* RSVP STATUS */}
            <label htmlFor='rsvp'>
               RSVP
               <input
                  id='rsvp' 
                  type='checkbox' 
                  name='rsvp' 
                  checked={info.rsvp}
                  onChange={handleChange}
               />
            </label>

            {/* DROP DOWN FOOD ITEMS */}
            <label htmlFor='foodId'>
               Choose food item to bring
               <select 
                  id='foodId' 
                  name='foodId' 
                  onChange={handleChange}
               >
                  <option value=''>---------select---------</option>
                  {
                     foodList.map((eachFood) => {
                        if(eachFood.guest_id === null){
                           return (
                              <option key={eachFood.id} id={eachFood.id} value={eachFood.id}>{eachFood.name}</option>
                           )
                        }
                     })
                  }
               </select>
            </label>
            <button type='submit'>Confirm</button>
         </form>
      </div>
   )
}

export default Guest
