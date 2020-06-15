import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

class Header extends Component {
  //initialize state and constants
  constructor(props) {
    super(props);
    const { totalPokemon = null, pageLimit = 15, pageNeighbors = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 15;
    this.totalPokemon = typeof totalPokemon === "number" ? totalPokemon : 0;

    this.pageNeighbors =
      typeof pageNeighbors === "number"
        ? Math.max(0, Math.min(pageNeighbors, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalPokemon / this.pageLimit);

    this.state = {
      current_page: this.props.current_page,
      totalPages: 0,
      pageLimit: 15,
    };

    this.onPageChanged = this.onPageChanged.bind(this);
  }

  //update constant when a page is changed
  onPageChanged = (newData) => {
    this.data = newData;
  };

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
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: 553,
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
      return <button>Guest</button>;
    }
  }

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
        <span className="backButton" onClick={this.handleMoveLeft}>
          <Link to={backLink}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </Link>
        </span>
        <Link to="/home">
          <button>Home</button>
        </Link>
        {this.getUser()}
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
        {this.getLogin()}
        {/* forward button */}
        <span className="forwardButton" onClick={this.handleMoveRight}>
          <Link to={forwardLink}>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </Link>
        </span>
      </div>
    );
  }
}

//props for pagination
Header.propTypes = {
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default withCookies(withRouter(Header));
