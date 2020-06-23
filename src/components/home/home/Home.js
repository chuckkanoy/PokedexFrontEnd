import React, { Component } from "react";
import Header from "./navigation/Navigation";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { loadUserData } from "../../../API";
import Attribute from "../attribute/Attribute";

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
    this.checkConditions();
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
      element = (
        <div className="pokemonCardHolder">
          {this.state.data.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              updateView={this.updateView}
              user={this.props.user}
            />
          ))}
        </div>
      );
    }

    return element;
  };

  loadUserData = async (link) => {
    const result = await loadUserData(link).catch((error) => {
      console.log(error);
      if (error.response.status === 500) {
        this.props.history.push(`/home`);
      }
    });

    if (result && this._isMounted) {
      this.setState(result);
    }
  };

  constructURL(path) {
    return API_BASE_URL + path;
  }

  checkConditions() {
    const name = this.props.match.params.name;
    const type = this.props.match.params.type;
    const ability = this.props.match.params.ability;
    const group = this.props.match.params.group;
    const path = this.props.location.pathname;
    const page = this.props.match.params.page;
    let link = ``;

    if (name) {
      link = `/pokemon?name=${name}&page=${page}`;
    } else if (type) {
      link = `/pokemon/types/${type}?type=${type}&page=${page}`;
    } else if (ability) {
      link = `/pokemon/abilities/${ability}?ability=${ability}&page=${page}`;
    } else if (group) {
      link = `/pokemon/groups/${group}?group=${group}&page=${page}`;
    } else if (path.includes(`/captured`)) {
      link = `/pokemon/captured?page=${page}`;
    } else if (path === `/home/types/${page}`) {
      link = `/pokemon/types?page=${page}`;
    } else if (path === `/home/abilities/${page}`) {
      link = `/pokemon/abilities?page=${page}`;
    } else if (path === `/home/groups/${page}`) {
      link = `/pokemon/groups?page=${page}`;
    } else {
      link = `/pokemon?page=${page}`;
    }

    this.loadUserData(this.constructURL(link));
  }

  render() {
    return (
      <div className="App">
        <Header
          loadUserData={this.loadUserData}
          last={this.state.meta.last_page}
        />

        {this.getDisplay()}
      </div>
    );
  }
}

export default Home;
