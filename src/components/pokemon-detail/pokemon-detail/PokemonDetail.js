import React, { Component } from "react";
import "./PokemonDetail.css";
import { API_BASE_URL } from "../../../config.js";
import UserButton from "../../home/home/navigation/menu/Menu.js";
import { get } from "../../../API.js";
import DetailCard from "./detail-card/DetailCard.js";
import DetailCardLabel from "./detail-card-label/DetailCardHeader";

class PokemonDetail extends Component {
  state = {
    pokemon: [],
    captureMessage: "",
  };

  getPokemonColor = () => {
    if (localStorage.getItem("currentPokemon")) {
      let types = ``;

      try {
        types = JSON.parse(localStorage.getItem("currentPokemon")).types;
      } catch {
        console.log("Type not found in local storage");
      }

      switch (types[types.length - 1]) {
        case "poison":
          return "rgb(198, 150, 247)";
        case "grass":
          return "rgb(107, 180, 107)";
        case "fire":
          return "rgb(233, 78, 78)";
        case "flying":
          return "rgb(241, 241, 241)";
        case "water":
          return "rgb(148, 148, 255)";
        case "bug":
          return "rgb(172, 172, 255)";
        case "normal":
          return "rgb(196, 162, 162)";
        case "electric":
          return "rgb(231, 222, 88)";
        case "ground":
          return "rgb(173, 44, 44)";
        case "fairy":
          return "rgb(255, 167, 255)";
        case "fighting":
          return "rgb(255, 185, 100)";
        case "psychic":
          return "rebeccapurple";
        case "rock":
          return "rgb(75, 75, 75)";
        case "steel":
          return "rgb(202, 200, 200)";
        case "ice":
          return "rgb(0, 190, 190)";
        case "ghost":
          return "gray";
        case "dragon":
          return "rgb(252, 164, 132)";
        case "dark":
          return "rgb(87, 73, 73)";
        default:
          return "rgb(87, 73, 73)";
      }
    }
  };

  loadPokemonData = async (link) => {
    const result = await get(link).catch(console.log);

    if (result) {
      this.setState({ pokemon: result.data.data });
    }
  };

  // display appropriate pokemon data according to id
  componentDidMount() {
    this.loadPokemonData(
      API_BASE_URL + `/pokemon/${this.props.match.params.id}`
    );
  }

  render() {
    return !this.state.pokemon.types ? (
      <div>
        <UserButton />
        <h1 className="pokemonDetailHeader">Loading...</h1>
      </div>
    ) : (
      <div
        className="detailWrapper"
        style={{
          backgroundColor: this.getPokemonColor(),
          height: "100vh",
        }}
      >
        <UserButton />
        <DetailCardLabel pokemon={this.state.pokemon} />
        <DetailCard
          pokemon={this.state.pokemon}
          getPokemonColor={this.getPokemonColor}
        />
      </div>
    );
  }
}

export default PokemonDetail;
