import React, { Component } from "react";
import "./App.css";
import PokemonDetail from "./components/PokemonDetail";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { withCookies, Cookies } from "react-cookie";

class App extends Component {
  constructor(props) {
    super(props);

    const { cookies } = this.props;
    this.state = {
      user: cookies.get("user"),
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser = (data) => {
    const { cookies } = this.props;
    console.log(this.state.user);
    this.setState({ user: cookies.get("user") });
  };

  render() {
    const { cookies } = this.props;
    if (cookies.get("user")) console.log(cookies.get("user").data.api_token);
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home/1" />
          <Redirect exact from="/home/" to="/home/1" />
          <Redirect exact from="/home//:page" to="/home/1" />
          <Redirect exact from="/home/NaN" to="/home/1" />
          <Route
            exact
            path="/home/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Redirect exact from="/home/types/:type" to="/home/types/:type/1" />
          <Route
            exact
            path="/home/types/:type/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Redirect
            exact
            from="/home/abilities/:ability"
            to="/home/abilities/:ability/1"
          />
          <Route
            exact
            path="/home/abilities/:ability/:page"
            render={(props) => <Home {...props} user={this.state.user} />}
          />
          <Redirect
            exact
            from="/home/groups/:group"
            to="/home/groups/:group/1"
          />
          <Route
            exact
            path="/home/groups/:group/:page"
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
          <Redirect exact from="/captured" to="/captured/1" />
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
          <Route path="/404" component={NotFound} />
          <Redirect exact from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
