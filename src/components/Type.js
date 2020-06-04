import React from "react";

//get the appropriate type of the pokemon and add as classname for styling
function getType(type) {
  switch (type) {
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
      return <label>{type}</label>;
  }
}

//
const Type = ({ types }) => {
  return (
    <span>
      {types.map((oneType) => (
        <div className="type">{getType(oneType)}</div>
      ))}
    </span>
  );
};

export default Type;
