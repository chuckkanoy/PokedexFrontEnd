import React, { Component } from "react";
import DetailHeader from "./detail-header/DetailHeader.js";
import MiddleContainer from "./middle-container/MiddleContainer.js";
import InfoBox from "./info-box/InfoBox.js";
import Profile from "./profile/Profile";
import CaptureBar from "./capture-bar/CaptureBar.js";
import "./DetailCard.css";
import PropTypes from "prop-types";

class DetailCard extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="pokemonDetailCardMobile">
        <DetailHeader pokemon={pokemon} />
        <hr />
        <MiddleContainer
          pokemon={pokemon}
          getPokemonColor={this.props.getPokemonColor}
        />
        <InfoBox pokemon={pokemon} />
        <Profile
          pokemon={pokemon}
          getPokemonColor={this.props.getPokemonColor}
        />
        <CaptureBar />
      </div>
    );
  }
}

DetailCard.propTypes = {
  getPokemonColor: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
};

export default DetailCard;
