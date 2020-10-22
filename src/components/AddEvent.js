import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function AddEvent(rest) {

   console.log('REST: \n', rest)

   const history = useHistory()

   const [events, setEvents] = useState({
      name: '',
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

      axiosWithAuth()
         .post('/api/events', events)
         .then(res => {
            console.log(res)
            rest.addToEventList(res.data)
            setEvents({
               name: '',
               date:'',
               time: '',
               location: '',
            })
            history.push('/events')
         })
   }

   return (
      <div className='add___events'>
      <form onSubmit={handleSubmit}>
         <label htmlFor='name'>
            <p>Event Name</p>
            <input name='name' value={events.name} onChange={handleChange} />
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
         <button type='submit'>Add</button>
      </form>
   </div>
   )
}

export default AddEvent
