import React, { Component } from "react";
import BackButton from "./BackButton.js";
import ForwardButton from "./ForwardButton.js";
import SearchBar from "./SearchBar.js";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <BackButton />
        <SearchBar />
        <ForwardButton />
      </div>
    );
  }
}

export default Header;
