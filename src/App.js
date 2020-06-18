import React, { Component } from "react";
import "./App.css";
import PokemonDetail from "./components/pokemon-detail/pokemon-detail/PokemonDetail";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/home/home/Home";
import Login from "./components/security/Login";
import Register from "./components/security/Register";

class App extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
  };

  // renders routes passing props when necessary
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/home/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/types/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/abilities/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/groups/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/types/:type/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/abilities/:ability/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />

          <Route
            exact
            path="/home/captured/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/home/:name?/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/captured/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/pokemon/:id"
            render={(props) => (
              <PokemonDetail {...props} user={this.state.user} />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/home/groups/:group/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Redirect exact from="/home/types/:type" to="/home/types/:type/1" />
          <Redirect
            exact
            from="/home/abilities/:ability"
            to="/home/abilities/:ability/1"
          />
          <Redirect
            exact
            from="/home/groups/:group"
            to="/home/groups/:group/1"
          />
          <Redirect exact from="/home/NaN" to="/home/1" />
          <Redirect exact from="/captured" to="/captured/1" />
          <Redirect exact from="*" to="/home/1" />
        </Switch>
      </Router>
    );
  }
}

export default App;
