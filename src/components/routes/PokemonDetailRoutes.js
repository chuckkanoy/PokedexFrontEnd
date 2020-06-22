import React from "react";
import { Route } from "react-router-dom";
import PokemonDetail from "../pokemon-detail/pokemon-detail/PokemonDetail";

function PokemonDetailRoutes() {
  return (
    <Route
      exact
      path="/pokemon/:id"
      render={(props) => <PokemonDetail {...props} />}
    />
  );
}

export default PokemonDetailRoutes;
