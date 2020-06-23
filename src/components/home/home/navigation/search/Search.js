import React, { Component } from "react";
import { API_BASE_URL } from "../../../../../config.js";
import "./Search.css";
import { withRouter } from "react-router-dom";

class Search extends Component {
  state = {
    name: ``,
  };

  searchPokemon = (event, current) => {
    let link = ``;
    let flag = false;
    const path = this.props.location.pathname;
    const page = this.props.match.params.page;
    const e = event.target.value;

    if (e !== "") {
      link = API_BASE_URL + `/pokemon?name=${e}&page=${current}`;
    } else {
      link = API_BASE_URL + `/pokemon?page=${current}`;
    }

    this.props.loadUserData(link);

    flag =
      !this.state.name &&
      (path === `/home/types/${page}` ||
        path === `/home/abilities/${page}` ||
        path === `/home/groups/${page}`);

    this.setState({ name: e });

    this.props.history.push(`/home/${e}/${current}`);

    if (flag) {
      window.location.reload();
    }
  };

  handleChange = (event) => {
    this.searchPokemon(event, 1);
  };

  render() {
    return (
      <span className="searchBar">
        <i className="fas fa-search"></i>
        <input
          className="mainSearch"
          type="text"
          placeholder="Pokédex"
          onChange={this.handleChange}
          defaultValue={this.props.match.params.name}
        />
      </span>
    );
  }
}

export default withRouter(Search);
