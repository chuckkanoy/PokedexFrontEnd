import React, { Component } from "react";
import Type from "./Type.js";

class PokemonCard extends Component {
  constructor(props) {
    super(props);

    this.sendData = this.sendData.bind(this);
  }

  sendData() {
    this.props.updateView(this.props.pokemon);
  }

  render() {
    return (
      <a href="#" onClick={this.sendData}>
        <div className="pokemonCard">
          <label>{this.props.pokemon.name}</label>
          <hr />
          <img src={this.props.pokemon.image} alt="pokemon" />
          <br />
          <div className="typeBar">
            <Type types={this.props.pokemon.types} />
          </div>
        </div>
      </a>
    );
  }
}

export default PokemonCard;
