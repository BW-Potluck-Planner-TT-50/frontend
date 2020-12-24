/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react"
import { Route, Redirect } from "react-router-dom"

// Didn't use in this project.

export const OrganizerPrivateRoute = ({ component: Component, ...rest }) => {
  console.log("REST: \n", rest)

  return (

    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} {...rest} />
        }
        return <Redirect to="/" />
      }}
    />
  )
}

export const GuestPrivateRoute = ({ component: Component, ...rest }) => {
  console.log("REST: \n", rest)

  return (

    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          return <Component {...props} {...rest} />
        }
        return <Redirect to="/" />
      }}
    />
  )
}
