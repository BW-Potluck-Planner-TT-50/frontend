import React from 'react'
import { NavLink } from 'react-router-dom'
import Potluck from '../images/potluck.png'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: #F18805;
  box-shadow: 1px 1px 3px black;
  position: relative;
  z-index: 2;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 5%;
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

  }
  
`

function Header(props) {
  return(
    <StyledHeader>
      {
      props.loggedIn ? 
      <div className="header-container">
        <div className="logoContainer">
          <img src={Potluck} alt="Potluck Planner Logo"/>
        </div>
        <div>
          <nav>
            <NavLink to="/events" activeClassName="active">Events</NavLink>
            <NavLink to="/plan" activeClassName="active">Plan</NavLink>
          </nav>
        </div>
      </div> : 
      <div className="header-container">
        <div className="logoContainer">
          <img src={Potluck} alt="Potluck Planner Logo"/>
        </div>
        <div>
          <nav>
            <NavLink to="/login" activeClassName="active">Login</NavLink>
            <NavLink to="/register" activeClassName="active">Register</NavLink>
          </nav>
        </div>
      </div>
      }
    </StyledHeader>
  )
}

export default Header