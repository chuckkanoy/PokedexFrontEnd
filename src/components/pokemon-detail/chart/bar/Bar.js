import React from "react";
import "./Bar.css";

// initialize a repeatable bar object for use in graph component
const Bar = ({ stat, percent }) => {
  return (
    <div className="barObject">
      <div className="bar">
        <div className="text">&emsp; {stat}</div>
        <div className="background" style={{ width: `${100}%` }} />
        <div className="actual" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default Bar;
