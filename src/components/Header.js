import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//direction constants
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

//helper method
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Header extends Component {
  constructor(props) {
    super(props);
    const { totalPokemon = null, pageLimit = 15, pageNeighbors = 0 } = props;

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
  }

  //load initial data
  componentDidMount() {
    this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  }

  goToPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const current_page = Math.max(
      this.state.from,
      Math.min(page, this.state.totalPages)
    );

    const paginationData = {
      current_page: current_page,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: 553,
    };

    this.setState({ current_page }, () => onPageChanged(paginationData));
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.goToPage(this.state.current_page - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.goToPage(this.state.current_page + 1);
  };

  render() {
    const { current_page } = this.state;
    return (
      <div className="header">
        <span className="backButton">
          <a href="#" onClick={this.handleMoveLeft}>
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
          <input
            type="text"
            placeholder="Pokémon"
            onChange={(event) =>
              this.props.searchPartialPokemon(event.target.value)
            }
            value={this.props.name}
          />
        </span>
        <span className="forwardButton">
          <a href="#" onClick={this.handleMoveRight}>
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

  //get the pokemon from the api
  loadUserData(link) {
    axios
      .get(link)
      .then((response) => {
        //grab link data
        const from = response.data.meta.from;
        const totalPages = response.data.meta.last_page;
        const pageLimit = response.data.meta.per_page;
        const totalRecords = response.data.meta.total;
        //store new state in components state
        this.setState({
          totalPages: totalPages,
          pageLimit: pageLimit,
          totalRecords: totalRecords,
          from: from,
        });
      })
      .catch((error) => console.log(error));
  }
}

Header.propTypes = {
  totalPokemon: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Header;
