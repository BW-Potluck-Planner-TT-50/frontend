import React, { useState, useEffect } from 'react';

//Components
import Header from './components/Header'
import Register from './components/Register'
import EventGuest from './components/EventGuest'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent'
import Event from './components/Event'

//Utils

import Login from './components/Login'

import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import axios from 'axios'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
  const [eventList, setEventList] = useState([]);

  console.log(loggedIn)

  // useEffect(() => {
  //   axios
  //     .get('http://https://bw-potluck-planner-tt50.herokuapp.com/api/events')
  //     .then(res => setEventList(res.data))
  //     .catch(err => console.log(err.response));
  // },[])


  const deleteFromEventList = (events) => {
    setEventList(eventList.filter((eachEvent) => {
      return eachEvent.id !== events.id
    }))
  }

  const addToEventList = (events) => {
    setEventList(events)
  }

  return (
    <div className="App">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />

      <Switch>

        <Route exact path="/">
          <div>Homepage Component Goes Here</div>
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path='/join-event'>
          <EventGuest />
        </Route>

        <Route exact path="/login"> {/* setLoggedIn should passed in here */}
          <Login setLoggedIn={setLoggedIn}/>
        </Route>

        <PrivateRoute exact path='/events'> {/* change this to privateRoute */}
          <Event deleteFromEventList={deleteFromEventList}/>
        </PrivateRoute>

        <Route exact path='/update-event/:id'>
          <UpdateEvent eventList={eventList} setEventList={setEventList} />
        </Route>

        <Route exact path='/add-events'>
          <AddEvent addToEventList={addToEventList}/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
