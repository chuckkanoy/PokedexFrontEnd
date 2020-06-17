import React from "react";
import Bar from "./bar/Bar";
import "./Graph.css";

class Graph extends React.Component {
  state = {
    stats: [],
  };
  //grab the stats from the parent component
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

  //visualize the graph using bar components
  render() {
    return this.state.stats ? (
      <div className="graph-wrapper">
        <div className="graph">
          <div className="bar-lines-container">
            <table>
              <tbody>
                <tr>
                  <td>HP</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["hp"]}
                      percent={this.state.stats[0]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["speed"]}
                      percent={this.state.stats[1]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["attack"]}
                      percent={this.state.stats[2]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["defense"]}
                      percent={this.state.stats[3]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Atk</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["special-attack"]}
                      percent={this.state.stats[4]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Def</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["special-defense"]}
                      percent={this.state.stats[5]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
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
