import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const EventCard = () => {

   const params = useParams()
   const [potEvent, setPotEvent] = useState('')

   useEffect(() => {
      axiosWithAuth()
         .get(`/api/events/${params.id}`)
         .then(res => {
            setPotEvent(res.data)
         })
   },[params.id])


   return (
      <div className='event___card'>
         <h2>{potEvent.name}</h2>
         <p>Date: {potEvent.date}</p>
         <p>Time: {potEvent.time}</p>
         <p>Location: {potEvent.location}</p>
      </div>
   )
}

export default EventCard
