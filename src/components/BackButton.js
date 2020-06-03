import React, { Component } from "react";

class BackButton extends Component {
  render() {
    return (
      <span className="backButton">
        <object type="image/svg+xml" data="arrow_back-24px.svg" class="logo">
          Forward
        </object>
      </span>
    );
  }
}

export default BackButton;
