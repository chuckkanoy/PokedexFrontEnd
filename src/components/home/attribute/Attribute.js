import React, { Component } from "react";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import "./Attribute.css";

class Attribute extends Component {
  displayHelper = (identifier, attribute) => {
    return (
      <Link to={`/home/${identifier}/${attribute.name}/1`} key={uuid()}>
        <button className={`${identifier}Button`}>{attribute.name}</button>
      </Link>
    );
  };

  render() {
    return (
      <div className="attributeContainer">
        {this.props.data.data.map((attribute) =>
          this.displayHelper(this.props.label, attribute)
        )}
      </div>
    );
  }
}

export default Attribute;
