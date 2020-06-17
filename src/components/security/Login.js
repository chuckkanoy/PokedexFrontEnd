import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Security.css";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    validationName: "",
    validationEmail: "",
    alreadyRegistered: "",
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  validateEmail = (email) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ validationEmail: "" });
      return true;
    }
    this.setState({
      validationEmail: "You have entered an invalid email address!",
    });
    return false;
  };

  validateData = () => {
    if (this.validateEmail(this.state.email)) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      this.registerUser(data);
    }
  };

  registerUser = (data) => {
    axios
      .post(API_BASE_URL + `/login`, data)
      .then((response) => {
        console.log(typeof response);

        localStorage.setItem("user", JSON.stringify(response));
        this.props.history.goBack();
        // window.location = document.referrer;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            this.setState({
              alreadyRegistered: "Invalid email or password!",
            });
          }
        }
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateData();
  };

  render() {
    //visualize the registration page
    return (
      <div className="register">
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div className="box">
            Email <br />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="login"
              onChange={this.handleEmailChange}
              required
            />
          </div>
          {this.state.validationEmail}
          <br />
          <div className="box">
            Password <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="login"
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <br />
          <input type="submit" value="Login" />
          <br />
          <br />
          No account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
          <br />
          <Link to="/home/" style={{ textDecoration: "none" }}>
            Continue as Guest
          </Link>
          <br />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
