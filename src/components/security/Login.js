import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Security.css";
import { Component } from "react";
import { API_Access } from "../../API.js";
import InputBox from "./input/InputBox";

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

  registerUser = async (data) => {
    const result = await API_Access.accessUser(`/login`, data);

    if (result) {
      if (localStorage.getItem("preLoginPage")) {
        this.props.history.push(localStorage.getItem("preLoginPage"));
        localStorage.removeItem("preLoginPage");
      } else {
        this.props.history.push(`/home`);
      }
    } else {
      this.setState({
        alreadyRegistered: "Invalid email or password",
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateData();
  };

  render() {
    return (
      <div className="register">
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.state.alreadyRegistered}
          <InputBox
            title={"Email"}
            type={"text"}
            handleChange={this.handleEmailChange}
          />
          {this.state.validationEmail}
          <br />
          <InputBox
            title={"Password"}
            type={"password"}
            handleChange={this.handlePasswordChange}
          />
          <br />
          <input type="submit" value="Login" />
          <br />
          <br />
          No account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
          <br />
          <Link
            to={() => {
              let result = ``;
              if (localStorage.getItem("preLoginPage")) {
                result = localStorage.getItem("preLoginPage");
              } else {
                result = `/home`;
              }
              return result;
            }}
            style={{ textDecoration: "none" }}
          >
            Continue as Guest
          </Link>
          <br />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
