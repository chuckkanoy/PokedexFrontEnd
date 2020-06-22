import React, { Component } from "react";
import Header from "./navigation/Navigation";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { API_Access } from "../../../API";
import { uuid } from "uuidv4";
import Attribute from "../attribute/Attribute";

class Home extends Component {
  state = {
    data: [],
    meta: [],
    links: [],
    name: this.props.match.params.name,
    type: this.props.match.params.type,
    ability: this.props.match.params.ability,
    group: this.props.match.params.group,
    path: this.props.location.pathname,
    page: this.props.match.params.page,
  };

  componentWillReceiveProps(newProps) {
    const path = newProps.location.pathname;
    const name = newProps.match.params.name;

    if (path !== this.state.path && path !== `/home/${name}/1`) {
      window.location.reload();
    }
  }

  componentDidMount() {
    this.checkConditions(this.state.page);
  }

  getDisplay = () => {
    const path = this.state.path;
    const page = this.state.page;
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
              key={uuid()}
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
    const result = await API_Access.loadUserData(link);

    if (result) {
      this.setState(result);
    }
  };

  constructURL(path) {
    return API_BASE_URL + path;
  }

  checkConditions(page) {
    if (this.state.name) {
      this.loadUserData(
        this.constructURL(`/pokemon?name=${this.state.name}&page=${page}`)
      );
    } else if (this.state.type) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/types/${this.state.type}?type=${this.state.type}&page=${page}`
        )
      );
    } else if (this.state.ability) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/abilities/${this.state.ability}?ability=${this.state.ability}&page=${page}`
        )
      );
    } else if (this.state.group) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/groups/${this.state.group}?group=${this.state.group}&page=${page}`
        )
      );
    } else if (this.state.path.includes(`/captured`)) {
      this.loadUserData(this.constructURL(`/pokemon/captured?page=${page}`));
    } else if (this.state.path === `/home/types/${page}`) {
      this.loadUserData(this.constructURL(`/pokemon/types?page=${page}`));
    } else if (this.state.path === `/home/abilities/${page}`) {
      this.loadUserData(this.constructURL(`/pokemon/abilities?page=${page}`));
    } else if (this.state.path === `/home/groups/${page}`) {
      this.loadUserData(this.constructURL(`/pokemon/groups?page=${page}`));
    } else {
      this.loadUserData(this.constructURL(`/pokemon?page=${page}`));
    }
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
