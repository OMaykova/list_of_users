import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, ...props }) => {
  return (
    <Route {...props}>
      {isLoggedIn === false ? <Redirect to="/signup"/> : children}
    </Route>
  )
}

export default ProtectedRoute;