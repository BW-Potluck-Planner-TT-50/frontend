import React, { useEffect } from 'react';

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
import Success from './components/Success'

//Utils
import { Route, Switch } from 'react-router-dom'

// action
import { fetchEvents } from './store/action/eventAction'

// Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  const [
    loggedIn, 
    isOrganizer, 
    eventList
  ] = useSelector( state => 
    [
      state.loggedIn, 
      state.isOrganizer, 
      state.eventList
    ])
  
  console.log('LOGGED_IN STATUS: \n', loggedIn, '\n\nORGANIZER_STATUS: \n', isOrganizer, '\n\nCURRENT EVENT LIST: \n', eventList)
  
  useEffect(() => {
    
    dispatch(fetchEvents())
    
  },[])


  return (
    <div className="App">
      <Header 
        loggedIn={loggedIn} 
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
          <EventGuest />
        </Route>


        <Route exact path='/plan'>
          <Guest /> 
        </Route>


        <Route exact path='/success'>
          <Success />
        </Route>



        <Route exact path="/login">
          <Login />
        </Route>


        <Route exact path='/events'>
          <Event 
            eventList={eventList} 
            />
        </Route>

        <Route exact path='/update-event/:id'>
          <UpdateEvent eventList={eventList} /> 
        </Route>

        <Route exact path='/add-events'>
          <AddEvent />
        </Route>  

        <Route exact path='/view-events/:id'>
          <EventCard /> 
        </Route>

      </Switch>
    </div>
  );
}


export default App;
