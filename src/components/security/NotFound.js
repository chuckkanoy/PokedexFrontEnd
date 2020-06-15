import React, { Component } from "react";
import "./Security.css";
import { Link } from "react-router-dom";

class NotFound extends Component {
  //visualize a quick 404 page
  render() {
    return (
      <div className="notfound">
        <h1>404 | Page Not Found</h1>
        <Link to={`/home`}>Home Page</Link>
      </div>
    );
  }
}

export default NotFound;
