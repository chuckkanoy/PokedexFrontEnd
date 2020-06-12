import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { Component } from "react";
import { withCookies, Cookies } from "react-cookie";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      validationName: "",
      validationEmail: "",
      alreadyRegistered: "",
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validateData = this.validateData.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ validationEmail: "" });
      return true;
    }
    this.setState({
      validationEmail: "You have entered an invalid email address!",
    });
    return false;
  }

  validateData() {
    if (this.validateEmail(this.state.email)) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      this.registerUser(data);
    }
  }

  registerUser(data) {
    const { cookies } = this.props;
    axios
      .post(API_BASE_URL + `/login`, data)
      .then((response) => {
        console.log(typeof response);
        this.props.updateUser(response);
        this.props.history.push(`/home`);
        cookies.set("user", JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 422) {
            this.setState({
              alreadyRegistered: "A user with this email already exists!",
            });
          }
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateData();
  }

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
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <br />
          <input type="submit" value="Login" />
          <br />
          No account? <Link to="/register">Sign Up</Link>
          <br />
          <Link to="/home/">Continue as Guest</Link>
          <br />
        </form>
      </div>
    );
  }
}

export default withCookies(withRouter(Login));
