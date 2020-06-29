import React, { Component } from "react";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { Box, Button } from "@chakra-ui/core";

class Attribute extends Component {
  displayHelper = (identifier, attribute) => {
    let color = ``;
    if (identifier === "types") {
      color = `orange`;
    } else if (identifier === "groups") {
      color = `rgb(91, 168, 47)`;
    } else if (identifier === "abilities") {
      color = `rgb(134, 45, 134)`;
    }

    return (
      <Link
        to={`/home/${identifier}/${attribute.name}/1`}
        key={uuid()}
        style={{ textDecoration: "none" }}
      >
        <Button width="275px" bg={color} textDecoration="none">
          {attribute.name}
        </Button>
      </Link>
    );
  };

  render() {
    return this.props.data.data ? (
      <Box
        width="300px"
        m="auto"
        transform="translateX(-5px)"
        p="10px"
        bg="white"
        borderRadius="2px"
      >
        {this.props.data.data.map((attribute) =>
          this.displayHelper(this.props.label, attribute)
        )}
      </Box>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

Attribute.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Attribute;
