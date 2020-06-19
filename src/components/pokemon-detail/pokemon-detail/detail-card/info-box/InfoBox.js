import React, { Component } from "react";
import "./InfoBox.css";

class InfoBox extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="infoBox">
        <strong>{pokemon.genus}</strong>
        <br />
        {pokemon.description}
        <br />
      </div>
    );
  }
}

export default InfoBox;
