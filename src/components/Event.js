import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, NavLink } from "react-router-dom";
import EventCard from './EventCard'


function Event({ deleteFromEventList }) {

   const [potEvent, setPotEvent] = useState(null)
   const params = useParams()
   const history = useHistory()

   useEffect(() => {
      axios
         .get(`https://bw-potluck-planner-tt50.herokuapp.com/api/events/${params.id}`)
         .then(res => {
            setPotEvent(res.data)
            console.log(res.data)
         })
   },[params.id])

   const deleteEvent = (id) => {

      axios
        .delete(`https://bw-potluck-planner-tt50.herokuapp.com/api/events/${id}`)
        .then(res => {
          console.log(res)
          setPotEvent(null)
          deleteFromEventList(potEvent)
          history.push('/events-list')
        })
  
    }


   if(!potEvent){
      return <div>Loading events....</div>
   }
   return (
      <div className="save-wrapper">
         <EventCard potEvent={potEvent} />
         <NavLink className='edit-button' to={`/update-event/${params.id}`}>Edit</NavLink>
         <div className='delete-button' onClick={()=> deleteEvent(params.id)}>
          Delete
        </div>  
      </div>
   )
}

export default Event
