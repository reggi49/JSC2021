import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddKontak from "./components/add-kontak.component";
import Kontak from "./components/kontak.component";
import KontaksList from "./components/kontaks-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/kontaks"} className="navbar-brand">
            Reggi JSC
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/kontaks"} className="nav-link">
                Kontaks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tambah"} className="nav-link">
                Tambah
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/kontaks"]} component={KontaksList} />
            <Route exact path="/tambah" component={AddKontak} />
            <Route path="/kontaks/:id" component={Kontak} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
