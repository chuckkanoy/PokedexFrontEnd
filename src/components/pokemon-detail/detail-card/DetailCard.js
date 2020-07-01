import React, { Component } from "react";
import DetailHeader from "./detail-header/DetailHeader.js";
import MiddleContainer from "./middle-container/MiddleContainer.js";
import InfoBox from "./info-box/InfoBox.js";
import Profile from "./profile/Profile";
import CaptureBar from "./capture-bar/CaptureBar.js";
import "./DetailCard.css";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { MobileContext } from "../../../mobile-context.js";

class DetailCard extends Component {
  render() {
    const pokemon = this.props.pokemon;

    const isMobile = this.context;
    let modifier = "";

    if (isMobile) {
      modifier = "Mobile";
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="FadeInTransition"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className={"pokemonDetailCard" + modifier}>
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
      </ReactCSSTransitionGroup>
    );
  }
}

DetailCard.contextType = MobileContext;

DetailCard.propTypes = {
  getPokemonColor: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
};

export default DetailCard;
