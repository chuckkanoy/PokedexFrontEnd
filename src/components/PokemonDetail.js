import React, { Component } from "react";
import Type from "./Type.js";
import axios from "axios";

class PokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
    };

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.handleBack(false);
  }

  render() {
    if (this.state.pokemon.types === undefined) {
      return (
        <div className="pokemonCard">
          <label>{this.state.pokemon.name}</label>
          <hr />
          <img src={this.state.pokemon.image} alt="pokemon" />
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <span className="backButton">
            <a href="#" onClick={this.handleBack}>
              <object
                type="image/svg+xml"
                data="arrow_back-24px.svg"
                class="logo"
              >
                Forward
              </object>
            </a>
          </span>
          <h1 className="pokemonDetailHeader">{this.state.pokemon.name}</h1>
          <div className="pokemonDetailCard">
            <Type types={this.state.pokemon.types} />
            <label>{this.state.pokemon.name}</label>
            <hr />
            <div className="middleContainer">
              <img src={this.state.pokemon.image} alt="pokemon" />
              <div className="statBox">
                Height: {this.state.pokemon.height}
                <br />
                Weight: {this.state.pokemon.weight}
                <br />
                {/* FIGURE OUT MAPPING FOR STATS */}
                {/* {this.state.pokemon.stats.map()} */}
                <br />
                Abilities:
                {this.state.pokemon.abilities.map((ability) => (
                  <p>{ability}</p>
                ))}
                Egg groups:
                {this.state.pokemon.egg_groups.map((group) => (
                  <p>{group}</p>
                ))}
              </div>
            </div>
            <br />
            <div className="infoBox">
              Genus:
              {this.state.pokemon.genus}
              <br />
              Description:
              {this.state.pokemon.description}
              <br />
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.loadPokemonData(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${this.props.pokemon.id}`
    );
  }

  //get the pokemon from the api
  loadPokemonData(link) {
    axios
      .get(link)
      .then((response) => {
        //grab link data
        console.log(response.data.data.types);
        this.setState({
          pokemon: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
}

export default PokemonDetail;
