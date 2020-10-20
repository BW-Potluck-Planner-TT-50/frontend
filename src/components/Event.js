import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, NavLink, Link } from "react-router-dom";
import EventCard from './EventCard'


function Event({ deleteFromEventList, eventList }) {

   const [potEvent, setPotEvent] = useState(null)
   const params = useParams()
   const history = useHistory()

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

   return (
      <div className="save-wrapper">
         {
            eventList.map((eachEvent) => (
            <>
               <h2>{eachEvent.name}</h2>
               <Link key={eachEvent.id} to={`events/${eachEvent.id}`}>
                  View
               </Link>
               <NavLink className='edit-button' to={`/update-event/${params.id}`}>Edit</NavLink>
               <div className='delete-button' onClick={()=> deleteEvent(params.id)}>
                  Delete
               </div> 
            </>
            ))
         }
      </div>
   )
}

export default Event
