import React, { Component } from "react";
import { uuid } from "uuidv4";
import Type from "../../../type/Type.js";
import "./DetailHeader.css";
import PropTypes from "prop-types";
import { MobileContext } from "../../../../mobile-context.js";

class DetailHeader extends Component {
  state = {
    pokemon: this.props.pokemon,
  };
  getDisplay = (pokemon) => {
    const isMobile = this.context;
    let element = (
      <div className={"typeDetail"}>
        {pokemon.types.map((type) => (
          <Type type={type} key={uuid()} modifier={""} />
        ))}
        <label style={{ fontSize: "32pt" }}>
          <label>
            <strong>{pokemon.name}</strong>
          </label>
          <label className="pokemonNumber">&emsp; #{pokemon.id}</label>
        </label>
      </div>
    );
    if (isMobile) {
      element = (
        <div className="typeDetailMobile">
          {pokemon.types.map((type) => (
            <Type type={type} key={uuid()} modifier={"Mobile"} />
          ))}
        </div>
      );
    }

    return element;
  };
  render() {
    const pokemon = this.state.pokemon;

    return this.getDisplay(pokemon);
  }
}

DetailHeader.contextType = MobileContext;

DetailHeader.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default DetailHeader;
