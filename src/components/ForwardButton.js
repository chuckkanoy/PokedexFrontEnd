import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ForwardButton extends Component {
  render() {
    return (
      <Link to={`/home/${this.props.current_page}`}>
        <span className="forwardButton">
          <object
            type="image/svg+xml"
            data="arrow_forward-24px.svg"
            class="logo"
          >
            Forward
          </object>
        </span>
      </Link>
    );
  }
}

export default ForwardButton;
