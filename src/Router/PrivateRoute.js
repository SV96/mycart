import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/common";

const PrivateRoute = ({ component: Component, exact, path }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect to='/mystore/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
