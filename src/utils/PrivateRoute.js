import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Didn't use in this project.

const PrivateRoute = ({ component: Component, ...rest }) => {
   console.log('REST: \n', rest)
      
   return (

      <Route
         {...rest}
         render={ props => {
            if(!localStorage.getItem('token')){
               return <Component {...props} {...rest} />
            } else {
               return <Redirect to='/' />
            }
         }}
      />
   )

}

export default PrivateRoute