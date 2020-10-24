import React from "react";
import { Link } from "react-router-dom"
import moment from 'moment'
import styled from 'styled-components'

// action
import { deleteEvent } from '../store/action/eventAction'

// redux hook
import { useDispatch } from 'react-redux'

const StyledEvents = styled.div`
  background-color: #202C59;
  box-sizing: border-box;
  padding: 5%;
  min-height: 80vh;
  .no-events {
    background-color: #581F18;
    box-shadow: 3px 3px 5px black;
    margin-bottom: 2%;
    text-align: center;
    color: white;
    padding: 3%;
    h2 {
      margin-bottom: 2%;
    }
    div {
      padding: 3%;
      a {
        background-color: #F0A202;
        padding: 3% 5%;
        box-shadow: 3px 3px 5px black;
        color: white;
        text-shadow: 1px 1px 3px black;
        text-decoration: none;
        font-size: 1.5rem;
      }
    }
  }
  .event-box {
    background-color: #581F18;
    box-shadow: 3px 3px 5px black;
    margin-bottom: 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 1%;
    @media(max-width: 500px) {
      flex-direction: column;
      padding-bottom: 7%;
    }
    .name-container {
      width: 100%;
      text-align: center;
      h2 {
        margin-top: 0px;
      }
    }
    a {
      color: white;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      width: 70%;
      height: 100px;
      font-size: 2rem;
      text-shadow: 1px 1px 3px black;
      @media(max-width: 500px) {
        font-size: 1.5rem;
        height: 50px;
      }
      &:hover {
        text-shadow: 3px 3px 5px black;
      }
    }
    .view-button {
      background-color: #D95D39;
      box-shadow: inset 3px 3px 5px black;
    }
    .edit-button {
      background-color: #F0A202;
      box-shadow: inset 3px 3px 5px black;
    }
    .delete-button {
      background-color: #F18805;
      box-shadow: inset 3px 3px 5px black;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      width: 70%;
      height: 100px;
      text-decoration: underline;
      font-size: 2rem;
      cursor: pointer;
      text-shadow: 1px 1px 3px black;
      @media(max-width: 500px) {
        font-size: 1.5rem;
        height: 50px;
      }
      &:hover {
        text-shadow: 3px 3px 5px black;
      }
    }
  }
`

function Event({ eventList }) { 

  const dispatch = useDispatch()

  const eventConfirmation = (id) => {
    const result = window.confirm('Are you sure to delete ?')
    if(result){
      dispatch(deleteEvent(id))
    }
  }
   return (
      <StyledEvents className="save-wrapper">
        {
          eventList.length !== 0 ?
          eventList.map((eachEvent) => (
            <div key={eachEvent.id} className='each___events event-box'>
              <div className="name-container">
                <h2>{eachEvent.name}</h2>
                <p>{moment(eachEvent.date).format("dddd, MMMM Do YYYY")}</p>
              </div>
              <Link className="view-button" to={`/view-events/${eachEvent.id}`}>View</Link>
              <Link className="edit-button" to={`/update-event/${eachEvent.id}`}>Edit</Link>
              <div className="delete-button" onClick={()=> eventConfirmation(eachEvent.id)}>Delete</div>
            </div>
          )) : 
          <div className="no-events">
            <h1>You Haven't Created Any Events Yet</h1>
            <h2>To Get Started Just Click The Event Below</h2>
            <div>
              <Link to="/add-events">Add Events</Link>
            </div>

          </div>
        }
      </StyledEvents>
   )
}

export default Event
