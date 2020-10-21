import React, { useEffect, useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory, useParams, NavLink, Link } from "react-router-dom";


function Event({ deleteFromEventList, eventList }) {

   const params = useParams()
   const history = useHistory()

   const deleteEvent = (id) => {

      axiosWithAuth()
        .delete(`/api/events/${id}`)
        .then(res => {
          console.log(res.data)
        })
 
      deleteFromEventList(id)

  }

   return (
      <div className="save-wrapper">

         {
            eventList.map((eachEvent) => (
               <div key={eachEvent.id} className='each___events'>
                  <h2>{eachEvent.name}</h2>
                  <Link to={`/view-events/${eachEvent.id}`}>View</Link>
                  <NavLink className='edit-button' to={`/update-event/${eachEvent.id}`}>Edit</NavLink>
                  <div className='delete-button' onClick={()=> deleteEvent(eachEvent.id)}>
                     Delete
                  </div> 
               </div>
            ))
         }

      </div>
   )
}

export default Event
