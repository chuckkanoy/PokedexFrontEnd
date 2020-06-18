import React, { Component } from "react";
import Header from "./navigation/Navigation";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { Link } from "react-router-dom";
import { API_Access } from "../../../API";

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

  //reload page with parameter data unless it is a name search
  componentWillReceiveProps(newProps) {
    const path = newProps.location.pathname;
    const { name } = newProps.match.params;

    if (path !== `/home/${name}/${this.state.page}`) {
      if (newProps.location.pathname !== this.state.path) {
        window.location.reload();
      }
    }
  }

  getDisplay = () => {
    let path = this.state.path;
    let page = this.state.page;
    let element = ``;

    if (path === `/home/types/${page}`) {
      element = this.getAttribute("types");
    } else if (path === `/home/abilities/${page}`) {
      element = this.getAttribute("abilities");
    } else if (path === `/home/groups/${page}`) {
      element = this.getAttribute("groups");
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

  getAttribute(label) {
    return (
      <div className="attributeContainer">
        {this.state.data.map((attribute) =>
          this.displayHelper(label, attribute)
        )}
      </div>
    );
  }

  displayHelper = (identifier, attribute) => {
    return (
      <Link to={`/home/${identifier}/${attribute.name}/1`}>
        <button className={`${identifier}Button`}>{attribute.name}</button>
      </Link>
    );
  };

  checkConditions(page) {
    // check url for name parameter
    if (this.state.name) {
      this.loadUserData(
        this.constructURL(`/pokemon?name=${this.state.name}&page=${page}`)
      );
    }
    // check url for type parameter
    else if (this.state.type) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/types/${this.state.type}?type=${this.state.type}&page=${page}`
        )
      );
    }
    // check url for ability parameter
    else if (this.state.ability) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/abilities/${this.state.ability}?ability=${this.state.ability}&page=${page}`
        )
      );
    }
    // check url for group parameter
    else if (this.state.group) {
      this.loadUserData(
        this.constructURL(
          `/pokemon/groups/${this.state.group}?group=${this.state.group}&page=${page}`
        )
      );
    }
    // check url for captured path
    else if (this.state.path.includes(`/captured`)) {
      this.getCaptured(page);
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

  constructURL(path) {
    return API_BASE_URL + path;
  }

  //get initial page of pokemon
  componentDidMount() {
    this.checkConditions(this.state.page);
  }

  //load in data based on link
  loadUserData = async (link) => {
    const result = await API_Access.loadUserData(link);

    if (result) {
      this.setState(result);
    }
  };

  //update the current paginated data
  onPageChanged = (newData) => {
    this.checkConditions(newData);
    this.setState({ current_page: newData });
  };

  // send request for captured pokemon
  getCaptured = async () => {
    let result = null;

    if (this.props.user) {
      result = await API_Access.getCaptured(
        this.props.match.params.page,
        this.props.user.data.api_token
      );
    }
    if (result) {
      this.setState(result);
    }
  };

  //visualize the home page
  render() {
    let name = "";

    //check for params to update
    if (this.props.match.params.name) {
      name = this.props.match.params.name;
    } else {
      name = this.state.name;
    }

    return (
      <div className="App">
        <Header
          // searchPokemon={this.searchPokemon}
          loadUserData={this.loadUserData}
          current_page={this.state.page}
          name={name}
          last={this.state.meta.last_page}
          type={this.props.match.params.type}
          ability={this.props.match.params.ability}
          group={this.props.match.params.group}
          user={this.props.user}
        />

        {this.getDisplay()}
      </div>
    );
  }
}

export default Home;
