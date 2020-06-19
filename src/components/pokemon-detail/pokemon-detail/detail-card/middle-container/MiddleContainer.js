import React, { Component } from "react";
import Graph from "../../chart/graph/Graph.js";
import "./MiddleContainer.css";

class MiddleContainer extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="middleContainer">
        <div className="pokemonImage">
          <img
            // crossOrigin={"anonymous"}
            ref={this.imgRef}
            src={pokemon.image}
            alt="pokemon"
          />
        </div>
        {/* display statistics */}
        <div className="statBox">
          <Graph
            pokemon={pokemon}
            getPokemonColor={this.props.getPokemonColor}
          />
        </div>
      </div>
    );
  }
}

export default MiddleContainer;
