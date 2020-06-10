import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Header.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

class Header extends Component {
  //initialize state and constants
  constructor(props) {
    super(props);
    const { totalPokemon = null, pageLimit = 15, pageNeighbors = 0 } = props;
    const data = 0;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 15;
    this.totalPokemon = typeof totalPokemon === "number" ? totalPokemon : 0;

    this.pageNeighbors =
      typeof pageNeighbors === "number"
        ? Math.max(0, Math.min(pageNeighbors, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalPokemon / this.pageLimit);

    this.state = {
      current_page: this.props.current_page,
      totalPages: 0,
      pageLimit: 15,
    };

    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged = (newData) => {
    this.data = newData;
    console.log(this.data);
  };

  getCurrent = (e) => {
    return Math.max(1, Math.min(e, this.props.last));
  };

  //change page data if necesssary
  goToPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const current_page = Math.max(1, Math.min(page, this.props.last));

    const paginationData = {
      current_page: current_page,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: 553,
    };

    this.setState({ current_page }, () => onPageChanged(paginationData));
  };

  //handle if moving back in pages
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.goToPage(this.props.current_page - 1);
  };

  //handle if moving forward
  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.goToPage(parseInt(this.props.current_page) + 1);
  };

  //display the view of the header
  render() {
    if (this.props.name !== "") {
      return (
        <div className="header">
          {/* back button */}
          <span className="backButton" onClick={this.handleMoveLeft}>
            <Link
              to={`/home/${this.props.name}/${this.getCurrent(
                parseInt(this.props.current_page) - 1
              )}`}
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
          </span>
          {/* search bar */}

          <span className="searchBar">
            <ion-icon name="search-sharp"></ion-icon>
            <input
              type="text"
              placeholder="Pokémon"
              onChange={(e) => (
                this.props.searchPokemon(e.target.value),
                this.props.history.push(
                  `/home/${e.target.value}/${this.getCurrent(
                    this.props.match.params.page
                  )}`
                )
              )}
              value={this.props.name}
            />
          </span>
          {/* forward button */}
          <span className="forwardButton" onClick={this.handleMoveRight}>
            <Link
              to={`/home/${this.props.name}/${this.getCurrent(
                parseInt(this.props.current_page) + 1
              )}`}
            >
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </Link>
          </span>
        </div>
      );
    } else {
      return (
        <div className="header">
          {/* back button */}
          <span className="backButton" onClick={this.handleMoveLeft}>
            <Link to={`/home/${parseInt(this.props.current_page) - 1}`}>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
          </span>
          {/* search bar */}

          <span className="searchBar">
            <ion-icon name="search-sharp"></ion-icon>
            <input
              type="text"
              placeholder="Pokémon"
              onChange={(e) => (
                this.props.searchPokemon(e.target.value), this.goToPage(1)
              )}
              value={this.props.name}
            />
          </span>
          {/* forward button */}
          <span className="forwardButton" onClick={this.handleMoveRight}>
            <Link to={`/home/${this.getCurrent(this.props.current_page + 1)}`}>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </Link>
          </span>
        </div>
      );
    }
  }
}

//props for pagination
Header.propTypes = {
  totalPokemon: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default withRouter(Header);
