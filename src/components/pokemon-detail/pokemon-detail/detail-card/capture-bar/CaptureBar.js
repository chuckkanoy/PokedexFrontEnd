import React, { Component } from "react";
import { API_Access } from "../../../../../API.js";
import { withRouter } from "react-router-dom";

class CaptureBar extends Component {
  state = {
    captureMessage: "",
  };

  interactPokemon = async (capture) => {
    let currentComponent = this;
    let link = capture ? `capture` : `release`;
    let request = await API_Access.interactPokemon(
      link,
      this.props.match.params.id,
      this.props.user.data.api_token
    );

    if (request) {
      currentComponent.setState(request);
    }
  };

  getCaptureButton = () => {
    if (this.props.user) {
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
