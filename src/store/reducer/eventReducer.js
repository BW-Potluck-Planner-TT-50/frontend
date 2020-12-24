const initialState = {

  loggedIn: localStorage.getItem("token"),
  isOrganizer: JSON.parse(localStorage.getItem("organizer")),
  isFetching: false,
  eventList: [],
  error: "",

}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS_SUCCESS":
      return {
        ...state,
        loggedIn: localStorage.getItem("token"),
        isFetching: false,
        eventList: action.payload,
      }

    case "FETCH_EVENTS_FAILED":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case "REMOVE_EVENTS":
      return {
        ...state,
        isFetching: false,
        eventList: state.eventList.filter((eachEvent) => eachEvent.id !== action.payload),
      }

    case "ADD_EVENTS":
      return {
        ...state,
        isFetching: false,
        eventList: [...state.eventList, action.payload],
      }
    case "UPDATE_EVENTS":
      return {
        ...state,
        isFetching: false,
        eventList: state.eventList.map((eachEvent) => {
          if (eachEvent.id === action.payload.id) {
            return action.payload
          }
          return eachEvent
        }),
      }

    case "REMOVE_EVENTS_FAILED":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case "ADD_EVENTS_FAILED":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case "UPDATE_EVENTS_FAILED":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      }
    case "IS_ORGANIZER":
      return {
        ...state,
        isOrganizer: action.payload,
      }

    default:
      return state
  }
}

export default eventReducer
