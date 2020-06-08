import React, { Component } from "react";
import Type from "./Type.js";
import axios from "axios";
import BarChart from "react-bar-chart";
import Graph from "./Graph.js";
import "./PokemonDetail.css";

class PokemonDetail extends Component {
  //initialize state, constant, and methods
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
    };

    this.handleBack = this.handleBack.bind(this);
    this.getStatChart = this.getStatChart.bind(this);
  }

  //callback function for returning to pagination
  handleBack() {
    this.props.handleBack(false);
  }

  //render the view of the details page
  render() {
    if (this.state.pokemon.types === undefined) {
      //workaround for fraction of a second load
      return (
        <div className="pokemonCard">
          <label>{this.state.pokemon.name}</label>
          <hr />
          <img src={this.state.pokemon.image} alt="pokemon" />
          <br />
        </div>
      );
    } else {
      //store the necessary data
      this.getStatChart();

      //display the actual data once loaded
      return (
        <div>
          {/* back button for returning to pagination */}
          <span className="backButton">
            <a href="#" onClick={this.handleBack}>
              <object
                type="image/svg+xml"
                data="arrow_back-24px.svg"
                class="logo"
              >
                Back
              </object>
            </a>
          </span>
          <h1 className="pokemonDetailHeader">{this.state.pokemon.name}</h1>
          {/* actual detail card data */}
          <div className="pokemonDetailCard">
            <div className="detailHeader">
              <Type types={this.state.pokemon.types} />
              <label>
                <strong>{this.state.pokemon.name}</strong>
              </label>
              <label>&emsp; #{this.state.pokemon.id}</label>
            </div>
            <hr />
            {/* container holding pokemon image and statistics */}
            <div className="middleContainer">
              <img src={this.state.pokemon.image} alt="pokemon" />
              {/* display statistics */}
              <div className="statBox">
                <Graph
                  style={{ "vertical-align": "middle" }}
                  stats={this.state.pokemon.stats}
                />
              </div>
            </div>
            <div className="infoBox">
              <strong>{this.state.pokemon.genus}</strong>
              <br />
              {this.state.pokemon.description}
              <br />
            </div>
            <div className="profile">
              <p className="profileHeader">&emsp;Profile</p>
              Height: {this.state.pokemon.height}
              <br />
              Weight: {this.state.pokemon.weight}
              <br />
              Abilities:
              {this.state.pokemon.abilities.map((ability) => (
                <p>{ability}</p>
              ))}
              Egg groups:
              {this.state.pokemon.egg_groups.map((group) => (
                <p>{group}</p>
              ))}
            </div>
            <br />
          </div>
        </div>
      );
    }
  }

  getStatChart() {
    //get the maximum stat for ratio
    var max = 0;
    var array = [
      this.state.pokemon.stats["hp"],
      this.state.pokemon.stats["speed"],
      this.state.pokemon.stats["attack"],
      this.state.pokemon.stats["defense"],
      this.state.pokemon.stats["special-attack"],
      this.state.pokemon.stats["special-defense"],
    ];
    array.forEach((element) => {
      if (max < element) max = element;
    });
  }

  //display appropriate pokemon data according to id
  componentDidMount() {
    this.loadPokemonData(
      `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${this.props.pokemon.id}`
    );
  }

  //get the pokemon from the api
  loadPokemonData(link) {
    axios
      .get(link)
      .then((response) => {
        //grab link data
        this.setState({
          pokemon: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
}

export default PokemonDetail;
