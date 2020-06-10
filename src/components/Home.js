import React, { Component } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import { browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const root = `https://intern-pokedex.myriadapps.com/api/v1/pokemon`;

class Home extends Component {
  constructor(props) {
    super(props);
    const pokemon = null;
    this.state = {
      data: [],
      meta: [],
      links: [],
      pokemonDetailFlag: false,
      pokemon: null,
      current_page: 1,
      pageLimit: 37,
      name: "",
      searchingName: false,
    };
  }

  //search pokemon as user types in data
  searchPokemon = async (e, current) => {
    var link = ``;
    if (this.props.match.params.name !== "") {
      link = root + `?name=${e}&page=${current}`;
    } else {
      link = root + `?page=${current}`;
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
          //current_page: current_page,
        });
      })
      .catch((error) => console.log(error));
    //update the name state to what is in input field
    this.setState({ name: e });
    console.log(this.state.meta);
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <Header
          onPageChanged={this.onPageChanged}
          current_page={this.state.current_page}
          searchPokemon={this.searchPokemon}
          name={this.state.name}
          from={this.state.meta.from}
          last={this.state.meta.last_page}
        />

        <div>
          {data.map((pokemon) => (
            <PokemonCard
              key={pokemon.cca3}
              pokemon={pokemon}
              updateView={this.updateView}
            />
          ))}
        </div>
      </div>
    );
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

  //get initial page of pokemon
  componentDidMount() {
    if (this.props.match.params.name) {
      this.loadUserData(
        root +
          `?name=${this.props.match.params.name}&page=${this.props.match.params.page}`
      );
    } else if (this.props.match.params) {
      this.loadUserData(root + `?page=${this.props.match.params.page}`);
    } else {
      this.loadUserData(root);
    }
  }
  //update the current paginated data
  onPageChanged = (newData) => {
    const { current_page, pageLimit } = newData;
    console.log(current_page);
    if (this.props.match.params.name) {
      this.searchPokemon(this.props.match.params.name, current_page);
    } else {
      this.loadUserData(root + `?page=${current_page}`);
    }
    this.setState({ current_page: current_page });
  };
}

export default Home;
