import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
   console.log('REST: \n', rest)

   if(localStorage.getItem('token') && rest.invite_code){
      return (
         <Redirect to='/guest-events' />
      )
   } else {
      
      return (

         <Route
            {...rest}
            render={ props => {
               if(localStorage.getItem('token')){
                  return <Component {...props} {...rest} />
               } else {
                  return <Redirect to='/login' />
               }
            }}
         />
      )
   }
}

export default PrivateRoute