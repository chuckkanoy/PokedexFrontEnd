import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./DetailCardHeader.css";
import PropTypes from "prop-types";
import { MobileContext } from "../../../mobile-context";

class DetailCardLabel extends Component {
  getDisplay = () => {
    const isMobile = this.context;
    let element = (
      <div className="pokemonDetailHeader">
        <i
          className="fas fa-arrow-left"
          onClick={() => {
            this.props.history.goBack();
            localStorage.removeItem("currentPokemon");
          }}
        ></i>
        {this.props.pokemon.name}
      </div>
    );

    if (isMobile) {
      element = (
        <div className="pokemonDetailHeaderMobile">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              this.props.history.goBack();
              localStorage.removeItem("currentPokemon");
            }}
          ></i>
          <label>
            {this.props.pokemon.name}
            &nbsp; #{this.props.pokemon.id}
          </label>
          <div className="pokemonImageMobile">
            <img
              ref={this.imgRef}
              src={this.props.pokemon.image}
              alt="pokemon"
            />
          </div>
        </div>
      );
    }

    return element;
  };
  render() {
    return this.getDisplay();
  }
}

DetailCardLabel.contextType = MobileContext;

DetailCardLabel.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default withRouter(DetailCardLabel);
