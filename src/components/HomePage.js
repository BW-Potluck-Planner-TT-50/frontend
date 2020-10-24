import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import buffet from '../images/buffet.jpg'
import james from '../images/james.jpg'
import caroline from '../images/caroline.jpg'
import erica from '../images/erica.png'
import joon from '../images/joon.jpg'
import guests from '../images/guests.png'
import manage from '../images/manage.png'
import addEvent from '../images/addevent.png'

const StyledHomePage = styled.main`
  background-color: #202C59;
  padding: 2% 5%;
  min-height: 80vh;
  .hero {
    display: flex;
    justify-content: center;
    padding: 3% 10% 5% 10%;
    border: 1px solid black;
    background-image: url(${buffet});
    background-size: cover;
    box-shadow: 5px 5px 10px black;
    h1 {
      color: white;
      font-size: 5rem;
      text-shadow: 5px 5px 10px black;
      text-decoration: underline;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
  }
  .get-started {
      color: white;
      font-size: 3rem;
      text-shadow: 5px 5px 10px black;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      text-align: center;
      margin-top: 5%;
      margin-bottom: 2%;
  }
  .role-container {
    display: flex;
    justify-content: space-between;
    @media(max-width: 500px) {
      flex-direction: column;
      align-items: center;
    }
    .organizer, .guest {
      width: 40%;
      padding: 2%;
      text-align: center;
      background-color: #D95D39;
      box-shadow: 3px 3px 5px black;
      border-radius: 10px;
      @media(max-width: 500px) {
        width: 95%;
        margin-bottom: 3.5%;
      }
      h3 {
        color: white;
        font-size: 2.3rem;
        text-shadow: 5px 5px 10px black;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        text-align: center;
        margin-top: 0px;
      }
      p {
        color: white;
        font-size: 1.5rem;
        font-family: Georgia, 'Times New Roman', Times, serif;
      }
    }
    .organizer {
      .link-container {
        display: flex;
        justify-content: space-between;
        a {
          display: inline-block;
          padding: 3% 5%;
          margin: 2%;
          background-color: #F0A202;
          border-radius: 10px;
          font-size: 2rem;
          width: 40%;
          box-shadow: 3px 3px 5px black;
          color: white;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          text-shadow: 2px 2px 3px black;
          transition: all .2s;
          &:hover {
            background-color: #581F18;
            text-shadow: 4px 4px 5px black;
          }
        }

      }
    }
    .guest {
      .link-container {
        display: flex;
        justify-content: center;
        a {
          padding: 3% 5%;
          margin: 2%;
          background-color: #F0A202;
          border-radius: 10px;
          font-size: 2rem;
          box-shadow: 3px 3px 5px black;
          color: white;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          text-shadow: 2px 2px 3px black;
          transition: all .2s;
          &:hover {
            background-color: #581F18;
            text-shadow: 4px 4px 5px black;
          }
        }
      }
    }
  }
  .marketing-section {
    background-color: #F0A202;
    box-shadow: 5px 5px 10px black;
    padding-top: .3%;
    padding-bottom: .3%;
    .marketing-item {
      background-color: #D95D39;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2%;
      margin: 2%;
      box-shadow: 3px 3px 5px black;
      @media(max-width: 500px) {
        flex-direction: column;
        align-items: center;
        margin: 10% 2%;
      }
      .marketing-item-content {
        width: 60%;
        @media(max-width: 500px) {
          width: 95%;
          text-align: center;
        }
      }
      h4 {
        font-size: 1.8rem;
        @media(max-width: 500px) {
          font-size: 1.2rem;
        }
      }
      p {
        font-size: 1.6rem;
        font-family: Georgia, 'Times New Roman', Times, serif;
        margin-top: 0px;
        @media(max-width: 500px) {
          font-size: 1rem;
        }
      }
      img {
        width: 35%;
        box-shadow: 3px 3px 5px black;
        @media(max-width: 500px) {
          width: 95%;
        }
      }
    }
  }
  .the-team-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .a-team-member { 
      flex: 1 1 250px;
      text-align: center;
      color: white;
      text-shadow: 2px 2px 5px black;
      font-family: Georgia, 'Times New Roman', Times, serif;
      margin: 1%;
      h4 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1.3rem;
      }
      img {
        max-width: 100%;
        border-radius: 50%;
        box-shadow: 3px 3px 5px black;
      }
    }
  }

`

function HomePage() {
  return (
    <StyledHomePage className="content-container">
      <div className="hero">
        <h1>PotLuck Planner</h1>
      </div>
      <h2 className="get-started">Get Started!</h2>
      <div className="role-container">
        <div className="organizer">
          <h3>Organizers</h3>
          <p>As a Potluck Planner organizer you can create a potluck event and manage things including, the general event information, the guestlist, and even food options for people to bring with them. Everything thing is up to you as the organizer and the customizations are endless!</p>
          <div className="link-container">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="guest">
          <h3>Guests</h3>
          <p>If you are here to join an event all that's required is your name and an event code! Your organizer can provide you with a unique event code that you you can then RSVP to the event and select from the list of available food items to bring with you! Need to make a change in the menu, log back in and you can edit your selection!</p>
          <div className="link-container">
            <Link to="/join-event">Join Event</Link>
          </div>
        </div>
      </div>
      <h2 className="get-started">What We Offer</h2>
      <div className="marketing-section">
        <div className="marketing-item">
          <img src={addEvent} alt="Create a new event page" />
          <div className="marketing-item-content">
            <h4>Create Events</h4>
            <p>It has never been easier to create a new event, all you need to do is provide some basic event information and then you are off and running with the capability to manage the event listing or create as many other events as you need!</p>
          </div>
        </div>
        <div className="marketing-item">
          <div className="marketing-item-content">
            <h4>Manage The Guest List and Food</h4>
            <p>After you have created an event you can build out your guest list and food options for them to pick from. This provides more control over the process and helps make sure that everyone is bringing different food items and the Potluck event has everything it needs!</p>
          </div>
          <img src={manage} alt="Manage a potluck event page" />
        </div>
        <div className="marketing-item">
          <img src={guests} alt="..." />
          <div className="marketing-item-content">
            <h4>Easy RSVP For Guests</h4>
            <p>It is so eady for guests to RSVP and select the food item they will bring to the event. As an organizer all you need to do is to add them to the event guestlist then provide them with the unique event code, making it much quicker and easier than mailed invites.</p>
          </div>
        </div>
      </div>
      <h2 className="get-started">Meet The Team!</h2>
      <div className="the-team-container">
        <div className="a-team-member">
          <h4>Erica</h4>
          <img src={erica} alt="Erica" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia fugiat possimus at error explicabo. Voluptas delectus itaque consequatur molestiae provident atque cupiditate labore cumque quos?</p>
        </div>
        <div className="a-team-member">
          <h4>Joon</h4>
          <img src={joon} alt="Joon" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia fugiat possimus at error explicabo. Voluptas delectus itaque consequatur molestiae provident atque cupiditate labore cumque quos?</p>
        </div>
        <div className="a-team-member">
          <h4>James</h4>
          <img src={james} alt="James" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia fugiat possimus at error explicabo. Voluptas delectus itaque consequatur molestiae provident atque cupiditate labore cumque quos?</p>
        </div>
        <div className="a-team-member">
          <h4>Caroline</h4>
          <img src={caroline} alt="Caroline" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia fugiat possimus at error explicabo. Voluptas delectus itaque consequatur molestiae provident atque cupiditate labore cumque quos?</p>
        </div>
      </div>
    </StyledHomePage>
  )
}

export default HomePage