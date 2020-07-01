import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import "../Security.css";
import { Component } from "react";
import InputBox from "../input/InputBox.js";

class Register extends Component {
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

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
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

  validateName = (name) => {
    if (/^[A-Za-z]+/.test(name)) {
      this.setState({ validationEmail: "" });
      return true;
    }
    this.setState({ validationEmail: "You have entered an invalid name!" });
    return false;
  };

  validateData = () => {
    if (
      this.validateEmail(this.state.email) &&
      this.validateName(this.state.name)
    ) {
      let data = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
      };
      this.props.registerUser(data, `/register`);
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
          <h1>Register</h1>
          {this.state.alreadyRegistered}
          <InputBox
            title={"Name"}
            type={"text"}
            handleChange={this.handleNameChange}
            modifier={this.props.modifier}
          />
          {this.state.validationName}
          <br />
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
          <input type="submit" value="Register" />
          <br />
          <br />
          Already a registered trainer?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={this.props.clearState}
          >
            Login Here
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

export default withRouter(Register);
