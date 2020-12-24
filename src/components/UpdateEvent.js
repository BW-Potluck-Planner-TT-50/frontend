/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"

// action
import { useDispatch } from "react-redux"
import { updateEvent } from "../store/action/eventAction"

// redux hook
import axiosWithAuth from "../utils/axiosWithAuth"

const StyledUpdateEvent = styled.div`
  background-color: #202C59;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    background-color: #581F18;
    box-shadow: 3px 3px 3px black;
    padding: .5% 3%;
    color: white;
    min-width: 35%;
    text-align: center;
    text-shadow: 1px 1px 1px black;
    h1 {
      margin-top: 1%;
    }
    label {
      margin: 3% 3% 0% 3%;
      text-align: center;
      font-size: 1.5rem;
      @media(max-width: 500px) {
        margin: 2%;
        font-size: 1rem;
      }
    }
    input {
      margin: 0% 3% 3% 3%;
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

export default function UpdateEvent() {
  const dispatch = useDispatch()
  const params = useParams()
  const history = useHistory()
  const [events, setEvents] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  })

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/events/${params.id}`)
      .then((res) => {
        setEvents(res.data)
      })
  }, [params.id])

  const handleChange = (e) => {
    setEvents({
      ...events,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateEvent(params.id, events))

    history.push("/events")
  }

  return (
    <StyledUpdateEvent className="update___events">
      <form onSubmit={handleSubmit}>
        <h1>Update Events</h1>
        <div>
          <label htmlFor="name">Event Name</label>
        </div>
        <div>
          <input name="name" value={events.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
        </div>
        <div>
          <input name="date" value={moment(events.date).format("dddd, MMMM Do YYYY")} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="time">Time</label>
        </div>
        <div>
          <input name="time" value={events.time} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="location">Location</label>
        </div>
        <div>
          <input name="location" value={events.location} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </StyledUpdateEvent>
  )
}
