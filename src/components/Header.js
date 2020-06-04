import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        current_page: this.props.sentPageData.current_page,
        last_page: this.props.sentPageData.last_page,
      },
    };

    //bind necessary for callback function
    this.increasePageNumber = this.increasePageNumber.bind(this);
  }

  increasePageNumber() {
    // if (!current === max) {
    //   return current++;
    // }
    var pageNumber = this.props.sentPageData.current_page;
    this.props.receivedPageData(++pageNumber);
  }

  render() {
    return (
      <div className="header">
        <span className="backButton">
          <a href="#">
            <object
              type="image/svg+xml"
              data="arrow_back-24px.svg"
              class="logo"
            >
              Forward
            </object>
          </a>
        </span>
        <span className="searchBar">
          <object type="image/svg+xml" data="search-24px.svg" class="logo">
            Search
          </object>
          <input type="text" placeholder="Pokémon" />
        </span>
        <span className="forwardButton">
          <a href="#" onClick={this.increasePageNumber}>
            <object
              type="image/svg+xml"
              data="arrow_forward-24px.svg"
              class="logo"
            >
              Forward
            </object>
          </a>
        </span>
      </div>
    );
  }
}

export default Header;
