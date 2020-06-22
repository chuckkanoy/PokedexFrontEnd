import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../home/home/Home";

function AttributeRoutes() {
  return (
    (
      <Route
        exact
        path="/home/types/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/home/abilities/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/home/groups/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/home/types/:type/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/home/abilities/:ability/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (
      <Route
        exact
        path="/home/groups/:group/:page"
        render={(props) => <Home {...props} />}
      />
    ),
    (<Redirect exact from="*" to="/home/1" />)
  );
}

export default AttributeRoutes;
