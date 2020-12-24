/* eslint-disable no-alert */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import * as yup from "yup"

// action
import { useDispatch } from "react-redux"
import { loggedInStatus } from "../store/action/eventAction"

// redux hooks
import axiosWithAuth from "../utils/axiosWithAuth"

const StyledGuest = styled.div`
  background-color: #202C59;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .guest-select-box {
    text-align: center;
    background-color: #F0A202;
    box-shadow: 3px 3px 5px black;
    padding: 3%;
    min-width: 45%;
    color: white;
    text-shadow: 1px 1px 1px black;
    .event-info {
      margin: 0px;
      padding: 0px;
    }
    @media(max-width: 500px) {
      padding: 1%;
    }
    form {
      margin-top: 15px;
      input, label {
        padding: 3%;
        margin-bottom: 6%;
        text-align: center;
        font-size: 2rem;
        @media(max-width: 500px) {
          font-size: 1rem;
        }
      }
      input[type="checkbox"] {
        width:30px;
        height:30px;
        vertical-align: top;
        @media(max-width: 500px) {
          width:25px;
          height:25px;
          vertical-align: top;
        }
      }
      select {
        margin-left: 2%;
        text-align: center;
        font-size: 1.5rem;
        @media(max-width: 500px) {
          font-size: 1rem;
        }
      }
      .login-error {
        height: 20px;
        width: 450px;
        color: red;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0px auto;
        @media(max-width: 500px) {
          font-size: 1rem;
          width: 200px;
        }
      }
      button {
        padding: 2% 5%;
        font-size: 2rem;
        background-color: #202C59;
        color: white;
        transform: all .2s;
        box-shadow: 3px 3px 5px black;
        margin-top: 2%;
        cursor: pointer;
        @media(max-width: 500px) {
          font-size: 1rem;
        }
      }
      .disabled {
        color: rgba(16, 16, 16, 0.3);
        background-color: rgba(239, 239, 239, 0.3);
        border: 0px solid transparent;
        box-shadow: 0px 0px 0px black;
      }
    }
  }
`

const schema = yup.object().shape({
  rsvp: yup.boolean().oneOf([true], "You must agree to attend the event"),
  food: yup.string().required("Selecting a food you will bring is required"),
})

function Guest() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [guestInfo, setGuestInfo] = useState({
    rsvp: false,
    food: "",
    email: "",
  })
  const [eventInfo, setEventInfo] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  })
  const [currentFood, setCurrentFood] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({ rsvp: "", food: "" })
  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  useEffect(() => {
    axiosWithAuth()
      .get("/api/guest/guest")
      .then((res) => {
        setGuestInfo({ ...res.data[0], food: res.data[0].food === null ? "" : res.data[0].food })
        return res
      })
      .then((res) => {
        axiosWithAuth()
          .get(`/api/events/${res.data[0].event_id}`)
          .then((response) => {
            setEventInfo(response.data)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (eventInfo.id !== undefined) {
      axiosWithAuth()
        .get(`/api/events/${eventInfo.id}/guest-list`)
        .then((finalResponse) => {
          console.log(finalResponse.data)
          const guest = finalResponse.data.filter((i) => i.food !== null && i.id !== guestInfo.id)
          const formattedFood = guest.map((food) => food.food)
          setCurrentFood(formattedFood)
        })
    }
  }, [eventInfo, guestInfo.id])

  useEffect(() => {
    schema
      .isValid(guestInfo)
      .then((valid) => {
        const submit = document.querySelector("#submit")
        if (!valid) {
          submit.classList.add("disabled")
        } else {
          submit.classList.remove("disabled")
        }
        setDisabled(!valid)
      })
  }, [guestInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .put("/api/guest/guest", { rsvp: guestInfo.rsvp, food: guestInfo.food })
      .then(() => {
        setErrors("")
        dispatch(loggedInStatus(false))
        localStorage.removeItem("token")
        history.push("/success")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const confirmation = (e) => {
    const result = window.confirm("You will not be able to make any changes after the confirmation. \nAre you sure to confirm?")
    e.persist()
    if (result) {
      handleSubmit(e)
    }
  }

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormErrors(e.target.name, value)
    setGuestInfo({ ...guestInfo, [e.target.name]: value })
  }

  return (
    <StyledGuest className="guest">
      <div className="guest-select-box">
        <h1>
          Welcome
          {" "}
          {guestInfo.email.split("@")[0]}
        </h1>
        <h1 className="event-info">
          <strong>Event Name:</strong>
          {" "}
          {eventInfo.name}
        </h1>
        <h1 className="event-info">
          <strong>Event Date:</strong>
          {" "}
          {eventInfo.date}
        </h1>
        <h1 className="event-info">
          <strong>Event Time:</strong>
          {" "}
          {eventInfo.time}
        </h1>
        <h1 className="event-info">
          <strong>Event Location:</strong>
          {" "}
          {eventInfo.location}
        </h1>
        <form onSubmit={confirmation}>
          {/* RSVP STATUS */}
          <div className="input-container">
            <label htmlFor="rsvp">
              I will be attending the event
              <input id="rsvp" type="checkbox" name="rsvp" checked={guestInfo.rsvp} onChange={handleChange} />
            </label>
          </div>
          <div>
            <p>
              <strong>Food already being brought:</strong>
              {" "}
              {currentFood.length > 0 ? currentFood.join(", ") : "(No Food Claimed Yet)"}
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="food">
              I will be bringing
              <input id="food" name="food" onChange={handleChange} value={guestInfo.food} />
            </label>
          </div>
          <div className="login-error">{errors.rsvp}</div>
          <div className="login-error">{errors.food}</div>
          <div className="input-container">
            <button type="submit" id="submit" disabled={disabled}>Confirm</button>
          </div>
        </form>
      </div>
    </StyledGuest>
  )
}

export default Guest
