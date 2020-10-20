import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function UpdateEvent({eventList, setEventList}){
   const params = useParams()
   const history = useHistory()

   const [events, setEvents] = useState({
      eventName: '',
      date:'',
      time: '',
      location: '',
   })

   useEffect(() => {
      axios
         .get(`https://bw-potluck-planner-tt50.herokuapp.com/api/events/${params.id}`)
         .then(res => {
            setEvents(res.data)
         })
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
         .put(`https://bw-potluck-planner-tt50.herokuapp.com/api/events/${params.id}`, events)
         .then(res => {
            const newEventList = eventList.map(eachEvent => {
               if(eachEvent.id === events.id){
                  return res.data
               } else {
                  return eachEvent
               }
            })
            setEventList(newEventList)
            history.push('/events-list')
         })
   }

   return (
      <div className='update___events'>
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