import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import "../Security.css";
import { Component } from "react";
import InputBox from "../input/InputBox";
import { MobileContext } from "../../../mobile-context";

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
      this.props.registerUser(data, `/login`).catch((error) => {
        console.log(error);
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateData();
  };

  render() {
    return (
      <div className={"register" + this.props.modifier}>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.state.alreadyRegistered}
          <InputBox
            title={"Email"}
            type={"text"}
            handleChange={this.handleEmailChange}
            modifier={this.props.modifier}
          />
          {this.state.validationEmail}
          <br />
          <InputBox
            title={"Password"}
            type={"password"}
            handleChange={this.handlePasswordChange}
            modifier={this.props.modifier}
          />
          <br />
          <input type="submit" value="Login" />
          <br />
          <br />
          No account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none" }}
            onClick={this.props.clearState}
          >
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

Login.contextType = MobileContext;

export default withRouter(Login);
