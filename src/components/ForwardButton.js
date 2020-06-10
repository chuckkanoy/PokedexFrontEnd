import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Header.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

class ForwardButton extends Component {
  //initialize state and constants
  constructor(props) {
    super(props);
    const { totalPokemon = null, pageLimit = 15, pageNeighbors = 0 } = props;
    const current_page = 1;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 15;
    this.totalPokemon = typeof totalPokemon === "number" ? totalPokemon : 0;

    this.pageNeighbors =
      typeof pageNeighbors === "number"
        ? Math.max(0, Math.min(pageNeighbors, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalPokemon / this.pageLimit);

    this.state = {
      current_page: 1,
      totalPages: 0,
      pageLimit: 15,
    };
  }

  //load initial data
  componentDidMount() {
    this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  }

  //change page data if necesssary
  goToPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    this.current_page = Math.max(
      this.state.from,
      Math.min(page, this.state.totalPages)
    );

    const paginationData = {
      current_page: this.current_page,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: 553,
    };

    console.log(this.state.current_page);
    // this.setState({ current_page }, () => onPageChanged(current_page));
  };

  //handle if moving back in pages
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    return this.goToPage(this.state.current_page - 1);
  };

  //handle if moving forward
  handleMoveRight = (evt) => {
    evt.preventDefault();
    return this.goToPage(this.state.current_page + 1);
  };

  //display the view of the header
  render() {
    return (
      <span className="forwardButton" onClick={this.handleMoveRight}>
        <Link to={`/home/${this.current_page}`}>
          <object
            type="image/svg+xml"
            data="arrow_forward-24px.svg"
            class="logo"
          >
            Forward
          </object>
        </Link>
      </span>
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

//props for pagination
ForwardButton.propTypes = {
  totalPokemon: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default ForwardButton;
