import React from "react";
import "./Bar.css";

const Bar = ({ stat, percent, getPokemonColor }) => {
  return (
    <div className="barObjectMobile">
      <div className="bar">
        <div className="text">&emsp; {stat}</div>
        <div className="background" style={{ width: `${100}%` }} />
        <div
          className="actual"
          style={{ width: `${percent}%`, backgroundColor: getPokemonColor }}
        />
      </div>
    </div>
  );
};

export default Bar;