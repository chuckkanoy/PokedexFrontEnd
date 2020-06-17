import React from "react";
import { Link, withRouter } from "react-router-dom";

function UserButton(props) {
  return (
    <div>
      {/* Links to login and register pages */}
      <Link to="/home/types/1">
        <button>Types</button>
      </Link>
      <Link to="/home/abilities/1">
        <button>Abilities</button>
      </Link>
      <Link to="/home/groups/1">
        <button>Egg Groups</button>
      </Link>
    </div>
  );
}

export default withRouter(UserButton);
