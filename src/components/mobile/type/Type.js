import React from "react";
import "./Type.css";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";

function getType(type) {
  switch (type.toLowerCase()) {
    case "poison":
      return <label className="poison">{type}</label>;
    case "grass":
      return <label className="grass">{type}</label>;
    case "fire":
      return <label className="fire">{type}</label>;
    case "flying":
      return <label className="flying">{type}</label>;
    case "water":
      return <label className="water">{type}</label>;
    case "bug":
      return <label className="bug">{type}</label>;
    case "normal":
      return <label className="normal">{type}</label>;
    case "electric":
      return <label className="electric">{type}</label>;
    case "ground":
      return <label className="ground">{type}</label>;
    case "fairy":
      return <label className="fairy">{type}</label>;
    case "fighting":
      return <label className="fighting">{type}</label>;
    case "psychic":
      return <label className="psychic">{type}</label>;
    case "rock":
      return <label className="rock">{type}</label>;
    case "steel":
      return <label className="steel">{type}</label>;
    case "ice":
      return <label className="ice">{type}</label>;
    case "ghost":
      return <label className="ghost">{type}</label>;
    case "dragon":
      return <label className="dragon">{type}</label>;
    case "dark":
      return <label className="dark">{type}</label>;
    default:
      return <label className="capture">{type}</label>;
  }
}

const Type = ({ type }) => {
  return (
    <div className="typeWrapper" key={uuid()}>
      <Link to={`/home/types/${type}/1`}>
        <div className="typeMobile">{getType(type.toUpperCase())}</div>
      </Link>
    </div>
  );
};

export default Type;
