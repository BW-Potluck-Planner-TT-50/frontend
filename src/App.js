import React, { useState, useEffect } from 'react';

//Components
import Header from './components/Header'
import Register from './components/Register'
import EventGuest from './components/EventGuest'
import EventCard from './components/EventCard'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent'
import Event from './components/Event'
import Login from './components/Login'
import Guest from './components/Guest'
import HomePage from './components/HomePage'

//Utils
import PrivateRoute from './utils/PrivateRoute'
import { Route, Switch } from 'react-router-dom'
import { axiosWithAuth } from './utils/axiosWithAuth'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
  const [isOrganizer, setIsOrganizer] = useState(JSON.parse(localStorage.getItem('organizer')))
  const [eventList, setEventList] = useState([]);
  

  useEffect(() => {
    axiosWithAuth()
      .get('/api/events')
      .then(res => {
        setEventList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[loggedIn])


  const deleteFromEventList = (id) => {
    axiosWithAuth()
        .get(`/api/events/`)
        .then(res => {
           console.log(res)
           setEventList(eventList.filter( eachEvent => {
             return eachEvent.id !== id
           }))
        })
  }

  const addToEventList = (events) => {
    setEventList([...eventList, events])
  }

  return (
    <div className="App">
      <Header 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn}
        isOrganizer={isOrganizer}
      />

      <Switch>

        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path='/join-event'>
          <EventGuest setIsOrganizer={setIsOrganizer} setLoggedIn={setLoggedIn}/>
        </Route>

        <Route exact path='/plan'>
          <Guest />
        </Route>

        <Route exact path="/login">
          <Login setLoggedIn={setLoggedIn} setIsOrganizer={setIsOrganizer}/>
        </Route>

        <Route exact path='/events'>
          <Event eventList={eventList} deleteFromEventList={deleteFromEventList}/>
        </Route>

        <Route exact path='/update-event/:id'>
          <UpdateEvent eventList={eventList} setEventList={setEventList} />
        </Route>

        <PrivateRoute exact path='/add-events' component={AddEvent} addToEventList={addToEventList}/>

        <Route exact path='/view-events/:id'>
          <EventCard />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
