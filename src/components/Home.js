import React, { Component } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard.js";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    //default state object
    this.state = {
      pokemon: [],
      pageData: [],
      links: [],
    };
  }

  //callback function to change the page number
  getPageNumber = (childData) => {
    this.setState({
      pageData: {
        current_page: childData,
      },
    });
    console.log(this.state.pageData.current_page);
    this.updateUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
    this.props.getStateChanged(this.state);
  };

  //display data
  render() {
    this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
    return (
      <div className="App">
        <Header
          receivedPageData={this.getPageNumber}
          sentPageData={this.state.pageData}
        />
        <PokemonCard pokemon={this.state.pokemon} />
      </div>
    );
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
          pokemon: newPokemon,
          pageData: newPageData,
          links: newLinksData,
        });

        //store new state in components state
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }

  updateUserData(link) {
    axios
      .get(link)
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
        const newPageData = response.data.meta;
        const newLinksData = response.data.links;
        //create new state object
        const newState = Object.assign({}, this.state, {
          pokemon: newPokemon,
          pageData: newPageData,
          links: newLinksData,
        });

        //store new state in components state
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }
}

export default Home;
