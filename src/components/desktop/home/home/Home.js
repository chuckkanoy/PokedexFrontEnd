import React, { Component } from "react";
import Navigation from "./navigation/Navigation";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import { API_BASE_URL } from "../../../../config.js";
import "./Home.css";
import { get } from "../../../../API";
import Attribute from "../attribute/Attribute";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Home extends Component {
  state = {
    data: [],
    meta: [],
    links: [],
  };

  _isMounted = false;

  componentWillReceiveProps(newProps) {
    const path = newProps.location.pathname;
    const name = newProps.match.params.name;
    const currentPath = this.props.location.pathname;

    if (path !== currentPath && path !== `/home/${name}/1`) {
      window.location.reload();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.checkConditions(this.props.match.params.page);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDisplay = () => {
    const path = this.props.location.pathname;
    const page = this.props.match.params.page;
    const name = this.props.match.params.name;
    let element = ``;

    if (path === `/home/types/${page}` && !name) {
      element = <Attribute label={"types"} data={this.state} />;
    } else if (path === `/home/abilities/${page}`) {
      element = <Attribute label={"abilities"} data={this.state} />;
    } else if (path === `/home/groups/${page}`) {
      element = <Attribute label={"groups"} data={this.state} />;
    } else {
      if (this.state.data) {
        element = (
          <div className="pokemonCardHolder">
            {this.state.data.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                updateView={this.updateView}
              />
            ))}
          </div>
        );
      }
    }
    return element;
  };

  loadUserData = async (link) => {
    let result = ``;

    await get(link)
      .then((response) => {
        result = response.data;
        if (result.meta) {
          if (result.meta.last_page < this.props.match.params.page) {
            this.checkConditions(result.meta.last_page);
          }

          if (1 > this.props.match.params.page) {
            this.checkConditions(1);
          }

          if (result && this._isMounted) {
            this.setState(result);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 500) {
            this.props.history.push(`/home`);
          }
        }
      });
  };

  constructURL(path) {
    return API_BASE_URL + path;
  }

  checkConditions(page) {
    const name = this.props.match.params.name;
    const type = this.props.match.params.type;
    const ability = this.props.match.params.ability;
    const group = this.props.match.params.group;
    const path = this.props.location.pathname;
    let links = ``;

    if (name) {
      links = {
        api: `/pokemon?name=${name}&page=${page}`,
        browser: `/home/${name}/${page}`,
      };
    } else if (type) {
      links = {
        api: `/pokemon/types/${type}?type=${type}&page=${page}`,
        browser: `/home/types/${type}/${page}`,
      };
    } else if (ability) {
      links = {
        api: `/pokemon/abilities/${ability}?ability=${ability}&page=${page}`,
        browser: `/home/abilities/${ability}/${page}`,
      };
    } else if (group) {
      links = {
        api: `/pokemon/groups/${group}?group=${group}&page=${page}`,
        browser: `/home/groups/${group}/${page}`,
      };
    } else if (path.includes(`/captured`)) {
      links = {
        api: `/pokemon/captured?page=${page}`,
        browser: `/home/captured/${page}`,
      };
    } else if (path.includes(`/home/types`)) {
      links = {
        api: `/pokemon/types?page=${page}`,
        browser: `/home/types/${page}`,
      };
    } else if (path.includes(`/home/abilities`)) {
      links = {
        api: `/pokemon/abilities?page=${page}`,
        browser: `/home/abilities/${page}`,
      };
    } else if (path.includes(`/home/groups`)) {
      links = {
        api: `/pokemon/groups?page=${page}`,
        browser: `/home/groups/${page}`,
      };
    } else {
      links = { api: `/pokemon?page=${page}`, browser: `/home/${page}` };
    }

    this.loadUserData(this.constructURL(links.api));
    this.props.history.push(links.browser);
  }

  render() {
    return (
      <div className="App">
        <Navigation
          loadUserData={this.loadUserData}
          last={this.state.meta.last_page}
        />
        <ReactCSSTransitionGroup
          transitionName="AppearTransition"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
        >
          {this.getDisplay()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Home;
