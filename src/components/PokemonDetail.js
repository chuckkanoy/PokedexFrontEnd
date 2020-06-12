import React, { Component } from "react";
import Type from "./Type.js";
import axios from "axios";
import Graph from "./Graph.js";
import "./PokemonDetail.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import colorThief from "colorthief";

const ColorThief = require("colorthief");

class PokemonDetail extends Component {
  //initialize state, constant, and methods
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
    this.state = {
      pokemon: [],
    };

    const count = 0;

    this.handleBack = this.handleBack.bind(this);
    this.getStatChart = this.getStatChart.bind(this);
    this.getCaptureButton = this.getCaptureButton.bind(this);
    this.capturePokemon = this.capturePokemon.bind(this);
  }

  //callback function for returning to pagination
  handleBack() {
    this.props.handleBack(false);
  }

  getCaptureButton() {
    if (this.props.user.data) {
      return <button onClick={this.capturePokemon}>Capture</button>;
    }
  }

  //render the view of the details page
  render() {
    let captured = "Capture";
    // ColorThief.getColor(this.state.pokemon.image)
    //   .then((color) => {
    //     console.log(color);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (this.state.pokemon.types === undefined) {
      //workaround for fraction of a second load
      return <h1 className="pokemonDetailHeader">Loading...</h1>;
    } else {
      //store the necessary data
      this.getStatChart();

      //display the actual data once loaded
      return (
        <div className="detailWrapper">
          {/* back button for returning to pagination */}
          <span className="backButton" onClick={this.props.history.goBack}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </span>
          <h1 className="pokemonDetailHeader">{this.state.pokemon.name}</h1>
          {/* actual detail card data */}
          <div className="pokemonDetailCard">
            <div className="detailHeader">
              <Type types={this.state.pokemon.types} />
              <label>
                <strong>{this.state.pokemon.name}</strong>
              </label>
              <label className="pokemonNumber">
                &emsp; #{this.state.pokemon.id}
              </label>
            </div>
            <hr />
            {/* container holding pokemon image and statistics */}
            <div className="middleContainer">
              <div className="pokemonImage">
                <img
                  // crossOrigin={"anonymous"}
                  ref={this.imgRef}
                  src={this.state.pokemon.image}
                  alt="pokemon"
                  // onLoad={() => {
                  //   const colorThief = new ColorThief();
                  //   const img = this.imgRef.current;
                  //   const result = colorThief.getColor(img, 25);
                  //   console.log(result);
                  // }}
                />
              </div>
              {/* display statistics */}
              <div className="statBox">
                <Graph
                  style={{ "vertical-align": "middle" }}
                  stats={this.state.pokemon.stats}
                />
              </div>
            </div>
            <br />
            <div className="infoBox">
              <strong>{this.state.pokemon.genus}</strong>
              <br />
              {this.state.pokemon.description}
              <br />
            </div>
            <div className="profile">
              <p className="profileHeader">&emsp;Profile</p>
              Height: &emsp;&emsp;&emsp;
              {this.state.pokemon.height}
              <br />
              Weight:&emsp;&emsp;&emsp;
              {this.state.pokemon.weight}
              <br />
              Abilities:&emsp;&emsp;&nbsp;&nbsp;
              {/* {this.state.pokemon.abilities.map((ability) => `${ability},`)} */}
              {this.state.pokemon.abilities.map((ability) => {
                return (
                  <Link
                    to={`/home/abilities/${ability}`}
                    className="attributeLink"
                  >
                    {ability}&emsp;
                  </Link>
                );
              })}
              <br />
              Egg groups:&emsp;
              {this.state.pokemon.egg_groups.map((group) => {
                return (
                  <Link to={`/home/groups/${group}`} className="attributeLink">
                    {group}&emsp;
                  </Link>
                );
              })}
            </div>
            <br />
            <div className="captureBar">{this.getCaptureButton()}</div>
          </div>
        </div>
      );
    }
  }

  capturePokemon(captured) {
    console.log(this.props.user.data.api_token);
    axios
      .post(
        API_BASE_URL + `/pokemon/capture/${this.props.match.params.id}`,
        { key: "value" },
        {
          headers: {
            Authorization: `Bearer ${this.props.user.data.api_token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        captured = "Captured";
      });
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
      API_BASE_URL + `/pokemon/${this.props.match.params.id}`
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
