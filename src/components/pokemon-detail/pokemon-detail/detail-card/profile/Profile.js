import React, { Component } from "react";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import "./Profile.css";

class Profile extends Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div>
        <p className="profileHeader">&emsp;Profile</p>
        <div className="profile">
          <label style={{ fontWeight: "bold" }}>
            Height:&emsp;&emsp;&emsp;&nbsp;
          </label>
          {pokemon.height}
          <br />
          <br />
          <label style={{ fontWeight: "bold" }}>
            Weight:&emsp;&emsp;&emsp;
          </label>
          {pokemon.weight}
          <br />
          <br />
          <label style={{ fontWeight: "bold" }}>
            Abilities:&emsp;&emsp;&nbsp;&nbsp;
          </label>
          {pokemon.abilities.map((ability) => {
            return (
              <Link
                to={`/home/abilities/${ability}/1`}
                className="attributeLink"
                key={uuid()}
              >
                {ability}&emsp;
              </Link>
            );
          })}
          <br />
          <br />
          <label style={{ fontWeight: "bold" }}>Egg groups:&emsp;</label>
          {pokemon.egg_groups.map((group) => {
            return (
              <Link
                to={`/home/groups/${group}/1`}
                className="attributeLink"
                key={uuid()}
              >
                {group}&emsp;
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
