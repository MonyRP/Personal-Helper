import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Vault from "./components/vault/vault";
import "./App.css";

export default class App extends Component {
  state = {
    sidemenuIsOpen: true,
  };

  openNav = () => {
    this.setState({
      sidemenuIsOpen: true,
    });
    // document.getElementById("sidemenu").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  };

  closeNav = () => {
    this.setState({
      sidemenuIsOpen: false,
    });
    // document.getElementById("sidemenu").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
  };

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />

          <div className="container-fluid">
            <div className="row">
              <div id="sidemenu" className="col-3 sidenav py-5 border">
                <SideMenu />
              </div>

              <div id="main" className="col-9">
                {this.state.sidemenuIsOpen ? (
                  <i className="fas fa-arrow-left sidemenu-slider" onClick={this.closeNav} />
                ) : (
                  <i className="fas fa-arrow-right sidemenu-slider" onClick={this.openNav} />
                )}

                {/* Route for link from sidebar to display account info */}
                <Route path="/vault/:site" render={(props) => <Vault key={props.match.params.site} {...props} />} />
              </div>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}
