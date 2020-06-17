import React, { Component } from "react";
import Header from "./header/Header";
import PokemonCard from "../pokemon-card/PokemonCard.js";
import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import AttributeSelection from "../../attributes/attribute-selection/AttributeSelection";

class Home extends Component {
  //constructor to initialize state and constants
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      meta: [],
      links: [],
      name: "",
    };

    this.getCaptured = this.getCaptured.bind(this);
  }

  //visualize the home page
  render() {
    let name = "";
    let current_page = 1;

    //check for params to update
    if (this.props.match) {
      if (this.props.match.params.name) {
        name = this.props.match.params.name;
      } else {
        name = this.state.name;
      }
      current_page = this.props.match.params.page;
    }

    return (
      <div className="App">
        <Header
          onPageChanged={this.onPageChanged}
          current_page={current_page}
          searchPokemon={this.searchPokemon}
          name={name}
          from={this.state.meta.from}
          last={this.state.meta.last_page}
          type={this.props.match.params.type}
          ability={this.props.match.params.ability}
          group={this.props.match.params.group}
          user={this.props.user}
          getCaptured={this.getCaptured}
          logout={this.logout}
        />
        <AttributeSelection />
        {this.getDisplay()}
      </div>
    );
  }

  //reload page with parameter data unless it is a name search
  componentWillReceiveProps(newProps) {
    if (
      newProps.location.pathname !==
      `/home/${newProps.match.params.name}/${newProps.match.params.page}`
    ) {
      if (newProps.location.pathname !== this.props.location.pathname) {
        window.location.reload();
      }
    }
  }

  getDisplay() {
    if (
      this.props.location.pathname ===
      `/home/types/${this.props.match.params.page}`
    ) {
      return (
        <div className="attributeContainer">
          {this.state.data.map((type) => (
            <Link to={`/home/types/${type.name}/1`}>
              <button className="typeButton">{type.name}</button>
            </Link>
          ))}
        </div>
      );
    } else if (
      this.props.location.pathname ===
      `/home/abilities/${this.props.match.params.page}`
    ) {
      return (
        <div className="attributeContainer">
          {this.state.data.map((ability) => (
            <Link to={`/home/abilities/${ability.name}/1`}>
              <button className="abilityButton">{ability.name}</button>
            </Link>
          ))}
        </div>
      );
    } else if (
      this.props.location.pathname ===
      `/home/groups/${this.props.match.params.page}`
    ) {
      return (
        <div className="attributeContainer">
          {this.state.data.map((group) => (
            <Link to={`/home/groups/${group.name}/1`}>
              <button className="groupButton">{group.name}</button>
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <div className="pokemonCardHolder">
          {this.state.data.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              updateView={this.updateView}
              user={this.props.user}
            />
          ))}
        </div>
      );
    }
  }

  checkConditions(page) {
    // check url for name parameter
    if (this.props.match.params.name) {
      this.searchPokemon(this.props.match.params.name, page);
    }
    // check url for type parameter
    else if (this.props.match.params.type) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/types/${this.props.match.params.type}?type=${this.props.match.params.type}&page=${page}`
      );
    }
    // check url for ability parameter
    else if (this.props.match.params.ability) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/abilities/${this.props.match.params.ability}?ability=${this.props.match.params.ability}&page=${page}`
      );
    }
    // check url for group parameter
    else if (this.props.match.params.group) {
      this.loadUserData(
        API_BASE_URL +
          `/pokemon/groups/${this.props.match.params.group}?group=${this.props.match.params.group}&page=${page}`
      );
    }
    // check url for captured path
    else if (this.props.location.pathname.includes(`/captured`)) {
      this.getCaptured(page);
    } else if (this.props.location.pathname === `/home/types/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/types?page=${page}`);
    } else if (this.props.location.pathname === `/home/abilities/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/abilities?page=${page}`);
    } else if (this.props.location.pathname === `/home/groups/${page}`) {
      this.loadUserData(API_BASE_URL + `/pokemon/groups?page=${page}`);
    } else {
      this.loadUserData(API_BASE_URL + `/pokemon?page=${page}`);
    }
  }

  //get initial page of pokemon
  componentDidMount() {
    this.checkConditions(this.props.match.params.page);
  }

  //load in data based on link
  loadUserData(link) {
    axios
      .get(link)
      .then((response) => {
        //grab data from link
        const newPokemon = response.data.data;
        const newPageData = response.data.meta;
        const newLinksData = response.data.links;
        //create new state object
        const newState = Object.assign({}, this.state, {
          data: newPokemon,
          meta: newPageData,
          links: newLinksData,
        });

        //store new state in components state
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }

  //search pokemon as user types in data
  searchPokemon = async (e, current) => {
    var link = ``;
    if (e !== "") {
      link = API_BASE_URL + `/pokemon?name=${e}&page=${current}`;
    } else {
      link = API_BASE_URL + `/pokemon?page=${current}`;
    }
    this.loadUserData(link);
    //update the name state to what is in input field
    this.setState({ name: e });
    this.props.history.push(`/home/${e}/${current}`);
  };

  //update the current paginated data
  onPageChanged = (newData) => {
    //const current_page = newData;
    this.checkConditions(newData);
    this.setState({ current_page: newData });
  };

  // send request for captured pokemon
  getCaptured() {
    if (this.props.user) {
      axios
        .get(
          API_BASE_URL +
            `/pokemon/captured?page=${this.props.match.params.page}`,
          {
            headers: {
              Authorization: `Bearer ${this.props.user.data.api_token}`,
            },
          }
        )
        .then((response) => {
          //grab data from link
          const newPokemon = response.data.data;
          const newPageData = response.data.meta;
          const newLinksData = response.data.links;
          //create new state object
          const newState = Object.assign({}, this.state, {
            data: newPokemon,
            meta: newPageData,
            links: newLinksData,
          });
          //store new state in components state
          this.setState(newState);
        })
        .catch(console.log);
    }
  }
}

export default withRouter(Home);
