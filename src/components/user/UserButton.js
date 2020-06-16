import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./UserButton.css";

//log user out of system
function logout(props) {
  if (props.user) {
    localStorage.removeItem("user");
    window.location.reload();
  }
}

//return the appropriate text in the button of the user
function getUser(props) {
  if (props.user) {
    return (
      <Link to="/captured" className="captureButton">
        <button onClick={props.getCaptured}>{props.user.data.name}</button>
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
function getLogin(props) {
  if (props.user) {
    return (
      <Link to={`/home`}>
        <button onClick={() => logout(props)}>Logout</button>
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

function UserButton(props) {
  return (
    <div className="userLinks">
      {/* Links to login and register pages */}
      <Link to="/home">
        <button>Home</button>
      </Link>
      {getUser(props)}
      {getLogin(props)}
    </div>
  );
}

export default withRouter(UserButton);
