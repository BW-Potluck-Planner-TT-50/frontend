import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Potluck from '../images/potluck.png'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: #F18805;
  box-shadow: 1px 1px 3px black;
  position: relative;
  z-index: 2;
  height: 20vh;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 5%;
    @media(max-width: 500px) {
      flex-direction: column;
      img {
        max-height: 10vh;
      }
    }
  }
  .nav-container {
    width: 70%;
    @media(max-width: 500px) {
      margin-top: 3%;
      width: 95%;
    }
    nav {
      display: flex;
      justify-content: flex-end;
      @media(max-width: 500px) {
        justify-content: center;
        align-items: center;
      }
    }
  }
  .active {
      font-weight: bold;
      text-decoration: underline;
    }
  img {
    max-width: 200px;
  }
  a {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    padding: 3% 5%;
    transition: all .3s;
    text-shadow: 1px 1px 3px black;
    @media(max-width: 500px) {
      font-size: 1.1rem;
      text-align: center;
      padding: 1% 3%;
    }
    &:hover {
      text-shadow: 3px 3px 5px black;
    }
  }
  .logout-button {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    text-decoration: none;
    padding: 3% 5%;
    background-color: unset;
    border: unset;
    font-family: 'Times New Roman';
    transition: all .3s;
    text-shadow: 1px 1px 3px black;
    &:hover {
      text-shadow: 3px 3px 5px black;
    }
  }
`

function Header(props) {

  const history = useHistory()

  return(
    <StyledHeader>
      {
      !props.loggedIn ? 
      <div className="header-container">
        <div className="logoContainer">
          <img src={Potluck} alt="Potluck Planner Logo"/>
        </div>
        <div className="nav-container">
          <nav>
            <NavLink to="/login" activeClassName="active">Login</NavLink>
            <NavLink to="/register" activeClassName="active">Register</NavLink>
            <NavLink to="/join-event" activeClassName="active">Join An Event</NavLink>
          </nav>
        </div>

      </div> : ((!props.isOrganizer) ?
      <div className="header-container">
        <div className="logoContainer">
          <img src={Potluck} alt="Potluck Planner Logo"/>
        </div>
        <div className="nav-container">
          <nav>
            <NavLink to="/plan" activeClassName="active">My Event</NavLink>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem("organizer")
                history.push('/login')
                props.setLoggedIn(false)  
            }}>Logout</button>
          </nav>
        </div>
      </div> :
      <div className="header-container">
        <div className="logoContainer">
          <img src={Potluck} alt="Potluck Planner Logo"/>
        </div>
        <div className="nav-container">
          <nav>
            <NavLink to="/events" activeClassName="active">Events</NavLink>

            <NavLink to='/add-events' activeClassName='active'>Add Event</NavLink>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem("organizer")
                history.push('/login')
                props.setLoggedIn(false)  
            }}>Logout</button>
          </nav>
        </div>
      </div>)
      }
    </StyledHeader>
  )
}

export default Header