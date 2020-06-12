import React, { Component } from "react";
import Type from "./Type.js";
import "./PokemonCard.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
