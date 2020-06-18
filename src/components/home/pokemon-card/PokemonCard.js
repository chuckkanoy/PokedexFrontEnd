import React, { Component } from "react";
import Type from "../../type/Type.js";
import "./PokemonCard.css";
import { Link } from "react-router-dom";

class PokemonCard extends Component {
  render() {
    const {
      pokemon,
      pokemon: { id, name, image, types },
    } = this.props;

    return (
      <div className="pokemonCard">
        <Link
          to={{
            pathname: `/pokemon/${id}`,
            state: {
              pokemon: pokemon,
              user: this.props.user,
            },
          }}
          onClick={() => {
            localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <label>{name}</label>
          <hr />
          <img src={image} alt="pokemon" />
        </Link>
        <br />
        <div className="typeBar">
          <Type types={types} />
        </div>
      </div>
    );
  }
}

export default PokemonCard;
