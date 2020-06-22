import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "../home/home/Home";

function AttributeRoutes() {
  return (
    <Switch>
      (
      <Route
        exact
        path="/home/types/:page"
        render={(props) => <Home {...props} />}
      />
      ), (
      <Route
        exact
        path="/home/abilities/:page"
        render={(props) => <Home {...props} />}
      />
      ), (
      <Route
        exact
        path="/home/groups/:page"
        render={(props) => <Home {...props} />}
      />
      ), (
      <Route
        exact
        path="/home/types/:type/:page"
        render={(props) => <Home {...props} />}
      />
      ), (
      <Route
        exact
        path="/home/abilities/:ability/:page"
        render={(props) => <Home {...props} />}
      />
      ), (
      <Route
        exact
        path="/home/groups/:group/:page"
        render={(props) => <Home {...props} />}
      />
      )
    </Switch>
  );
}

export default AttributeRoutes;
