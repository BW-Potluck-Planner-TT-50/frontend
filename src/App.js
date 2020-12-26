import React from "react"

// Components
import { Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import Header from "./components/Header"
import Register from "./components/Register"
import EventGuest from "./components/EventGuest"
import EventCard from "./components/EventCard"
import AddEvent from "./components/AddEvent"
import UpdateEvent from "./components/UpdateEvent"
import Event from "./components/Event"
import Login from "./components/Login"
import Guest from "./components/Guest"
import HomePage from "./components/HomePage"
import Success from "./components/Success"

// Utils

function App() {
  const [
    loggedIn,
    isOrganizer,
    eventList,
  ] = useSelector((state) => [
    state.loggedIn,
    state.isOrganizer,
    state.eventList,
  ])

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
        <Route exact path="/join-event">
          <EventGuest />
        </Route>
        <Route exact path="/plan">
          <Guest />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/events">
          <Event
            eventList={eventList}
          />
        </Route>
        <Route exact path="/update-event/:id">
          <UpdateEvent />
        </Route>
        <Route exact path="/add-events">
          <AddEvent />
        </Route>
        <Route exact path="/view-events/:id">
          <EventCard />
        </Route>
      </Switch>
    </div>
  )
}

export default App
