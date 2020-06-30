import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Menu.css";
import PropTypes from "prop-types";

class Menu extends Component {
  logout = () => {
    const path = this.props.location.pathname;
    if (this.parseUser) {
      localStorage.removeItem("user");

      if (path.includes(`captured`)) {
        this.props.history.push(`/home`);
      }

      window.location.reload();
    }
  };

  parseUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      console.log("User could not be parsed!");
    }
  };

  getUserElements = () => {
    let user = this.parseUser();

    return user ? (
      <Link to="/captured" className="captureButton">
        <button className="userButtonMobile" onClick={this.props.getCaptured}>
          {user.data.name}
        </button>
      </Link>
    ) : (
      <Link
        to={`/login`}
        onClick={() => {
          localStorage.setItem("preLoginPage", this.props.location.pathname);
        }}
      >
        <button className="userButtonMobile">Guest</button>
      </Link>
    );
  };

  getLoginElements = () => {
    let user = this.parseUser();

    return user ? (
      <Link to={`/home`}>
        <button
          className="userButtonMobile"
          onClick={() => this.logout(this.props)}
        >
          Logout
        </button>
      </Link>
    ) : (
      <Link
        to={`/login`}
        onClick={() => {
          localStorage.setItem("preLoginPage", this.props.location.pathname);
        }}
      >
        <button className="userButtonMobile">Login</button>
      </Link>
    );
  };

  render() {
    return (
      <div className="userLinksMobile">
        <Link to="/home/types/1">
          <button className="userButtonMobile">Types</button>
        </Link>
        <Link to="/home/abilities/1">
          <button className="userButtonMobile">Abilities</button>
        </Link>
        <Link to="/home/groups/1">
          <button className="userButtonMobile">Egg Groups</button>
        </Link>
        <Link to="/home">
          <button className="userButtonMobile">Home</button>
        </Link>

        {this.getUserElements()}
        {this.getLoginElements()}
      </div>
    );
  }
}

Menu.propTypes = {
  getCaptured: PropTypes.func,
};

export default withRouter(Menu);