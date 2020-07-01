import React, { Component } from "react";
import Graph from "../../chart/graph/Graph.js";
import "./MiddleContainer.css";
import PropType from "prop-types";
import { MobileContext } from "../../../../mobile-context.js";

class MiddleContainer extends Component {
  getDisplay = (pokemon) => {
    const isMobile = this.context;
    let element = (
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

    if (isMobile) {
      element = (
        <div className="middleContainer">
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

    return element;
  };
  render() {
    const pokemon = this.props.pokemon;
    return this.getDisplay(pokemon);
  }
}

MiddleContainer.contextType = MobileContext;

MiddleContainer.propTypes = {
  pokemon: PropType.object.isRequired,
};

export default MiddleContainer;
