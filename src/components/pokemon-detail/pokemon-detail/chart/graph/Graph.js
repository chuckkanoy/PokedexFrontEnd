import React from "react";
import Bar from "./bar/Bar";
import "./Graph.css";

class Graph extends React.Component {
  state = {
    stats: [],
  };

  initializeStats = () => {
    const stats = [
      this.props.pokemon.stats["hp"],
      this.props.pokemon.stats["speed"],
      this.props.pokemon.stats["attack"],
      this.props.pokemon.stats["defense"],
      this.props.pokemon.stats["special-attack"],
      this.props.pokemon.stats["special-defense"],
    ];

    const max = Math.max(...stats);

    return stats.map((stat) => (stat / max) * 100);
  };

  componentDidMount() {
    this.setState({ stats: this.initializeStats() });
  }

  barHelper = (label, stat, index) => {
    return (
      <tr>
        <td>{label}</td>
        <td>
          <Bar
            stat={this.props.pokemon.stats[`${stat}`]}
            percent={this.state.stats[index]}
            getPokemonColor={this.props.getPokemonColor()}
          />
        </td>
      </tr>
    );
  };

  render() {
    return this.state.stats ? (
      <div className="graph-wrapper">
        <div className="graph">
          <div className="bar-lines-container">
            <table>
              <tbody>
                {this.barHelper("HP", "hp", 0)}
                {this.barHelper("Speed", "speed", 1)}
                {this.barHelper("Attack", "attack", 2)}
                {this.barHelper("Defense", "defense", 3)}
                {this.barHelper("Sp Atk", "special-attack", 4)}
                {this.barHelper("Sp Def", "special-defense", 5)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default Graph;
