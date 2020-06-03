import React, { Component } from "react";

class ForwardButton extends Component {
  render() {
    return (
      <span className="forwardButton">
        <object type="image/svg+xml" data="arrow_forward-24px.svg" class="logo">
          Forward
        </object>
      </span>
    );
  }
}

export default ForwardButton;
