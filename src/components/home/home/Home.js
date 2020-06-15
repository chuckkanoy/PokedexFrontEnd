import React, { Component } from "react";
import Header from "./header/Header";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { withRouter } from "react-router-dom";

class Home extends Component {
  //constructor to initialize state and constants
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      meta: [],
      links: [],
      name: "",
      searchingName: false,
    };

    this.getCaptured = this.getCaptured.bind(this);
  }

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
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    //reload page with parameter data unless it is a name search
    if (
      newProps.location.pathname !==
      `/home/${newProps.match.params.name}/${newProps.match.params.page}`
    ) {
      if (newProps.location.pathname !== this.props.location.pathname) {
        window.location.reload();
      }
    }
  }

  //get initial page of pokemon
  componentDidMount() {
    // check url for name parameter
    if (this.props.match.params.name) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon?name=${this.props.match.params.name}&page=${this.props.match.params.page}`
      );
    }
    // check url for type parameter
    else if (this.props.match.params.type) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/types/${this.props.match.params.type}?type=${this.props.match.params.type}&page=${this.props.match.params.page}`
      );
    }
    // check url for abilitiy parameter
    else if (this.props.match.params.ability) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/abilities/${this.props.match.params.ability}?ability=${this.props.match.params.ability}&page=${this.props.match.params.page}`
      );
    }
    // check url for group parameter
    else if (this.props.match.params.group) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/groups/${this.props.match.params.group}?group=${this.props.match.params.group}&page=${this.props.match.params.page}`
      );
    }
    // check url for captured
    else if (this.props.location.pathname.includes(`/captured`)) {
      this.getCaptured(1);
    }
    // check page
    else if (this.props.match.params) {
      this.loadUserData(
        API_BASE_URL + `/pokemon?page=${this.props.match.params.page}`
      );
    } else {
      this.loadUserData(API_BASE_URL);
    }
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
  searchPokemon = async (e, current) => {
    var link = ``;
    if (e !== "") {
      link = API_BASE_URL + `/pokemon?name=${e}&page=${current}`;
    } else {
      link = API_BASE_URL + `/pokemon?page=${current}`;
    }
    axios
      .get(link)
      .then((response) => {
        //create an array of pokemon
        const newData = response.data.data.map((p) => {
          return {
            id: p.id,
            name: p.name,
            image: p.image,
            types: p.types,
          };
        });
        const newMetaData = response.data.meta;
        const newLinksData = response.data.links;
        //change the state to the new state
        this.setState({
          data: newData,
          meta: newMetaData,
          links: newLinksData,
        });
      })
      .catch((error) => console.log(error));
    //update the name state to what is in input field
    this.setState({ name: e });
    this.props.history.push(`/home/${e}/${current}`);
  };

  //update the current paginated data
  onPageChanged = (newData) => {
    const { current_page } = newData;
    // check url for name parameter
    if (this.props.match.params.name) {
      this.searchPokemon(this.props.match.params.name, current_page);
    }
    // check url for type parameter
    else if (this.props.match.params.type) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/types/${this.props.match.params.type}?type=${this.props.match.params.type}&page=${current_page}`
      );
    }
    // check url for ability parameter
    else if (this.props.match.params.ability) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/abilities/${this.props.match.params.ability}?ability=${this.props.match.params.ability}&page=${current_page}`
      );
    }
    // check url for group parameter
    else if (this.props.match.params.group) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/groups/${this.props.match.params.group}?group=${this.props.match.params.group}&page=${current_page}`
      );
    }
    // check url for captured path
    else if (this.props.location.pathname.includes(`/captured`)) {
      this.getCaptured(current_page);
    } else {
      this.loadUserData(API_BASE_URL + `/pokemon?page=${current_page}`);
    }
    this.setState({ current_page: current_page });
  };

  // send request for captured pokemon
  getCaptured() {
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
  }
}

export default withRouter(Home);
