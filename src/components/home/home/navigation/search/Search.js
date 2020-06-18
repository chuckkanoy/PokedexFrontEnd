import React, { Component } from "react";
import { API_BASE_URL } from "../../../../../config.js";
import "./Search.css";
import { withRouter } from "react-router-dom";

class Search extends Component {
  state = {
    name: this.props.name,
  };

  searchPokemon = (e, current) => {
    let link = ``;
    if (e !== "") {
      link = API_BASE_URL + `/pokemon?name=${e}&page=${current}`;
    } else {
      link = API_BASE_URL + `/pokemon?page=${current}`;
    }
    this.props.loadUserData(link);
    //update the name state to what is in input field
    this.setState({ name: e });
    this.props.history.push(`/home/${e}/${current}`);
  };

  render() {
    return (
      <span className="searchBar">
        <i className="fas fa-search"></i>
        <input
          className="mainSearch"
          type="text"
          placeholder="Pokédex"
          onChange={(e) => this.searchPokemon(e.target.value, 1)}
          value={this.props.name}
        />
      </span>
    );
  }
}

export default withRouter(Search);
