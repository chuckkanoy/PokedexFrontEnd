import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard.js";
import ReactDOM from "react-dom";
import axios from "axios";

// var items = [];
// for (var i = 0; i < 100; i++) {
//   items.push(<PokemonCard />);
// }

class App extends Component {
  //default state object
  state = {
    pokemon: [],
  };

  componentDidMount() {
    axios
      .get("https://intern-pokedex.myriadapps.com/api/v1/pokemon")
      .then((response) => {
        //create an array of pokemon
        const newPokemon = response.data.data.map((p) => {
          return {
            id: p.id,
            name: p.name,
            image: p.image,
            types: p.types,
          };
        });
        //create new state object
        const newState = Object.assign({}, this.state, {
          pokemon: newPokemon,
        });

        //store new state in components state
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <PokemonCard pokemon={this.state.pokemon} />
      </div>
    );
  }
}

// function App() {
//   //get the data from the API
//   axios
//     .get("https://intern-pokedex.myriadapps.com/api/v1/pokemon")
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   //return view
//   return (
//     <div className="App">
//       <Header />
//       <div className="item-container">{items}</div>
//     </div>
//   );
// }

export default App;
