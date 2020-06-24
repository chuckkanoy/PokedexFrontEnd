import React, { Component } from "react";
import "./InfoBox.css";
import PropTypes from "prop-types";

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

InfoBox.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default InfoBox;
