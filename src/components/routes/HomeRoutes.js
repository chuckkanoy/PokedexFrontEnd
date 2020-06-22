import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../home/home/Home";

function HomeRoutes() {
  return (
    (
      <Route exact path="/home/:page" render={(props) => <Home {...props} />} />
    ),
    (
      <Route
        exact
        path="/home/:name?/:page"
        render={(props) => <Home {...props} />}
      />
    )
  );
}

export default HomeRoutes;
