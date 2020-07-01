import React, { Component } from "react";
import "./App.css";
import PokemonDetail from "./components/pokemon-detail/PokemonDetail";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/home/home/Home";
import Security from "./components/security/Security";
import { MobileContext } from "./mobile-context";

class App extends Component {
  state = {
    width: window.innerWidth,
    mobile: false,
  };

  handleWindowSizeChange = () => {
    if (window.innerWidth < 1000) {
      this.setState({ mobile: true });
    } else {
      this.setState({ mobile: false });
    }
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.handleWindowSizeChange();
  }

  render() {
    return (
      <MobileContext.Provider value={this.state.mobile}>
        <Router>
          <Switch>
            <Route
              exact
              path="/home/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/types/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/abilities/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/groups/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/types/:type/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/abilities/:ability/:page"
              render={(props) => <Home {...props} />}
            />

            <Route
              exact
              path="/home/captured/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/home/:name?/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/captured/:page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/pokemon/:id"
              render={(props) => <PokemonDetail {...props} />}
            />
            <Route exact path="/login" render={() => <Security />} />
            <Route exact path="/register" render={() => <Security />} />
            <Route
              exact
              path="/home/groups/:group/:page"
              render={(props) => <Home {...props} />}
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
            <Redirect to="/home/1" />
          </Switch>
        </Router>
      </MobileContext.Provider>
    );
  }
}

export default App;
