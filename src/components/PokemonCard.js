import React from "react";
import Type from "./Type.js";

const PokemonCard = ({ pokemon }) => {
  return (
    <span>
      {pokemon.map((onePokemon) => (
        <div className="pokemonCard">
          <label>{onePokemon.name}</label>
          <hr />
          <img src={onePokemon.image} alt="pokemon" />
          <br />
          <div className="typeBar">
            <Type types={onePokemon.types} />
          </div>
        </div>
      ))}
    </span>
  );
};

export default PokemonCard;
