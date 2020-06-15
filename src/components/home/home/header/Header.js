import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

class Header extends Component {
  //initialize state and constants
  constructor(props) {
    super(props);

    this.state = {
      current_page: this.props.current_page,
    };
  }

  //display the view of the header
  render() {
    let forwardLink = "";
    let backLink = "";
    if (this.props.name) {
      backLink = `/home/${this.props.name}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/${this.props.name}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.type) {
      backLink = `/home/types/${this.props.type}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/types/${this.props.type}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.ability) {
      backLink = `/home/abilities/${this.props.ability}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/abilities/${this.props.ability}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.group) {
      backLink = `/home/groups/${this.props.group}/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/groups/${this.props.group}/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else if (this.props.location.pathname.includes(`/captured`)) {
      backLink = `/captured/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/captured/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    } else {
      backLink = `/home/${this.getCurrent(
        parseInt(this.props.current_page) - 1
      )}`;
      forwardLink = `/home/${this.getCurrent(
        parseInt(this.props.current_page) + 1
      )}`;
    }
    return (
      <div className="header">
        {/* back button */}
        <span onClick={this.handleMoveLeft}>
          <Link to={backLink}>
            <span className="backButton">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </span>
          </Link>
        </span>
        {/* search bar */}
        <span className="searchBar">
          <ion-icon name="search-sharp"></ion-icon>
          <input
            type="text"
            placeholder="Pokémon"
            onChange={(e) =>
              this.props.searchPokemon(e.target.value, this.getCurrent(1))
            }
            value={this.props.name}
          />
        </span>
        {/* Links to login and register pages */}
        <Link to="/home">
          <button>Home</button>
        </Link>
        {this.getUser()}
        {this.getLogin()}
        {/* forward button */}
        <span onClick={this.handleMoveRight}>
          <Link to={forwardLink}>
            <span className="forwardButton">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </Link>
        </span>
      </div>
    );
  }

  //repeated function for getting the current page within the bounds
  getCurrent = (e) => {
    return Math.max(1, Math.min(e, this.props.last));
  };

  //change page data if necesssary
  goToPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const current_page = Math.max(1, Math.min(page, this.props.last));

    const paginationData = {
      current_page: current_page,
    };

    this.setState({ current_page }, () => onPageChanged(paginationData));
  };

  //handle if moving back in pages
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.goToPage(parseInt(this.props.current_page) - 1);
  };

  //handle if moving forward
  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.goToPage(parseInt(this.props.current_page) + 1);
  };

  //return the appropriate text in the button of the user
  getUser() {
    if (this.props.user) {
      return (
        <Link to="/captured" className="captureButton">
          <button onClick={this.props.getCaptured}>
            {this.props.user.data.name}
          </button>
        </Link>
      );
    } else {
      return (
        <Link to={`/login`}>
          <button>Guest</button>
        </Link>
      );
    }
  }

  // get appropriate button and link for user according to login status
  getLogin() {
    if (this.props.user) {
      return (
        <Link to={`/home`}>
          <button onClick={() => this.logout()}>Logout</button>
        </Link>
      );
    } else {
      return (
        <Link to={`/login`}>
          <button>Login</button>
        </Link>
      );
    }
  }

  //log user out of system
  logout() {
    let currentComponent = this;
    if (currentComponent.props.user) {
      localStorage.removeItem("user");
      currentComponent.props.history.push(`/home`);
      window.location.reload();
    }
  }
}

//props for pagination
Header.propTypes = {
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default withCookies(withRouter(Header));
