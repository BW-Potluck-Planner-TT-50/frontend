import React, { useState } from 'react';
import Header from './components/Header'
import Register from './components/Register'
import EventGuest from './components/EventGuest'
import { Route, Switch } from 'react-router-dom'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <div>Homepage Component Goes Here</div>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <div>Login Component Here</div>
        </Route>
        <Route path="/join-event">
          <EventGuest />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
