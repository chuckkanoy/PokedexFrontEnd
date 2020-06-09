import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard.js";
import axios from "axios";
import PokemonDetail from "./components/PokemonDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
  // //initialize state, constants, and methods
  // constructor(props) {
  //   super(props);
  //   const pokemon = null;
  //   this.state = {
  //     data: [],
  //     meta: [],
  //     links: [],
  //     pokemonDetailFlag: false,
  //     pokemon: null,
  //     current_page: 1,
  //     name: "",
  //     searchingName: false,
  //   };
  //   this.updateView = this.updateView.bind(this);
  // }

  // //get initial page of pokemon
  // componentDidMount() {
  //   this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  // }
  // //update the current paginated data
  // onPageChanged = (newData) => {
  //   const { current_page, pageLimit } = newData;

  //   //get new response data for current query
  //   axios
  //     .get(
  //       "https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" +
  //         current_page +
  //         "&limit=" +
  //         pageLimit
  //     )
  //     .then((response) => {
  //       const currentPokemon = response.data.data;
  //       this.setState({ data: response.data.data, current_page: current_page });
  //     });
  // };

  // //callback to change data
  // updatePageData = (newData) => {
  //   const { current_page, totalPages } = newData;
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

  // //search pokemon as user types in data
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

  //update the view if pokemon is specified
  updateView = (newPokemon) => {
    this.pokemon = newPokemon;
    this.setState({ pokemonDetailFlag: true });
  };

  //return to appropriate page
  revert = (newValue) => {
    this.setState({ pokemonDetailFlag: newValue });
  };

  //display data
  // render() {
  //   //grab the data from the state
  //   const { data } = this.state;
  //   //const totalPokemon = allPokemon.length;

  //   //if (totalPokemon === 0) return null;
  //   if (!this.state.pokemonDetailFlag) {
  //     return (
  //       <Router>
  //         <div className="App">
  //           <Header
  //             onPageChanged={this.updatePageData}
  //             current_page={this.state.current_page}
  //             searchPokemon={this.searchPokemon}
  //             name={this.state.name}
  //           />
  //           <div>
  //             {data.map((pokemon) => (
  //               <PokemonCard
  //                 key={pokemon.cca3}
  //                 pokemon={pokemon}
  //                 updateView={this.updateView}
  //               />
  //             ))}
  //           </div>
  //         </div>

  //       </Router>
  //     );
  //   } else {
  //     return (
  //       <Router>
  //         <div className="App">
  //           <div>
  //             <PokemonDetail
  //               pokemon={this.pokemon}
  //               handleBack={this.revert}
  //               className="pokemonDetail"
  //             />
  //           </div>
  //         </div>
  //       </Router>
  //     );
  //   }
  // }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/home/" component={Home} />
        <Route exact path="/home/:page" component={Home} />
        <Route exact path="/pokemon/:id" component={PokemonDetail} />
      </Router>
    );
  }

  //get the pokemon from the api
  // loadUserData(link) {
  //   axios
  //     .get(link)
  //     .then((response) => {
  //       //grab data from link
  //       const newPokemon = response.data.data;
  //       const newPageData = response.data.meta;
  //       const newLinksData = response.data.links;
  //       //create new state object
  //       const newState = Object.assign({}, this.state, {
  //         data: newPokemon,
  //         meta: newPageData,
  //         links: newLinksData,
  //       });

  //       //store new state in components state
  //       this.setState(newState);
  //     })
  //     .catch((error) => console.log(error));
  // }
}

export default App;
