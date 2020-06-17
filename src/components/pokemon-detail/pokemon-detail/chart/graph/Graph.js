import React from "react";
import Bar from "./bar/Bar";
import "./Graph.css";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.initializeStats = this.initializeStats.bind(this);
  }

  //grab the stats from the parent component
  initializeStats() {
    var stats = [
      this.props.pokemon.stats["hp"],
      this.props.pokemon.stats["speed"],
      this.props.pokemon.stats["attack"],
      this.props.pokemon.stats["defense"],
      this.props.pokemon.stats["special-attack"],
      this.props.pokemon.stats["special-defense"],
    ];

    //find maximum
    var max = 0;
    stats.forEach((element) => {
      if (element > max) max = element;
    });

    //find percentages from maximum
    for (var i = 0; i < stats.length; i++) {
      stats[i] = (stats[i] / max) * 100;
    }

    return stats;
  }

  //visualize the graph using bar components
  render() {
    var stats = this.initializeStats();
    return (
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
                      percent={stats[0]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["speed"]}
                      percent={stats[1]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["attack"]}
                      percent={stats[2]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["defense"]}
                      percent={stats[3]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Atk</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["special-attack"]}
                      percent={stats[4]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Def</td>
                  <td>
                    <Bar
                      stat={this.props.pokemon.stats["special-defense"]}
                      percent={stats[5]}
                      getPokemonColor={this.props.getPokemonColor()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
