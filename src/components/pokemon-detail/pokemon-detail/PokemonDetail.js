import React, { Component } from "react";
import Type from "../../type/Type.js";
import axios from "axios";
import Graph from "./chart/graph/Graph.js";
import "./PokemonDetail.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config.js";
import { uuid } from "uuidv4";
import UserButton from "../../user/UserButton.js";

class PokemonDetail extends Component {
  //initialize state, constant, and methods
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
    this.state = {
      pokemon: [],
      captureMessage: "",
    };

    this.getCaptureButton = this.getCaptureButton.bind(this);
    this.capturePokemon = this.capturePokemon.bind(this);
  }

  //render the view of the details page
  render() {
    if (this.state.pokemon.types === undefined) {
      //workaround for fraction of a second load
      return (
        <div>
          <UserButton user={this.props.user} />
          <h1 className="pokemonDetailHeader">Loading...</h1>
        </div>
      );
    } else {
      //display the actual data once loaded
      return (
        <div
          className="detailWrapper"
          style={{ "background-color": this.getPokemonColor() }}
        >
          <UserButton user={this.props.user} />
          {/* back button for returning to pagination */}
          <div className="pokemonDetailHeader">
            <i
              class="fas fa-arrow-left"
              onClick={() => {
                this.props.history.goBack();
                localStorage.removeItem("currentPokemon");
              }}
            ></i>
            {this.state.pokemon.name}
          </div>
          {/* actual detail card data */}
          <div className="pokemonDetailCard">
            {/* header */}
            <div className="detailHeader">
              <Type types={this.state.pokemon.types} />
              <text style={{ "font-size": "32pt" }}>
                <label>
                  <strong>{this.state.pokemon.name}</strong>
                </label>
                <label className="pokemonNumber">
                  &emsp; #{this.state.pokemon.id}
                </label>
              </text>
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
            {/* profile data */}
            <div className="infoBox">
              <strong>{this.state.pokemon.genus}</strong>
              <br />
              {this.state.pokemon.description}
              <br />
            </div>
            <p className="profileHeader">&emsp;Profile</p>
            <div className="profile">
              <text style={{ "font-weight": "bold" }}>
                Height:&emsp;&emsp;&emsp;&nbsp;
              </text>
              {this.state.pokemon.height}
              <br />
              <br />
              <text style={{ "font-weight": "bold" }}>
                Weight:&emsp;&emsp;&emsp;
              </text>
              {this.state.pokemon.weight}
              <br />
              <br />
              <text style={{ "font-weight": "bold" }}>
                Abilities:&emsp;&emsp;&nbsp;&nbsp;
              </text>
              {this.state.pokemon.abilities.map((ability) => {
                return (
                  <Link
                    to={`/home/abilities/${ability}`}
                    className="attributeLink"
                    key={uuid()}
                  >
                    {ability}&emsp;
                  </Link>
                );
              })}
              <br />
              <br />
              <text style={{ "font-weight": "bold" }}>Egg groups:&emsp;</text>
              {this.state.pokemon.egg_groups.map((group) => {
                return (
                  <Link
                    to={`/home/groups/${group}`}
                    className="attributeLink"
                    key={uuid()}
                  >
                    {group}&emsp;
                  </Link>
                );
              })}
            </div>
            <br />
            {/* option for logged in users to capture pokemon */}
            <div className="captureBar">
              {this.getCaptureButton()}
              {this.state.captureMessage}
            </div>
          </div>
        </div>
      );
    }
  }

  getPokemonColor() {
    const types = JSON.parse(localStorage.getItem("currentPokemon")).types;
    switch (types[types.length - 1]) {
      case "poison":
        return "rgb(198, 150, 247)";
      case "grass":
        return "rgb(69, 250, 69)";
      case "fire":
        return "rgb(233, 78, 78)";
      case "flying":
        return "rgb(241, 241, 241)";
      case "water":
        return "rgb(148, 148, 255)";
      case "bug":
        return "rgb(172, 172, 255)";
      case "normal":
        return "rgb(255, 255, 255)";
      case "electric":
        return "rgb(255, 248, 210)";
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
        return "cyan";
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

  // post request to mark pokemon as captured
  capturePokemon() {
    //this has to defined outside of a nested function call
    let currentComponent = this;

    //send request to api
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
        currentComponent.setState({ captureMessage: response.data });
      });
  }

  // only displays the capture button if logged in
  getCaptureButton() {
    if (this.props.user) {
      return (
        <button className="captureButton" onClick={() => this.capturePokemon()}>
          Capture
        </button>
      );
    }
  }

  // display appropriate pokemon data according to id
  componentDidMount() {
    this.loadPokemonData(
      API_BASE_URL + `/pokemon/${this.props.match.params.id}`
    );
  }

  // get the pokemon from the api
  loadPokemonData(link) {
    axios
      .get(link)
      .then((response) => {
        // grab link data
        this.setState({
          pokemon: response.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
}

export default PokemonDetail;
