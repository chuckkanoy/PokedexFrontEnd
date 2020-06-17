import React, { Component } from "react";
import Type from "../../attributes/type/Type.js";
import "./PokemonCard.css";
import { Link } from "react-router-dom";

class PokemonCard extends Component {
  //render the view of the pokemon cards
  render() {
    return (
      <div className="pokemonCard">
        <Link
          to={{
            pathname: `/pokemon/${this.props.pokemon.id}`,
            state: {
              pokemon: this.props.pokemon,
              user: this.props.user,
            },
          }}
          onClick={() => {
            localStorage.setItem(
              "currentPokemon",
              JSON.stringify(this.props.pokemon)
            );
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <label>{this.props.pokemon.name}</label>
          <hr />
          <img src={this.props.pokemon.image} alt="pokemon" />
        </Link>
        <br />
        <div className="typeBar">
          <Type types={this.props.pokemon.types} />
        </div>
      </div>
    );
  }
}

export default PokemonCard;
