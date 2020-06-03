import React, { Component } from "react";

const Type = ({ types }) => {
  return (
    <span className="type">
      {types.map((oneType) => (
        <div>{/* NEEDS MAPPING */}</div>
      ))}
    </span>
  );
};

export default Type;
