import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VaultSideMenu from "../vault/VaultSideMenu";

export default class Sidemenu extends Component {
  render() {
    return (
      <div>
        <VaultSideMenu />
      </div>
    );
  }
}
