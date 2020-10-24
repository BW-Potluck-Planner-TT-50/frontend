import React from 'react'
import styled from 'styled-components'

const StyledSuccess = styled.div`
  background-color: #202C59;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .success-message-container {
    background-color: #F0A202;
    box-shadow: 3px 3px 3px black;
    padding: 5% 3%;
    min-width: 35%;
    color: white;
    text-shadow: 1px 1px 1px black;
    text-align: center;
    .main-success {
      font-size: 3rem;
      @media(max-width: 500px) {
        font-size: 1.4rem;
      }
    }
    h1 {
      max-width: 400px;
      margin: 0px auto;
      margin-bottom: 3%;
      @media(max-width: 500px) {
        max-width: 200px;
        font-size: 1.2rem;
      }
    }
    h2 {
      max-width: 400px;
      margin: 0px auto;
      @media(max-width: 500px) {
        max-width: 200px;
        font-size: 1rem;
      }
    }
  }
`

function Success() {
   return (
      <StyledSuccess>
        <div className="success-message-container">
          <h1 className="main-success">Success!</h1>
          <h1>You Have Been Registered And Your Food Choice Has Been Accepted</h1>
          <h2>Thank you for RSVPing and we look forward to seeing you at the event!</h2>
        </div>
      </StyledSuccess>
   )
}

export default Success
