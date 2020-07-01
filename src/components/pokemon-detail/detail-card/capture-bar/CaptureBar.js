import React, { Component } from "react";
import { post } from "../../../../API.js";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../../../../config.js";

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
    let request = ``;
    await post({
      link:
        API_BASE_URL + `/pokemon/` + link + `/` + this.props.match.params.id,
      data: ``,
    }).then((response) => {
      request = { captureMessage: response.data };
    });

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
