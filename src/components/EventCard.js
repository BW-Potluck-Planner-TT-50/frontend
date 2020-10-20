import React from 'react'

const EventCard = ({ potEvent }) => {

   return (
      <div className='event___card'>
         <h2>{potEvent.eventName}</h2>
         <h3>Date: {potEvent.date}</h3>
         <h3>Time: {potEvent.time}</h3>
         <h3>Location: {potEvent.location}</h3>
         <h3>Confirmed Foods</h3>
         {
            potEvent.foodList.map(eachFood => (
               <div key={eachFood} className='pot___food'>{eachFood}</div>
            ))
         }
      </div>
   )
}

export default EventCard
