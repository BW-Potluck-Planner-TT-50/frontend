import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const StyledUpdateEvent = styled.div`

`

export default function UpdateEvent({eventList, setEventList}){
   const params = useParams()
   const history = useHistory()
   const [events, setEvents] = useState({
      name: '',
      date:'',
      time: '',
      location: '',
   })

   useEffect(() => {
      axiosWithAuth()
         .get(`/api/events/${params.id}`)
         .then(res => {
            setEvents(res.data)
         })
   },[params.id])

   const handleChange = (e) => {
      setEvents({
         ...events,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      axiosWithAuth()
         .put(`/api/events/${params.id}`, events)
         .then(res => {
            const newEventList = eventList.map(eachEvent => {
               if(eachEvent.id === events.id){
                  return res.data
               } else {
                  return eachEvent
               }
            })
            setEventList(newEventList)
            history.push('/events')
         })
   }

   return (
      <StyledUpdateEvent className='update___events'>
         <h2>Update Events</h2>
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
            <button type='submit'>Update</button>
         </form>
      </StyledUpdateEvent>
   )
}