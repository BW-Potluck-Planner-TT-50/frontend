import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Potluck from '../images/potluck.png'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: papayawhip;
  box-shadow: 1px 1px 3px black;
  position: relative;
  z-index: 2;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 5%;
  }
  .nav-container {
    width: 70%;
    nav {
      display: flex;
      justify-content: flex-end;
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
    font-family:  'Open Sans', sans-serif;
    color: #f88e79;
    text-decoration: none;
    padding: 3% 5%;
    transition: all .3s;
    text-shadow: 1px 1px 3px black;
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

function Header(props)
{


    const history = useHistory()
    console.log(localStorage.getItem('organizer'))

    return (
        <StyledHeader>
            {
                !props.loggedIn ?
                    <div className="header-container">
                        <div className="logoContainer">
                            <img src={Potluck} alt="Potluck Planner Logo" />
                        </div>
                        <div className="nav-container">
                            <nav>
                                <NavLink to="/login" activeClassName="active">SIGN IN</NavLink>
                                <NavLink to="/register" activeClassName="active">SIGN UP</NavLink>
                                <NavLink to="/join-event" activeClassName="active">Join An Event</NavLink>
                            </nav>
                        </div>

                    </div> : ((!props.isOrganizer) ?
                        <div className="header-container">
                            <div className="logoContainer">
                                <img src={Potluck} alt="Potluck Planner Logo" />
                            </div>
                            <div className="nav-container">
                                <nav>
                                    <NavLink to="/plan" activeClassName="active">EVENTS HOSTED BY ME</NavLink>
                                    <button className="logout-button" onClick={() =>
                                    {
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
                                <img src={Potluck} alt="Potluck Planner Logo" />
                            </div>
                            <div className="nav-container">
                                <nav>
                                    <NavLink to="/events" activeClassName="active">Events</NavLink>

                                    <NavLink to='/add-events' activeClassName='active'>Add Event</NavLink>
                                    <button className="logout-button" onClick={() =>
                                    {
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