import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Scooter from "./Scooter";
import HelmetZone from "./HelmetZone";
import MobileApp from "./MobileApp";
import "./navbar.css";

class App extends React.Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Vogo Helmet Theft Protection Simulation</h2>
          <nav className="navbar navbar-default navbar-static-top">
            <ul className="nav nav-pills">
              <li>
                <NavLink to="/mobile-app" activeClassName="active">
                  MobileApp
                </NavLink>
              </li>
              <li>
                <NavLink to="/helmet-zone" activeClassName="active">
                  HelmetZone
                </NavLink>
              </li>
              <li>
                <NavLink to="/scooter" activeClassName="active">
                  Scooter
                </NavLink>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/mobile-app" component={MobileApp} />
            <Route exact path="/helmet-zone" component={HelmetZone} />
            <Route exact path="/scooter" component={Scooter} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
