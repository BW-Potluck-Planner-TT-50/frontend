import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function AddEvent({ addToEventList }) {

   const history = useHistory()

   const [events, setEvents] = useState({
      eventName: '',
      date:'',
      time: '',
      location: '',
   })

   const handleChange = (e) => {

      setEvents({
         ...events,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      axios
         .post(`https://bw-potluck-planner-tt50.herokuapp.com/api/events`, events)
         .then(res => {
            addToEventList(res.data)
            setEvents({
               eventName: '',
               date:'',
               time: '',
               location: '',
            })
            history.push('/events-list')
         })
   }

   return (
      <div className='add___events'>
      <form onSubmit={handleSubmit}>
         <label htmlFor='eventName'>
            <p>Event Name</p>
            <input name='eventName' value={events.eventName} onChange={handleChange} />
         </label>
         <label htmlFor='date'>
            <p>Date</p>
            <input name='date' value={events.date} onChange={handleChange} />
         </label>
         <label htmlFor='time'>
            <p>Time</p>
            <input name='time' value={events.time} onChange={handleChange} />
         </label>
         <label htmlFor='location'>
            <p>Location</p>
            <input name='location' value={events.location} onChange={handleChange} />
         </label>
         <label htmlFor='foodList'>
            <p>Confirmed Foods</p>
            <input name='foodList' value={events.foodList} onChange={handleChange} />
         </label>
         <button type='submit'>Add</button>
      </form>
   </div>
   )
}

export default AddEvent
