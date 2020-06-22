import React from "react";
import { Route } from "react-router-dom";
import Home from "../home/home/Home.js";
import Login from "../security/Login.js";
import Register from "../security/Register.js";

function AuthenticationRoutes(props) {
  return (
    (
      <Route
        exact
        path="/home/captured/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/captured/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (<Route exact path="/login" render={() => <Login />} />),
    (<Route exact path="/register" render={() => <Register />} />)
  );
}

export default AuthenticationRoutes;
