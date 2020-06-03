import React, { Component } from "react";
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
          {/* TYPES NEEDS MAPPING */}
        </div>
      ))}
    </span>
  );
};
// class PokemonCard extends Component {
//   render() {
//     return (
//       <a href="youtube.com">
//         <span className="pokemonCard">
//           <div>
//             <label>Sample</label>
//             <hr />
//             <img src="" alt="pokemon" />
//             <br />
//             <Type />
//           </div>
//         </span>
//       </a>
//     );
//   }
// }

export default PokemonCard;
