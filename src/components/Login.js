import React, { Component } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Login.css";

const root = `https://intern-pokedex.myriadapps.com/api/v1/pokemon`;

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login">
          <h1>Login Page</h1>
          <div className="box">
            Email <br />
            <input type="text" placeholder="Email" />
          </div>
          <br />
          <div className="box">
            Password <br />
            <input type="text" placeholder="Password" />
          </div>
          <button type="submit">Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
