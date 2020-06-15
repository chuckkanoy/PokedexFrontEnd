import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import { Component } from "react";

class Register extends Component {
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
    this.validateName = this.validateName.bind(this);
    this.validateData = this.validateData.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ validationEmail: "" });
      return true;
    }
    this.setState({
      validationEmail: "You have entered an invalid email address!",
    });
    return false;
  }

  validateName(name) {
    if (/^[A-Za-z]+/.test(name)) {
      this.setState({ validationEmail: "" });
      return true;
    }
    this.setState({ validationEmail: "You have entered an invalid name!" });
    return false;
  }

  validateData() {
    if (
      this.validateEmail(this.state.email) &&
      this.validateName(this.state.name)
    ) {
      let data = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
      };
      this.registerUser(data);
    }
  }

  registerUser(data) {
    axios
      .post(API_BASE_URL + `/register`, data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response));
        this.props.history.push(`/home`);
        window.location.reload();
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
          <h1>Register</h1>
          {this.state.alreadyRegistered}
          <div className="box">
            Name <br />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.handleNameChange}
              required
            />
          </div>
          {this.state.validationName}
          <br />
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
          <input type="submit" value="Register" />
          <br />
          Already a registered trainer? <Link to="/login">Login Here</Link>
          <br />
          <Link to="/home/">Continue as Guest</Link>
          <br />
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
