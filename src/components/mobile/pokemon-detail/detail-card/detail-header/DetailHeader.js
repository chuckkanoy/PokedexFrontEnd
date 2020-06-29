import React, { Component } from "react";
import { uuid } from "uuidv4";
import Type from "../../../type/Type.js";
import "./DetailHeader.css";
import PropTypes from "prop-types";

class DetailHeader extends Component {
  state = {
    pokemon: this.props.pokemon,
  };
  render() {
    const pokemon = this.state.pokemon;
    return (
      <div className="typeDetailMobile">
        {pokemon.types.map((type) => (
          <Type type={type} key={uuid()} />
        ))}
      </div>
    );
  }
}

DetailHeader.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default DetailHeader;
