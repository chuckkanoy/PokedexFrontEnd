import React, { Component } from "react";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { MobileContext } from "../../../mobile-context";
import "./Attribute.css";

class Attribute extends Component {
  displayHelper = (identifier, attribute, modifier) => {
    return (
      <Link to={`/home/${identifier}/${attribute.name}/1`} key={uuid()}>
        <button className={`${identifier}Button` + modifier}>
          {attribute.name}
        </button>
      </Link>
    );
  };

  render() {
    let modifier = "";
    const isMobile = this.context;
    if (isMobile) {
      modifier = "Mobile";
    } else {
      modifier = "";
    }

    return this.props.data.data ? (
      <div className={"attributeContainer" + modifier}>
        {console.log(modifier)}
        {this.props.data.data.map((attribute) =>
          this.displayHelper(this.props.label, attribute, modifier)
        )}
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
Attribute.contextType = MobileContext;

Attribute.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Attribute;
