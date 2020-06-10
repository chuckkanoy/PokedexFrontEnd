import React, { Component } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Register.css";

const root = `https://intern-pokedex.myriadapps.com/api/v1/pokemon`;

class Register extends Component {
  render() {
    return (
      <div className="login">
        <div>
          <h1>Registration Page</h1>
          <div className="box">
            Name <br />
            <input type="text" placeholder="Email" />
          </div>
          <br />
          <div className="box">
            Email <br />
            <input type="text" placeholder="Password" />
          </div>
          <br />
          <div className="box">
            Password <br />
            <input type="text" placeholder="Password" />
          </div>
          <br />
          <button type="submit">Login</button>
        </div>
      </div>
    );
  }
}

export default Register;
