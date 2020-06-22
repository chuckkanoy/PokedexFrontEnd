import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  logout = () => {
    const path = this.props.location.pathname;
    if (this.props.user) {
      localStorage.removeItem("user");

      if (path.includes(`captured`)) {
        this.props.history.push(`/home`);
      }

      window.location.reload();
    }
  };

  getUserElements = () => {
    let element = ``;

    if (this.props.user) {
      element = (
        <Link to="/captured" className="captureButton">
          <button onClick={this.props.getCaptured}>
            {this.props.user.data.name}
          </button>
        </Link>
      );
    } else {
      element = (
        <Link to={`/login`}>
          <button>Guest</button>
        </Link>
      );
    }

    return element;
  };

  getLoginElements = () => {
    let element = ``;

    if (this.props.user) {
      element = (
        <Link to={`/home`}>
          <button onClick={() => this.logout(this.props)}>Logout</button>
        </Link>
      );
    } else {
      element = (
        <Link
          to={`/login`}
          onClick={() => {
            localStorage.setItem("preLoginPage", this.props.location.pathname);
          }}
        >
          <button>Login</button>
        </Link>
      );
    }

    return element;
  };

  render() {
    return (
      <div className="userLinks">
        <Link to="/home/types/1">
          <button>Types</button>
        </Link>
        <Link to="/home/abilities/1">
          <button>Abilities</button>
        </Link>
        <Link to="/home/groups/1">
          <button>Egg Groups</button>
        </Link>
        {/* Links to login and register pages */}
        <Link to="/home">
          <button>Home</button>
        </Link>
        {this.getUserElements()}
        {this.getLoginElements()}
      </div>
    );
  }
}

export default withRouter(Menu);
