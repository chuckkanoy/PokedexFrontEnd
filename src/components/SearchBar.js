import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <span className="searchBar">
        <object type="image/svg+xml" data="search-24px.svg" class="logo">
          Search
        </object>
        <input type="text" placeholder="Pokémon" />
      </span>
    );
  }
}

export default SearchBar;
