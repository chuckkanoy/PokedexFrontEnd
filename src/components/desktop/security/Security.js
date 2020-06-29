import React, { Component } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { withRouter } from "react-router-dom";
import { post } from "../../../API.js";
import { API_BASE_URL } from "../../../config";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
  ThemeProvider,
  withAlert,
} from "@chakra-ui/core";
import { compose } from "redux";

class Security extends Component {
  state = {
    alreadyRegistered: ``,
  };
  registerUser = async (data, extension) => {
    let result = ``;

    await post({ link: API_BASE_URL + extension, data: data })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        result = true;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            result = false;
            this.setState({
              alreadyRegistered: (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Invalid email or password!</AlertTitle>
                  <AlertDescription>Try again</AlertDescription>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              ),
            });
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
    }
  };

  render() {
    return this.props.location.pathname.includes(`register`) ? (
      <div className="securityWrapper">
        {this.state.alreadyRegistered}
        <Register registerUser={this.registerUser} />
      </div>
    ) : (
      <div className="securityWrapper">
        {this.state.alreadyRegistered}
        <Login registerUser={this.registerUser} />
      </div>
    );
  }
}

export default withRouter(Security);
