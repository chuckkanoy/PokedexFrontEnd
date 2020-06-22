import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PokemonDetail from "../pokemon-detail/pokemon-detail/PokemonDetail";

function PokemonDetailRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/pokemon/:id"
        render={(props) => <PokemonDetail {...props} />}
      />
    </Switch>
  );
}

export default PokemonDetailRoutes;
