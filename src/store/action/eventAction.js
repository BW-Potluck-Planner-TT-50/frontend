import axiosWithAuth from "../../utils/axiosWithAuth"

export const fetchEvents = () => (dispatch) => {
  axiosWithAuth()
    .get("/api/events")
    .then((res) => {
      dispatch({
        type: "FETCH_EVENTS_SUCCESS", payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({ type: "FETCH_EVENTS_FAILED", payload: err })
    })
}

export const addEvent = (events) => (dispatch) => {
  axiosWithAuth()
    .post("/api/events", events)
    .catch((err) => {
      dispatch({ type: "ADD_EVENTS_FAILED", payload: err })
    })
}

export const deleteEvent = (id) => (dispatch) => {
  axiosWithAuth()
    .delete(`/api/events/${id}`)
    .then(() => {
      dispatch({
        type: "REMOVE_EVENTS",
        payload: id,
      })
    })
    .catch((err) => {
      dispatch({ type: "REMOVE_EVENTS_FAILED", payload: err })
    })
}

export const updateEvent = (id, events) => (dispatch) => {
  axiosWithAuth()
    .put(`/api/events/${id}`, events)
    .then((res) => {
      console.log(res)
      dispatch({
        type: "UPDATE_EVENTS",
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_EVENTS_FAILED", payload: err })
    })
}

export const loggedInStatus = (status) => ({ type: "LOGGED_IN", payload: status })

export const isOrganizerStatus = (status) => ({ type: "IS_ORGANIZER", payload: status })
