import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./components/PokemonDetail";

class App extends Component {
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
    };
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  }

  onPageChanged = (newData) => {
    // const {data} = this.state.data;
    const { current_page, pageLimit } = newData;

    // const offset = (currentPage - 1) * pageLimit;
    // const currentPokemon = data.slice(offset, offset + pageLimit);

    axios
      .get(
        "https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" +
          current_page +
          "&limit=" +
          pageLimit
      )
      .then((response) => {
        const currentPokemon = response.data.data;
        this.setState({ data: response.data.data, current_page: current_page });
      });
  };

  //callback to change data
  updatePageData = (newData) => {
    const { current_page, totalPages, pageLimit, totalRecords } = newData;
    console.log(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${current_page}&limit=${totalPages}`
    );
    axios
      .get(
        `https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${current_page}&limit=${totalPages}`
      )
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
        //create new state object
        const newState = {
          data: newData,
          meta: newMetaData,
          links: newLinksData,
        };

        //change the state to the new state
        this.setState({
          data: newData,
          meta: newMetaData,
          links: newLinksData,
          current_page: current_page,
        });
      })
      .catch((error) => console.log(error));
  };

  searchPartialPokemon = (e) => {
    this.setState({ name: this.state.name + e });
    axios
      .get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${e}`)
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

        console.log(newData);
        //change the state to the new state
        this.setState({
          data: newData,
          meta: newMetaData,
          links: newLinksData,
          //current_page: current_page,
        });
      })
      .catch((error) => console.log(error));
  };

  searchFullPokemon = (e) => {
    this.setState({ name: "" });
    this.searchPartialPokemon(e);
  };

  updateView = (newPokemon) => {
    this.pokemon = newPokemon;
    this.setState({ pokemonDetailFlag: true });
  };

  revert = (newValue) => {
    console.log(this.state.current_page);
    this.setState({ pokemonDetailFlag: newValue });
  };

  //display data
  render() {
    const { data, meta, links } = this.state;
    //const totalPokemon = allPokemon.length;

    //if (totalPokemon === 0) return null;
    if (!this.state.pokemonDetailFlag) {
      return (
        <div className="App">
          <Header
            onPageChanged={this.updatePageData}
            current_page={this.state.current_page}
            searchPartialPokemon={this.searchPartialPokemon}
            searchFullPokemon={this.searchFullPokemon}
            name={this.state.name}
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
    } else {
      return (
        <div className="App">
          <div>
            <PokemonDetail
              pokemon={this.pokemon}
              handleBack={this.revert}
              className="pokemonDetail"
            />
          </div>
        </div>
      );
    }
  }

  //get the pokemon from the api
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
}

export default App;
