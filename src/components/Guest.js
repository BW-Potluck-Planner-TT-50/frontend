import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function Guest({ inviteCode }) {

   const [info, setInfo] = useState({
      termStatus: false,
      foodItems: '',
   })

   console.log(info.termStatus, info.foodItems)

   const [foodList, setFoodList] = useState([])

   useEffect(() => {
      axiosWithAuth()
         .get('/api/guest/food')
         .then(res => {
            console.log(res.data)
            setFoodList(res.data)
         })
   },[])

   const handleChange = (e) => {
      
      // Check if the current targeting input is checkbox or not
      let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

      setInfo({...info, [e.target.name]: value })

   }

   const handleSubmit = (e) => {
      
      e.preventDefault()

      axiosWithAuth()
         .put('/api/guest', info)
         .then(res => {
            console.log(res)
         })
   }

   return (
      <div className='guest'>
         <h1>Welcome Suzanne</h1>
         <form onSubmit={handleSubmit}>
            {/* RSVP STATUS */}
            <label htmlFor='termStatus'>
               RSVP
               <input
                  id='termStatus' 
                  type='checkbox' 
                  name='termStatus' 
                  checked={info.termStatus}
                  onChange={handleChange}
               />
            </label>

            {/* DROP DOWN FOOD ITEMS */}
            <label htmlFor='foodItems'>
               Choose food item to bring
               <select 
                  id='foodItems' 
                  name='foodItems' 
                  onChange={handleChange} 
                  value={info.foodItems}
               >
                  <option value=''>---------select---------</option>
                  {
                     foodList.map((eachFood) => {
                        return (
                           <option key={eachFood.id} value={eachFood.name}>{eachFood.name}</option>
                        )
                     })
                  }
               </select>
            </label>
            <button>Confirm</button>
         </form>
      </div>
   )
}

export default Guest
