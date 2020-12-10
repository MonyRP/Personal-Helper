import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div className='navbar navbar-expand-lg fixed-top py-4 navbar-dark bg-dark'>
          <div className='container-fluid'>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarDropdown'>
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='navbarDropdown'>
              <ul className='nav navbar-nav nav-pills ml-auto'>
                <li className='mr-2'>
                  <Link to='/'>Login</Link>
                </li>
                <li>
                  <Link to='/vault-app'>Vault</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
