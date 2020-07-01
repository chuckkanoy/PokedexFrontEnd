import React, { Component } from "react";
import Type from "../../type/Type.js";
import "./PokemonCard.css";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { MobileContext } from "../../../mobile-context.js";

class PokemonCard extends Component {
  render() {
    const { pokemon } = this.props;

    const { id, name, image, types } = pokemon;

    const isMobile = this.context;
    let modifier = "";
    if (isMobile) {
      modifier = "Mobile";
    } else {
      modifier = "";
    }

    return (
      <div className={"pokemonCard" + modifier}>
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
          <label className={"nameLabel" + modifier}>{name}</label>
          <hr />
          <img src={image} alt="pokemon" />
        </Link>
        <br />
        {types.map((type) => (
          <Type type={type} key={uuid()} modifier={modifier} />
        ))}
      </div>
    );
  }
}

PokemonCard.contextType = MobileContext;

export default PokemonCard;
