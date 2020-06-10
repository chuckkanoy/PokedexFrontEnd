import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Header.css";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ForwardButton from "./ForwardButton";

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

  //load initial data
  componentDidMount() {
    // this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  }

  onPageChanged = (newData) => {
    this.data = newData;
    console.log(this.data);
  };

  //change page data if necesssary
  // goToPage = (page) => {
  //   const { onPageChanged = (f) => f } = this.props;

  //   const current_page = Math.max(
  //     this.state.from,
  //     Math.min(page, this.state.totalPages)
  //   );

  //   const paginationData = {
  //     current_page: current_page,
  //     totalPages: this.state.totalPages,
  //     pageLimit: this.state.pageLimit,
  //     totalRecords: 553,
  //   };

  //   console.log(current_page);
  //   this.setState({ current_page }, () => onPageChanged(paginationData));
  // };

  // //handle if moving back in pages
  // handleMoveLeft = (evt) => {
  //   evt.preventDefault();
  //   return this.goToPage(this.props.current_page - 1);
  // };

  // //handle if moving forward
  // handleMoveRight = (evt) => {
  //   evt.preventDefault();
  //   return this.goToPage(this.props.current_page + 1);
  // };

  //display the view of the header
  render() {
    return (
      <div className="header">
        {/* back button */}
        <span className="backButton" onClick={this.handleMoveLeft}>
          <object type="image/svg+xml" data="arrow_back-24px.svg" class="logo">
            Back
          </object>
        </span>
        {/* search bar */}
        <span className="searchBar">
          <object type="image/svg+xml" data="search-24px.svg" class="logo">
            Search
          </object>
          <input
            type="text"
            placeholder="Pokémon"
            // onChange={(e) => this.props.searchPokemon(e.target.value)}
            value={this.props.name}
          />
        </span>
        {/* forward button */}

        <ForwardButton onPageChanged={this.onPageChanged} />
      </div>
    );
  }

  //get the pokemon from the api
  // loadUserData(link) {
  //   axios
  //     .get(link)
  //     .then((response) => {
  //       //grab link data
  //       const from = response.data.meta.from;
  //       const totalPages = response.data.meta.last_page;
  //       const pageLimit = response.data.meta.per_page;
  //       const totalRecords = response.data.meta.total;
  //       //store new state in components state
  //       this.setState({
  //         totalPages: totalPages,
  //         pageLimit: pageLimit,
  //         totalRecords: totalRecords,
  //         from: from,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }
}

//props for pagination
Header.propTypes = {
  totalPokemon: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Header;
