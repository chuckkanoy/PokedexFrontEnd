import React, { Component } from "react";
import "./Navigation.css";
import { Link, withRouter } from "react-router-dom";
import UserButton from "./menu/Menu.js";
import Search from "./search/Search.js";

class Header extends Component {
  state = {
    page: this.props.match.params.page,
    name: this.props.match.params.name,
    type: this.props.match.params.type,
    ability: this.props.match.params.ability,
    group: this.props.match.params.group,
    path: this.props.location.pathname,
  };

  movePage(link) {
    let links = { forwardLink: ``, backLink: `` };

    links.backLink =
      link + `/${this.getCurrent(parseInt(this.state.page) - 1)}`;
    links.forwardLink =
      link + `/${this.getCurrent(parseInt(this.state.page) + 1)}`;

    return links;
  }

  getLinks(name) {
    let link = ``;

    if (name) {
      link = `/home/${name}`;
    } else if (this.state.type) {
      link = `/home/types/${this.state.type}`;
    } else if (this.state.ability) {
      link = `/home/abilities/${this.state.ability}`;
    } else if (this.state.group) {
      link = `/home/groups/${this.state.group}`;
    } else if (this.props.location.pathname.includes(`/captured`)) {
      link = `/captured`;
    } else if (this.state.path === `/home/types/${this.state.page}`) {
      link = `/home/types`;
    } else if (this.state.path === `/home/groups/${this.state.page}`) {
      link = `/home/groups`;
    } else if (this.state.path === `/home/abilities/${this.state.page}`) {
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
    const name = this.props.match.params.name;
    const { forwardLink, backLink } = this.getLinks(name);

    return (
      <div className="header">
        <UserButton user={this.props.user}></UserButton>
        {/* back button */}
        <Link to={backLink}>
          <i className="fas fa-arrow-left"></i>
        </Link>
        {/* search bar */}
        <Search
          searchPokemon={this.props.searchPokemon}
          getCurrent={this.getCurrent}
          loadUserData={this.props.loadUserData}
          name={name}
        />
        {/* forward button */}
        <Link to={forwardLink}>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    );
  }
}

export default withRouter(Header);
