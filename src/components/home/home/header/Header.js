import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import UserButton from "../../../user/UserButton.js";

class Header extends Component {
  //initialize state and constants
  constructor(props) {
    super(props);

    this.state = {
      current_page: this.props.current_page,
    };
  }

  //display the view of the header
  render() {
    let forwardLink = "";
    let backLink = "";
    if (this.props.name) {
      backLink = `/home/${this.props.name}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/${this.props.name}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.type) {
      backLink = `/home/types/${this.props.type}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/types/${this.props.type}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.ability) {
      backLink = `/home/abilities/${this.props.ability}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/abilities/${this.props.ability}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.group) {
      backLink = `/home/groups/${this.props.group}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/groups/${this.props.group}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.location.pathname.includes(`/captured`)) {
      backLink = `/captured/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/captured/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else {
      backLink = `/home/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    }
    return (
      <div className="header">
        <UserButton user={this.props.user}></UserButton>
        {/* back button */}
        <span onClick={this.handleMoveLeft}>
          <Link to={backLink}>
            <i class="fas fa-arrow-left"></i>
          </Link>
        </span>
        {/* search bar */}
        <span className="searchBar">
          <i class="fas fa-search"></i>
          <input
            className="mainSearch"
            type="text"
            placeholder="Pokémon"
            onChange={(e) =>
              this.props.searchPokemon(e.target.value, this.getCurrent(1))
            }
            value={this.props.name}
          />
        </span>
        {/* forward button */}
        <span onClick={this.handleMoveRight}>
          <Link to={forwardLink}>
            <i class="fas fa-arrow-right"></i>
          </Link>
        </span>
      </div>
    );
  }

  //repeated function for getting the current page within the bounds
  getCurrent = (e) => {
    return Math.max(1, Math.min(e, this.props.last));
  };

  //change page data if necesssary
  goToPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const current_page = Math.max(1, Math.min(page, this.props.last));

    const paginationData = {
      current_page: current_page,
    };

    this.setState({ current_page }, () => onPageChanged(paginationData));
  };

  //handle if moving back in pages
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.goToPage(parseInt(this.props.current_page) - 1);
  };

  //handle if moving forward
  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.goToPage(parseInt(this.props.current_page) + 1);
  };
}

export default withCookies(withRouter(Header));
