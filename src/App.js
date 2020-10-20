import React, { useState, useEffect } from 'react';

//Components
import Header from './components/Header'
import Register from './components/Register'

import EventList from './components/EventList'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent'
import Event from './components/Event'

//Utils

import Login from './components/Login'

import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import axios from 'axios'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios
      .get('http://https://bw-potluck-planner-tt50.herokuapp.com/api/events')
      .then(res => {
        console.log(res.data)
        setEventList(res.data)
      })
      .catch(err => console.log(err.response));
  },[])


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
      <Header loggedIn={loggedIn} />

      <Switch>

        <Route exact path="/">
          <div>Homepage Component Goes Here</div>
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login"> {/* setLoggedIn should passed in here */}
          <div><Login /></div>
        </Route>

        <Route exact path='/events'> {/* change this to privateRoute */}
          <Event deleteFromEventList={deleteFromEventList}/>
        </Route>

        <Route path='/update-event/:id'>
          <UpdateEvent eventList={eventList} setEventList={setEventList} />
        </Route>

        <Route path='/add-events'>
          <AddEvent addToEventList={addToEventList}/>
        </Route>

        <Route exact path='/events-list'>
          <EventList eventList={eventList}/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
