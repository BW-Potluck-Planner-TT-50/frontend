import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'
import moment from 'moment'
// import sendmail from 'sendmail'

const StyledEventCard = styled.div`
  background-color: #202C59;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  .event-box {
    background-color: #581F18;
    box-shadow: 3px 3px 5px black;
    margin-bottom: 2%;
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 1%;
    height: 70%;
    @media(max-width: 500px) {
      height: unset;
      flex-direction: column;
    }
    .RSVP-guest {
      padding: 2%;
      display: flex;
      flex-direction: column;
      width: 20%;
      @media(max-width: 500px) {
        align-items: center;
        width: 95%;
      }
      h3 {
        text-align: center;
        text-decoration: underline;
      }
      .rsvp-stuff {
        background-color: #F18805;
        box-shadow: inset 3px 3px 5px black;
        overflow-y: auto;
        height: 80%;
        @media(max-width: 500px) {
          height: 200px;
          width: 100%;
        }
        p {
          padding: 4%;
          box-shadow: inset 3px 3px 5px black;
          margin: 0px;
        }
        &::-webkit-scrollbar {
          width: 1em;
        }
        
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        &::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }
      }
    }
    strong {
      text-decoration: underline;
    }
    .event-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 2%;
      width: 40%;
      @media(max-width: 500px) {
        align-items: center;
        width: 95%;
      }
    }
    .food-box {
      padding: 2%;
      display: flex;
      flex-direction: column;
      width: 20%;
      @media(max-width: 500px) {
        align-items: center;
        width: 95%;
      }
      h3 {
        text-align: center;
        text-decoration: underline;
      }
      form {
        text-align: center;
        margin: 4%;
        input {
          font-size: 1.5rem;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4%;
          width: 95%;
        }
        button {
          font-size: 1.5rem;
          padding: 4% 7%;
          box-shadow: 1px 1px 3px black;
          cursor: pointer;
          background-color: #F18805;
          border: unset;
          color: white;
          transition: all .2s;
          &:hover {
            box-shadow: 3px 3px 5px black;
            background-color: #202C59;
          }
        }
      }
      .delete-button {
        cursor: pointer;
      }
      .food {
        background-color: #F0A202;
        box-shadow: inset 3px 3px 5px black;
        overflow-y: auto;
        height: 80%;
        @media(max-width: 500px) {
          height: 200px;
          width: 100%;
        }
        &::-webkit-scrollbar {
          width: 1em;
        }
        
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        &::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }
        .dynamic-info {
          padding: 4%;
          box-shadow: inset 3px 3px 5px black;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .guest-box {
      padding: 2%;
      display: flex;
      flex-direction: column;
      width: 20%;
      @media(max-width: 500px) {
        align-items: center;
        width: 95%;
      }
      h3 {
        text-align: center;
        text-decoration: underline;
      }
      form {
        text-align: center;
        margin: 4%;
        input {
          font-size: 1.5rem;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          width: 95%;
          margin-bottom: 4%;
        }
        button {
          font-size: 1.5rem;
          padding: 4% 7%;
          box-shadow: 1px 1px 3px black;
          cursor: pointer;
          background-color: #F18805;
          border: unset;
          color: white;
          transition: all .2s;
          &:hover {
            box-shadow: 3px 3px 5px black;
            background-color: #202C59;
          }
        }
      }
      .delete-button {
        cursor: pointer;
      }
      .guests {
        background-color: #D95D39;
        box-shadow: inset 3px 3px 5px black;
        overflow-y: auto;
        height: 80%;
        @media(max-width: 500px) {
          height: 200px;
          width: 100%;
        }
        &::-webkit-scrollbar {
          width: 1em;
        }
        
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        &::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }
        .dynamic-info {
          padding: 4%;
          box-shadow: inset 3px 3px 5px black;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
`

