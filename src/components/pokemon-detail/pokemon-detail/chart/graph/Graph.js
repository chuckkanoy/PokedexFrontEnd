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
      this.props.stats["hp"],
      this.props.stats["speed"],
      this.props.stats["attack"],
      this.props.stats["defense"],
      this.props.stats["special-attack"],
      this.props.stats["special-defense"],
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
                    <Bar stat={this.props.stats["hp"]} percent={stats[0]} />
                  </td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>
                    <Bar stat={this.props.stats["speed"]} percent={stats[1]} />
                  </td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>
                    <Bar stat={this.props.stats["attack"]} percent={stats[2]} />
                  </td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>
                    <Bar
                      stat={this.props.stats["defense"]}
                      percent={stats[3]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Atk</td>
                  <td>
                    <Bar
                      stat={this.props.stats["special-attack"]}
                      percent={stats[4]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Sp Def</td>
                  <td>
                    <Bar
                      stat={this.props.stats["special-defense"]}
                      percent={stats[5]}
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
