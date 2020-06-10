import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./components/PokemonDetail";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home/1" />
          <Redirect exact from="/home/" to="/home/1" />
          <Redirect exact from="/home//:page" to="/home/1" />
          <Route exact path="/home/:page" component={Home} />
          <Route exact path="/home/:name?/:page" component={Home} />
          <Route exact path="/pokemon/:id" component={PokemonDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/404" component={NotFound} />
          <Redirect exact from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
