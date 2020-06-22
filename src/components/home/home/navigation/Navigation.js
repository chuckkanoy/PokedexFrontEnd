import React, { Component } from "react";
import "./Navigation.css";
import { withRouter } from "react-router-dom";
import UserButton from "./menu/Menu.js";
import Search from "./search/Search.js";
import Arrow from "./arrow/Arrow.js";

class Header extends Component {
  getDirectionalLinks(link) {
    return {
      forwardLink:
        link + `/${this.clamp(parseInt(this.props.match.params.page) + 1)}`,
      backLink:
        link + `/${this.clamp(parseInt(this.props.match.params.page) - 1)}`,
    };
  }

  getLinks() {
    let link = ``;
    const name = this.props.match.params.name;
    const page = this.props.match.params.page;
    const type = this.props.match.params.type;
    const ability = this.props.match.params.ability;
    const group = this.props.match.params.group;
    const path = this.props.location.pathname;

    if (name) {
      link = `/home/${name}`;
    } else if (type) {
      link = `/home/types/${type}`;
    } else if (ability) {
      link = `/home/abilities/${ability}`;
    } else if (group) {
      link = `/home/groups/${group}`;
    } else if (path.includes(`/captured`)) {
      link = `/captured`;
    } else if (path === `/home/types/${page}`) {
      link = `/home/types`;
    } else if (path === `/home/groups/${page}`) {
      link = `/home/groups`;
    } else if (path === `/home/abilities/${page}`) {
      link = `/home/abilities`;
    } else {
      link = `/home`;
    }

    return this.getDirectionalLinks(link);
  }

  clamp = (e) => {
    let result = Math.max(1, Math.min(e, this.props.last));

    if (!result) {
      result = e;
    }

    return result;
  };

  render() {
    const name = this.props.match.params.name;
    const { forwardLink, backLink } = this.getLinks();
    return (
      <div className="header">
        <UserButton />
        <Arrow link={backLink} identifier={"fas fa-arrow-left"} />
        <Search
          searchPokemon={this.props.searchPokemon}
          loadUserData={this.props.loadUserData}
          name={name}
        />
        <Arrow link={forwardLink} identifier={"fas fa-arrow-right"} />
      </div>
    );
  }
}

export default withRouter(Header);
