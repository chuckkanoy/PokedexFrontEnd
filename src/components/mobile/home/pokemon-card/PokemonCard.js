import React, { Component } from "react";
import Type from "../../type/Type.js";
import "./PokemonCard.css";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";

class PokemonCard extends Component {
  render() {
    const { pokemon } = this.props;

    const { id, name, image, types } = pokemon;

    return (
      <div className="pokemonCardMobile">
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
          <label className="nameLabelMobile">{name}</label>
          <hr />
          <img src={image} alt="pokemon" />
        </Link>
        <br />
        {types.map((type) => (
          <Type type={type} key={uuid()} />
        ))}
      </div>
    );
  }
}

export default PokemonCard;
