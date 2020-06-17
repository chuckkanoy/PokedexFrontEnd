import React, { Component } from "react";
import Header from "./header/Header";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";

class Home extends Component {
  state = {
    data: [],
    meta: [],
    links: [],
    name: "",
  };

  //visualize the home page
  render() {
    let name = "";
    let current_page = 1;

    //check for params to update
    if (this.props.match) {
      if (this.props.match.params.name) {
        name = this.props.match.params.name;
      } else {
        name = this.state.name;
      }
      current_page = this.props.match.params.page;
    }

    return (
      <div className="App">
        <Header
          onPageChanged={this.onPageChanged}
          current_page={current_page}
          searchPokemon={this.searchPokemon}
          name={name}
          from={this.state.meta.from}
          last={this.state.meta.last_page}
          type={this.props.match.params.type}
          ability={this.props.match.params.ability}
          group={this.props.match.params.group}
          user={this.props.user}
          getCaptured={this.getCaptured}
          logout={this.logout}
        />

        {this.getDisplay()}
      </div>
    );
  }

  //reload page with parameter data unless it is a name search
  componentWillReceiveProps(newProps) {
    if (
      newProps.location.pathname !==
      `/home/${newProps.match.params.name}/${newProps.match.params.page}`
    ) {
      if (newProps.location.pathname !== this.props.location.pathname) {
        window.location.reload();
      }
    }
  }

  getDisplay = () => {
    let path = this.props.location.pathname;
    let page = this.props.match.params.page;
    let element = ``;

    if (path === `/home/types/${page}`) {
      element = (
        <div className="attributeContainer">
          {this.state.data.map((type) => this.displayHelper("types", type))}
        </div>
      );
    } else if (path === `/home/abilities/${page}`) {
      element = (
        <div className="attributeContainer">
          {this.state.data.map((ability) =>
            this.displayHelper("abilities", ability)
          )}
        </div>
      );
    } else if (path === `/home/groups/${page}`) {
      element = (
        <div className="attributeContainer">
          {this.state.data.map((group) => this.displayHelper("groups", group))}
        </div>
      );
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

  displayHelper = (identifier, attribute) => {
    let element = null;
    element = (
      <Link to={`/home/${identifier}/${attribute.name}/1`}>
        <button className={`${identifier}Button`}>{attribute.name}</button>
      </Link>
    );

    return element;
  };

  checkConditions(page) {
    // check url for name parameter
    if (this.props.match.params.name) {
      this.searchPokemon(this.props.match.params.name, page);
    }
    // check url for type parameter
    else if (this.props.match.params.type) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/types/${this.props.match.params.type}?type=${this.props.match.params.type}&page=${page}`
      );
    }
    // check url for ability parameter
    else if (this.props.match.params.ability) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/abilities/${this.props.match.params.ability}?ability=${this.props.match.params.ability}&page=${page}`
      );
    }
    // check url for group parameter
    else if (this.props.match.params.group) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/groups/${this.props.match.params.group}?group=${this.props.match.params.group}&page=${page}`
      );
    }
    // check url for captured path
    else if (this.props.location.pathname.includes(`/captured`)) {
      this.getCaptured(page);
    } else if (this.props.location.pathname === `/home/types/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/types?page=${page}`);
    } else if (this.props.location.pathname === `/home/abilities/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/abilities?page=${page}`);
    } else if (this.props.location.pathname === `/home/groups/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/groups?page=${page}`);
    } else {
      this.loadUserData(API_BASE_URL + `/pokemon?page=${page}`);
    }
  }

  //get initial page of pokemon
  componentDidMount() {
    this.checkConditions(this.props.match.params.page);
  }

  //load in data based on link
  loadUserData(link) {
    axios
      .get(link)
      .then((response) => {
        //grab data from link
        const newPokemon = response.data.data;
        const newPageData = response.data.meta;
        const newLinksData = response.data.links;
        //create new state object
        const newState = Object.assign({}, this.state, {
          data: newPokemon,
          meta: newPageData,
          links: newLinksData,
        });

        //store new state in components state
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }

  //search pokemon as user types in data
  searchPokemon = (e, current) => {
    let link = ``;
    if (e !== "") {
      link = API_BASE_URL + `/pokemon?name=${e}&page=${current}`;
    } else {
      link = API_BASE_URL + `/pokemon?page=${current}`;
    }
    this.loadUserData(link);
    //update the name state to what is in input field
    this.setState({ name: e });
    this.props.history.push(`/home/${e}/${current}`);
  };

  //update the current paginated data
  onPageChanged = (newData) => {
    //const current_page = newData;
    this.checkConditions(newData);
    this.setState({ current_page: newData });
  };

  // send request for captured pokemon
  getCaptured = () => {
    if (this.props.user) {
      axios
        .get(
          API_BASE_URL +
            `/pokemon/captured?page=${this.props.match.params.page}`,
          {
            headers: {
              Authorization: `Bearer ${this.props.user.data.api_token}`,
            },
          }
        )
        .then((response) => {
          //grab data from link
          const newPokemon = response.data.data;
          const newPageData = response.data.meta;
          const newLinksData = response.data.links;
          //create new state object
          const newState = Object.assign({}, this.state, {
            data: newPokemon,
            meta: newPageData,
            links: newLinksData,
          });
          //store new state in components state
          this.setState(newState);
        })
        .catch(console.log);
    }
  };
}

export default withRouter(Home);
