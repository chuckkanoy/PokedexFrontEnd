import React, { Component } from "react";
import DetailHeader from "./detail-header/DetailHeader.js";
import MiddleContainer from "./middle-container/MiddleContainer.js";
import InfoBox from "./info-box/InfoBox.js";
import Profile from "./profile/Profile";
import CaptureBar from "./capture-bar/CaptureBar.js";
import "./DetailCard.css";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class DetailCard extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <ReactCSSTransitionGroup
        transitionName="FadeInTransition"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="pokemonDetailCardMobile">
          <DetailHeader pokemon={pokemon} />
          <hr />
          <MiddleContainer
            pokemon={pokemon}
            getPokemonColor={this.props.getPokemonColor}
          />
          <InfoBox pokemon={pokemon} />
          <Profile pokemon={pokemon} />
          <CaptureBar />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

DetailCard.propTypes = {
  getPokemonColor: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
};

export default DetailCard;
