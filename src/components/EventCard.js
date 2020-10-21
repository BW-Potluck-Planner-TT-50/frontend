import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const StyledEventCard = styled.div`

`

const EventCard = () => {

   const params = useParams()
   const [potEvent, setPotEvent] = useState('')

   const [food, setFood] = useState({
      event_id: params.id,
      name: '',
   })
   const [foodList, setFoodList] = useState([])

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

   },[params.id])

   const deleteFood = (id) => {

      axiosWithAuth()
         .delete(`/api/events/food/${id}`)
         .then(res => {
            console.log(res)
         })
      setFoodList(foodList.filter((eachFood) => eachFood.id !== id))
   }

   const addFood = (food) => {
      setFoodList([...foodList, food])
   }

   const handleChange = (e) => {
      setFood({
         ...food,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = (e) => {

      e.preventDefault()
      // add food to the list of food
      axiosWithAuth()
         .post(`/api/events/${params.id}/food`, food)
         .then(res => {
            console.log(res)
         })
      
      // reset food state
      setFood({
         ...food,
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
         <form onSubmit={handleSubmit}>
            <label htmlFor='food'>
               <input name='name' onChange={handleChange} value={food.name}/>
               <button onClick={() => addFood(food)}>Add Food</button>
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
