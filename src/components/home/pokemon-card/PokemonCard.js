import React, { Component } from "react";
import Type from "../../type/Type.js";
import "./PokemonCard.css";
import { Link } from "react-router-dom";

class PokemonCard extends Component {
  //render the view of the pokemon cards
  render() {
    return (
      <Link
        to={{
          pathname: `/pokemon/${this.props.pokemon.id}`,
          state: {
            pokemon: this.props.pokemon,
            user: this.props.user,
          },
        }}
      >
        <div className="pokemonCard">
          <label>{this.props.pokemon.name}</label>
          <hr />
          <img src={this.props.pokemon.image} alt="pokemon" />
          <br />
          <div className="typeBar">
            <Type types={this.props.pokemon.types} />
          </div>
        </div>
      </Link>
    );
  }
}

export default PokemonCard;
