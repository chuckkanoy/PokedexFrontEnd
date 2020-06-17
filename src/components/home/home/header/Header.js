import React, { Component } from "react";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import UserButton from "../../../user/UserButton.js";

class Header extends Component {
  movePage(link) {
    let links = { forwardLink: ``, backLink: `` };

    links.backLink =
      link + `/${this.getCurrent(parseInt(this.props.current_page) - 1)}`;
    links.forwardLink =
      link + `/${this.getCurrent(parseInt(this.props.current_page) + 1)}`;

    return links;
  }

  getLinks() {
    let link = ``;

    if (this.props.name) {
      link = `/home/${this.props.name}`;
    } else if (this.props.type) {
      link = `/home/types/${this.props.type}`;
    } else if (this.props.ability) {
      link = `/home/abilities/${this.props.ability}`;
    } else if (this.props.group) {
      link = `/home/groups/${this.props.group}`;
    } else if (this.props.location.pathname.includes(`/captured`)) {
      link = `/captured`;
    } else if (
      this.props.location.pathname === `/home/types/${this.props.current_page}`
    ) {
      link = `/home/types`;
    } else if (
      this.props.location.pathname === `/home/groups/${this.props.current_page}`
    ) {
      link = `/home/groups`;
    } else if (
      this.props.location.pathname ===
      `/home/abilities/${this.props.current_page}`
    ) {
      link = `/home/abilities`;
    } else {
      link = `/home`;
    }

    return this.movePage(link);
  }

  //repeated function for getting the current page within the bounds
  getCurrent = (e) => {
    return Math.max(1, Math.min(e, this.props.last));
  };

  //display the view of the header
  render() {
    const { forwardLink, backLink } = this.getLinks();

    return (
      <div className="header">
        <UserButton user={this.props.user}></UserButton>
        {/* back button */}
        <Link to={backLink}>
          <i className="fas fa-arrow-left"></i>
        </Link>
        {/* search bar */}
        <span className="searchBar">
          <i className="fas fa-search"></i>
          <input
            className="mainSearch"
            type="text"
            placeholder="Pokédex"
            onChange={(e) =>
              this.props.searchPokemon(e.target.value, this.getCurrent(1))
            }
            value={this.props.name}
          />
        </span>
        {/* forward button */}
        <Link to={forwardLink}>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    );
  }
}

export default withRouter(Header);
