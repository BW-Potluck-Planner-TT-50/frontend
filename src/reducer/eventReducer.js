export const intialState = {
   loggedIn: localStorage.getItem('token'),
   isOrganizer: JSON.parse(localStorage.getItem('organizer')),
   eventList: [],
}