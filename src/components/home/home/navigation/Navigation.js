import React, { Component } from "react";
import "./Navigation.css";
import { withRouter } from "react-router-dom";
import UserButton from "./menu/Menu.js";
import Search from "./search/Search.js";
import Arrow from "./arrow/Arrow.js";

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
      link + `/${this.applyBounds(parseInt(this.state.page) - 1)}`;
    links.forwardLink =
      link + `/${this.applyBounds(parseInt(this.state.page) + 1)}`;

    return links;
  }

  getLinks() {
    let link = ``;
    const name = this.props.match.params.name;

    if (name) {
      link = `/home/${name}`;
    } else if (this.state.type) {
      link = `/home/types/${this.state.type}`;
    } else if (this.state.ability) {
      link = `/home/abilities/${this.state.ability}`;
    } else if (this.state.group) {
      link = `/home/groups/${this.state.group}`;
    } else if (this.state.path.includes(`/captured`)) {
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

  applyBounds = (e) => {
    let result = Math.max(1, Math.min(e, this.props.last));

    if (!result) {
      result = e;
    }

    return result;
  };

  render() {
    const name = this.state.name;
    const { forwardLink, backLink } = this.getLinks();
    return (
      <div className="header">
        <UserButton user={this.props.user} />
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
