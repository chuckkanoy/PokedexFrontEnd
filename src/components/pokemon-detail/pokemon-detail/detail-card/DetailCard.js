import React, { Component } from "react";
import DetailHeader from "./detail-header/DetailHeader.js";
import MiddleContainer from "./middle-container/MiddleContainer.js";
import InfoBox from "./info-box/InfoBox.js";
import Profile from "./profile/Profile";
import CaptureBar from "./capture-bar/CaptureBar.js";
import "./DetailCard.css";

class DetailCard extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="pokemonDetailCard">
        <DetailHeader pokemon={pokemon} />
        <hr />
        <MiddleContainer
          pokemon={pokemon}
          getPokemonColor={this.props.getPokemonColor}
        />
        <InfoBox pokemon={pokemon} />
        <Profile pokemon={pokemon} />
        <CaptureBar user={this.props.user} />
      </div>
    );
  }
}

export default DetailCard;
