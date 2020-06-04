import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard.js";
import axios from "axios";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    //default state object
    this.state = [];
  }

  //callback function to change the page number
  getStateChanged = (childData) => {
    this.setState(childData);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.pageData);
    // this.updateUserData(
    //   "https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" +
    //     this.state.pageData.current_page
    // );
  }

  //call load automatically
  componentDidMount() {
    //this.loadUserData("https://intern-pokedex.myriadapps.com/api/v1/pokemon");
  }

  //display data
  render() {
    return (
      <div className="App">
        <Home getStateChanged={this.getStateChanged} />
      </div>
    );
  }
}

export default App;