const EventCard = () => {

   const params = useParams()

   // Initial State
   const [potEvent, setPotEvent] = useState('')

   const [food, setFood] = useState({
      id: '',
      name: '',
   })

   const [guest, setGuest] = useState({
      id: '',
      name: '',
   })

   const [guestList, setGuestList] = useState([])
   const [foodList, setFoodList] = useState([])

   const rsvp_guest = guestList.map((eachGuest) => {

      if(eachGuest.rsvp === true){

        for(let i = 0; i < foodList.length; i++){
          if(foodList[i].guest_id === eachGuest.id){
            return {id: eachGuest.id, name: eachGuest.name, food: foodList[i].name}
          }
        }
      }
      return ''
    })

   // fetch initial food and guest list
   useEffect(() => {

      // get event information
      axiosWithAuth()
         .get(`/api/events/${params.id}`)
         .then(res => {
            setPotEvent(res.data)
         })
      
      // get all food list
      axiosWithAuth()
         .get(`/api/events/${params.id}/food`)
         .then(res => {
            setFoodList(res.data)
          
         })

      axiosWithAuth()
         .get(`/api/events/${params.id}/guest-list`)
         .then(res => {
            setGuestList(res.data)
           
         })

   },[params.id])

   // Food CRUD
   const deleteFood = (id) => {

      axiosWithAuth()
         .delete(`/api/events/food/${id}`)
         .then(res => {
            console.log(res)
         })
        setFoodList(foodList.filter((eachFood) => eachFood.id !== id))
   }

   const handleFoodChange = (e) => {
      setFood({
         ...food,
         [e.target.name]: e.target.value
      })
   }

   const foodConfirmation = (id) => {
     const result = window.confirm('Are you sure to delete?')
     if(result){
       deleteFood(id)
     }
   }

   const handleFoodSubmit = (e) => {

      e.preventDefault()
      // add food to the list of food
      axiosWithAuth()
         .post(`/api/events/${params.id}/food`, food)
         .then(res => {
            setFoodList([...foodList, res.data])
         })
      
      // reset food state
      setFood({
         ...food,
         name: '',
      })
   }

   // Guest CRUD
  const deleteGuest = (id) => {

      axiosWithAuth()
        .delete(`/api/events/guest-list/${id}`)
        .then(res => {
          console.log(res)
        })
        setGuestList(guestList.filter((eachGuest) => eachGuest.id !== id))
   }

  const handleGuestChange = (e) => {
      setGuest({
         ...guest,
         [e.target.name]: e.target.value
      })
   }

  const guestConfirmation = (id) => {
    const result = window.confirm('Are you sure to delete?') 
    if(result){
      deleteGuest(id)
    }
  }

   const handleGuestSubmit = (e) => {

      e.preventDefault()
    
      axiosWithAuth()
         .post(`/api/events/${params.id}/guest-list`, guest)
         .then(res => {
           setGuestList([...guestList, res.data])
         })
      
      setGuest({
         ...guest,
         name: '',
      })
   }

  return (
    <StyledEventCard>
      <div className='event___card event-box'>
        <div className="event-info">
          <h2>{potEvent.name}</h2>
          <h3><strong>Date:</strong>  {moment(potEvent.date).format("dddd, MMMM Do YYYY")}</h3>
          <h3><strong>Time:</strong>  {potEvent.time}</h3>
          <h3><strong>Location:</strong>  {potEvent.location}</h3>
          <h3><strong>Invite Code:</strong>  {potEvent.invite_code}</h3>
        </div>
        <div className="guest-box">
          <h3>Guest List</h3>
          <div className="guests">
            {
              guestList.map((eachGuest) => {
                if(eachGuest.rsvp === true){
                  return (
                    <div className="dynamic-info" key={eachGuest.name}>
                      <div>{eachGuest.name}</div>
                      <div>confirmed</div>
                      
                    </div>
                  )
                }
                return (
                    <div className="dynamic-info" key={eachGuest.name}>
                      <div>{eachGuest.name}</div>
                      <div className="delete-button" onClick={() => guestConfirmation(eachGuest.id)}>X</div>
                    </div>
                )
              })
            }
          </div>
          <form onSubmit={handleGuestSubmit}>
            <input autoComplete="off" placeholder="name" name='name' onChange={handleGuestChange} value={guest.name}/>
            <button>Add Name</button>
            {/* <button onClick={() => sendmail({
                      from: 'ghghgngngkgk@gmail.com',
                      to: 'sunkist5691@gmail.com',
                      subject: 'test sendmail',
                      html: 'Mail of test sendmail ',})}>
                Send
            </button> */}
          </form>
        </div>
        <div className="food-box">
          <h3>Food</h3>
          <div className="food">
            {
              foodList.map((eachFood) => {
                if(eachFood.guest_id !== null){
                  return (
                    <div className="dynamic-info" key={eachFood.name}>
                      <div>{eachFood.name}</div>
                      <div>confirmed</div>
                    </div>
                  )
                }
                return (
                  <div className="dynamic-info" key={eachFood.name}>
                    <div>{eachFood.name}</div>
                    <div className="delete-button" onClick={() => foodConfirmation(eachFood.id)}>X</div>
                  </div>
                )
              })
            }
          </div>
          <form onSubmit={handleFoodSubmit}>
            <input autoComplete="off" placeholder="food" name='name' onChange={handleFoodChange} value={food.name}/>
            <button>Add Food</button>
          </form>
        </div>
        <div className='RSVP-guest'>
          <h3>Attendance List</h3>
          <div className="rsvp-stuff">
            {
              rsvp_guest.map((eachGuest) => {
                if(eachGuest){
                  return (<p key={eachGuest.id}>{`${eachGuest.name} / ${eachGuest.food}`}</p>)
                }
                return''
              })
            }
          </div>
          <h3>↑ RSVP List ↑</h3>
        </div>
      </div>
    </StyledEventCard>
  )
}

export default EventCard
