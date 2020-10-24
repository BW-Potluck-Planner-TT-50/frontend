import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const StyledAddEvent = styled.div`
  background-color: #202C59;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    background-color: #581F18;
    box-shadow: 3px 3px 3px black;
    padding: 1% 3%;
    color: white;
    min-width: 35%;
    text-align: center;
    text-shadow: 1px 1px 1px black;
    input {
      margin: 3%;
      padding: 2%;
      text-align: center;
      font-size: 1.5rem;
      @media(max-width: 500px) {
        margin: 2%;
        padding: .5%;
        font-size: 1rem;
      }
    }
    button {
      padding: 2% 5%;
      font-size: 2rem;
      background-color: #F0A202;
      color: white;
      margin-bottom: 4%;
      box-shadow: 1px 1px 3px black;
      transition: all .2s;
      cursor: pointer;
      @media(max-width: 500px) {
        padding: .5% 2.5%;
        font-size: 1rem;
        margin-top: 2%;
      }
      &:hover {
        box-shadow: 3px 3px 5px black;
        background-color: #D95D39;
      }
    }
  }
`

function AddEvent(rest) {

   const history = useHistory()
   const [events, setEvents] = useState({
      name: '',
      date:'',
      time: '',
      location: '',
   })

   const handleChange = (e) => {
      setEvents({
         ...events,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      axiosWithAuth()
         .post('/api/events', events)
         .then(res => {
            rest.addToEventList(res.data)
            setEvents({
               name: '',
               date:'',
               time: '',
               location: '',
            })
            history.push('/events')
         })
   }

  return (
    <StyledAddEvent className='add___events'>
      <form onSubmit={handleSubmit}>
        <h1>Add An Event</h1>
        <div>
          <input name='name' placeholder="Event Name" value={events.name} onChange={handleChange} />
        </div>
        <div>
          <input name='date' placeholder="Event Date" value={events.date} onChange={handleChange} />
        </div>
        <div>
          <input name='time' placeholder="Event Time" value={events.time} onChange={handleChange} />
        </div>
        <div>
          <input name='location' placeholder="Event Location" value={events.location} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </StyledAddEvent>
  )
}

export default AddEvent
