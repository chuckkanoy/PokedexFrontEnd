import React, { Component } from "react";
import "./Navigation.css";
import { withRouter } from "react-router-dom";
import Menu from "./menu/Menu.js";
import Search from "./search/Search.js";
import Arrow from "./arrow/Arrow.js";
import PropTypes from "prop-types";

class Navigation extends Component {
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
    let result = ``;

    if (1 > e) {
      result = this.props.last;
    } else if (this.props.last < e) {
      result = 1;
    }

    if (!result) {
      result = e;
    }

    return result;
  };

  render() {
    const name = this.props.match.params.name;
    const { forwardLink, backLink } = this.getLinks();
    return (
      <div className="navBar">
        <div className="headerMobile">
          <Menu />
          <Arrow link={backLink} identifier={"fas fa-arrow-left"} />
          <Search loadUserData={this.props.loadUserData} name={name} />
          <Arrow link={forwardLink} identifier={"fas fa-arrow-right"} />
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  loadUserData: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
