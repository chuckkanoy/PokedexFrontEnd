import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./DetailCardHeader.css";
import PropTypes from "prop-types";

class DetailCardLabel extends Component {
  render() {
    return (
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
  }
}

DetailCardLabel.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default withRouter(DetailCardLabel);
