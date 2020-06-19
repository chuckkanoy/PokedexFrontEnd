import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function logout(props) {
  if (props.user) {
    localStorage.removeItem("user");
    window.location.reload();
  }
}

function getUserElements(props) {
  let element = ``;

  if (props.user) {
    element = (
      <Link to="/captured" className="captureButton">
        <button onClick={props.getCaptured}>{props.user.data.name}</button>
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
}

function getLoginElements(props) {
  let element = ``;

  if (props.user) {
    element = (
      <Link to={`/home`}>
        <button onClick={() => logout(props)}>Logout</button>
      </Link>
    );
  } else {
    element = (
      <Link to={`/login`}>
        <button>Login</button>
      </Link>
    );
  }

  return element;
}

function Menu(props) {
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
      {getUserElements(props)}
      {getLoginElements(props)}
    </div>
  );
}

export default Menu;
