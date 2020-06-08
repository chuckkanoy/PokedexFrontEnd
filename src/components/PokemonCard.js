import React, { Component } from "react";
import Type from "./Type.js";
import "./PokemonCard.css";

class PokemonCard extends Component {
  //initialize method
  constructor(props) {
    super(props);

    this.sendData = this.sendData.bind(this);
  }

  //function for pokemon card component
  sendData() {
    this.props.updateView(this.props.pokemon);
  }

  //render the view of the pokemon cards
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
