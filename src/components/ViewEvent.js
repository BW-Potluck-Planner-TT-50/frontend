import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function ViewEvent() {

   const params = useParams()

   useEffect(() => {
      axiosWithAuth()
         .get(`/api/events/${params.id}`)
         .then(res => {
            setEvents(res.data)
         })
   },[params.id])

   return (
      <div className='view___event'>
         <h2></h2>
         <p></p>
         <p></p>
         <p></p>
      </div>
   )
}

export default ViewEvent
