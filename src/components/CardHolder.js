import React, { Component } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CardHolder extends Component {
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
      name: "",
      searchingName: false,
    };
    // this.updateView = this.updateView.bind(this);
  }

  //search pokemon as user types in data
  // searchPokemon = async (e) => {
  //   axios
  //     .get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${e}`)
  //     .then((response) => {
  //       //create an array of pokemon
  //       const newData = response.data.data.map((p) => {
  //         return {
  //           id: p.id,
  //           name: p.name,
  //           image: p.image,
  //           types: p.types,
  //         };
  //       });
  //       const newMetaData = response.data.meta;
  //       const newLinksData = response.data.links;
  //       //change the state to the new state
  //       this.setState({
  //         data: newData,
  //         meta: newMetaData,
  //         links: newLinksData,
  //         //current_page: current_page,
  //       });
  //     })
  //     .catch((error) => console.log(error));

  //   //update the name state to what is in input field
  //   this.setState({ name: e });
  // };

  render() {
    const { data } = this.state;
    return (
      <div>
        {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.cca3}
            pokemon={pokemon}
            updateView={this.updateView}
          />
        ))}
      </div>
    );
  }

  loadUserData(link) {
    console.log(link);
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

  // //callback to change data
  // updatePageData = (newData) => {
  //   const { current_page, totalPages } = newData;
  //   console.log(this.props);
  //   var link = `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${current_page}`;

  //   if (this.state.name !== "") {
  //     link = `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${this.state.name}&page=${current_page}`;
  //   }

  //   //update query to new page
  //   axios
  //     .get(link)
  //     .then((response) => {
  //       //create an array of pokemon
  //       const newData = response.data.data.map((p) => {
  //         return {
  //           id: p.id,
  //           name: p.name,
  //           image: p.image,
  //           types: p.types,
  //         };
  //       });
  //       const newMetaData = response.data.meta;
  //       const newLinksData = response.data.links;
  //       //create new state object
  //       const newState = {
  //         data: newData,
  //         meta: newMetaData,
  //         links: newLinksData,
  //       };

  //       //change the state to the new state
  //       this.setState({
  //         data: newData,
  //         meta: newMetaData,
  //         links: newLinksData,
  //         current_page: current_page,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // };

  //initialize state, constants, and methods

  //get initial page of pokemon
  componentDidMount() {
    console.log(this.props);
    if (this.props.match !== undefined) {
      this.loadUserData(
        `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${this.props.match.params.page}`
        // `{https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${this.props.params.page}}`
      );
    } else {
      this.loadUserData(
        `https://intern-pokedex.myriadapps.com/api/v1/pokemon`
        // `{https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${this.props.params.page}}`
      );
    }
  }
  //update the current paginated data
  //   onPageChanged = (newData) => {
  //     const { current_page, pageLimit } = newData;

  //     //get new response data for current query
  //     axios
  //       .get(
  //         "https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" +
  //           current_page +
  //           "&limit=" +
  //           pageLimit
  //       )
  //       .then((response) => {
  //         const currentPokemon = response.data.data;
  //         this.setState({ data: response.data.data, current_page: current_page });
  //       });
  //   };
  // }
}

export default CardHolder;
