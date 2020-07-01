import React, { Component } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { withRouter } from "react-router-dom";
import { post } from "../../API.js";
import { API_BASE_URL } from "../../config";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/core";
import { MobileContext } from "../../mobile-context";

class Security extends Component {
  state = {
    alreadyRegistered: ``,
  };

  clearState = () => {
    this.setState({ alreadyRegistered: `` });
  };

  getAlert(message) {
    return (
      <Alert
        status="error"
        bg="#ff4d4d"
        p="2px"
        borderRadius="2px"
        width="450px"
        margin="auto"
        marginTop="10px"
        alignItems="center"
      >
        <AlertIcon height="20px" width="20px" color="#3f0000" />
        &emsp;&emsp;
        <AlertTitle mr={2} color="#3f0000">
          {message}
        </AlertTitle>
        <AlertDescription color="#3f0000">Try again</AlertDescription>
      </Alert>
    );
  }

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
              alreadyRegistered: this.getAlert("Invalid email or password!"),
            });
          } else if (error.response.status === 422) {
            result = false;
            this.setState({
              alreadyRegistered: this.getAlert(
                "A user with that email already exists!"
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
    const isMobile = this.context;
    let modifier = "";
    if (isMobile) {
      modifier = "Mobile";
    }
    return this.props.location.pathname.includes(`register`) ? (
      <>
        {this.state.alreadyRegistered}
        <div className={"securityWrapper" + modifier}>
          <Register
            registerUser={this.registerUser}
            clearState={this.clearState}
            modifier={modifier}
          />
        </div>
      </>
    ) : (
      <>
        {this.state.alreadyRegistered}
        <div className={"securityWrapper" + modifier}>
          <Login
            registerUser={this.registerUser}
            clearState={this.clearState}
            modifier={modifier}
          />
        </div>
      </>
    );
  }
}

Security.contextType = MobileContext;

export default withRouter(Security);
