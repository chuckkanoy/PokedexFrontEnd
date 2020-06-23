import React, { Component } from "react";
import { interactPokemon } from "../../../../../API.js";
import { withRouter } from "react-router-dom";

class CaptureBar extends Component {
  state = {
    captureMessage: "",
  };

  getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      console.log("Unable to parse user!");
    }
  }

  interactPokemon = async (capture) => {
    let currentComponent = this;
    let link = capture ? `capture` : `release`;
    let request = await interactPokemon(
      link,
      this.props.match.params.id,
      this.getUser().data.api_token
    );

    if (request) {
      currentComponent.setState(request);
    }
  };

  getCaptureButton = () => {
    if (this.getUser()) {
      return (
        <div>
          <button
            className="captureButton"
            onClick={() => this.interactPokemon(true)}
          >
            Capture
          </button>
          <button
            className="captureButton"
            onClick={() => this.interactPokemon(false)}
          >
            Release
          </button>
          <label>{this.state.captureMessage}</label>
        </div>
      );
    }
  };

  render() {
    return <div>{this.getCaptureButton()}</div>;
  }
}

export default withRouter(CaptureBar);
