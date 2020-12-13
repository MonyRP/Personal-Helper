import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LoginPage from './components/login/LoginPage';
import VaultApp from './components/vault/VaultApp';
import './App.css';

// Redux imports
import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route path='/vault-app' component={VaultApp} />
            </Switch>
          </Router>
        </Provider>
      </Fragment>
    );
  }
}
