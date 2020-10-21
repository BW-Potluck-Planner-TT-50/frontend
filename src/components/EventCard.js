import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const StyledEventCard = styled.div`

`

const EventCard = () => {

   const params = useParams()
   console.log(params)

   // Initial State
   const [potEvent, setPotEvent] = useState('')

   const [food, setFood] = useState({
      id: '',
      name: '',
   })

   const [guest, setGuest] = useState({
      id: '',
      name: '',
   })

   const [guestList, setGuestList] = useState([])
   const [foodList, setFoodList] = useState([])
   
   console.log('FOOD LIST: \n', foodList, '\nGUEST LIST: \n', guestList)


   // fetch initial food and guest list
   useEffect(() => {

      // get event information
      axiosWithAuth()
         .get(`/api/events/${params.id}`)
         .then(res => {
            setPotEvent(res.data)
         })
      
      // get all food list
      axiosWithAuth()
         .get(`/api/events/${params.id}/food`)
         .then(res => {
            setFoodList(res.data)
         })

      axiosWithAuth()
         .get(`/api/events/${params.id}/guest-list`)
         .then(res => {
            setGuestList(res.data)
         })

   },[params.id])

   // Food CRUD
   const deleteFood = (id) => {

      axiosWithAuth()
         .delete(`/api/events/food/${id}`)
         .then(res => {
            console.log(res)
         })
      setFoodList(foodList.filter((eachFood) => eachFood.id !== id))
   }

   const handleFoodChange = (e) => {
      setFood({
         ...food,
         [e.target.name]: e.target.value
      })
   }

   const handleFoodSubmit = (e, id) => {

      e.preventDefault()
      // add food to the list of food
      axiosWithAuth()
         .post(`/api/events/${params.id}/food`, food)
         .then(res => {
            setFoodList([...foodList, res.data])
         })
      
      // reset food state
      setFood({
         ...food,
         name: '',
      })
   }

   // Guest CRUD

   const deleteGuest = (id) => {
      axiosWithAuth()
         .delete(`/api/events/guest-list/${id}`)
         .then(res => {
            console.log(res)
         })
      setGuestList(guestList.filter((eachGuest) => eachGuest.id !== id))
   }

   const handleGuestChange = (e) => {
      setGuest({
         ...guest,
         [e.target.name]: e.target.value
      })
   }

   const handleGuestSubmit = (e) => {

      e.preventDefault()
      // add food to the list of food
      axiosWithAuth()
         .post(`/api/events/${params.id}/guest-list`, guest)
         .then(res => {
           setGuestList([...guestList, res.data])
         })
      
      // reset food state
      setGuest({
         ...guest,
         name: '',
      })
   }

   return (
     <StyledEventCard>
       <div className='event___card'>
         <h2>{potEvent.name}</h2>
         <p>Date: {potEvent.date}</p>
         <p>Time: {potEvent.time}</p>
         <p>Location: {potEvent.location}</p>
         <p>Invite Code: {potEvent.invite_code}</p>
         <form onSubmit={handleGuestSubmit}>
            <label htmlFor='name'>
               <input name='name' onChange={handleGuestChange} value={guest.name}/>
               <button>Add Guest</button>
            </label>
         </form>
         {
            guestList.map((eachGuest) => {
               return (
                  <div key={eachGuest.name}>
                     <div>{eachGuest.name}</div>
                     <div onClick={() => deleteGuest(eachGuest.id)}>X</div>
                  </div>
               )
            })
         }
         <form onSubmit={handleFoodSubmit}>
            <label htmlFor='name'>
               <input name='name' onChange={handleFoodChange} value={food.name}/>
               <button>Add Food</button>
            </label>
         </form>
         {
            foodList.map((eachFood) => {
               return (
                  <div key={eachFood.name}>
                     <div>{eachFood.name}</div>
                     <div onClick={() => deleteFood(eachFood.id)}>X</div>
                  </div>
               )
            })
         }
      </div>
     </StyledEventCard>
   )
}

export default EventCard
