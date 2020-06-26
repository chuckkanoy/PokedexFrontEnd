import React, { Component } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { withRouter } from "react-router-dom";
import { post } from "../../../API.js";
import { API_BASE_URL } from "../../../config";

class SecurityMobile extends Component {
  registerUser = async (data, extension) => {
    let result = ``;

    await post({ link: API_BASE_URL + extension, data: data })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        result = true;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            result = false;
          }
        }
      });

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

  render() {
    return this.props.location.pathname.includes(`register`) ? (
      <div className="securityWrapperMobile">
        <Register registerUser={this.registerUser} />
      </div>
    ) : (
      <div className="securityWrapperMobile">
        <Login registerUser={this.registerUser} />
      </div>
    );
  }
}

export default withRouter(SecurityMobile);
