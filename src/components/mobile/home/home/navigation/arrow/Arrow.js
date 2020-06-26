import React from "react";
import { Link } from "react-router-dom";

const Arrow = ({ link, identifier }) => {
  return (
    <Link to={link}>
      <i className={identifier}></i>
    </Link>
  );
};

export default Arrow;
