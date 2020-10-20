import React from 'react'
import { Link } from "react-router-dom";
import EventCard from './EventCard'

function EventList({ eventList }) {
   return (
      <div className='event___list'>
         {
            eventList.map((eachEvent) => (
               <Link key={eachEvent.id} to={`events/${eachEvent.id}`}>
                  <EventCard eachEvent={eachEvent} />
               </Link>
            ))
         }
      </div>
   )
}

export default EventList
