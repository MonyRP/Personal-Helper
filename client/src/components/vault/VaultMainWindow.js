import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

export default class VaultMainWindow extends Component {
  constructor() {
    super();

    this.state = {
      credentials: []
    };
  }

  componentDidMount() {
    axios.get(`/api/vault/get-credentials/${this.props.match.params.site}`).then((res) => {
      console.log(res.data);
      this.setState({ credentials: res.data });
    });
  }

  render() {
    return (
      <div>
        {/* Loop through credentials and create card for each one */}
        {this.state.credentials.map((credential, index) => (
          <div key={index} className='card text-left'>
            <div className='card-header text-center'>{credential.siteName}</div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <strong>Username:</strong> {credential.username}
                </li>
                <li className='list-group-item'>
                  <strong>Email:</strong> {credential.email}
                </li>
                <li className='list-group-item'>
                  <strong>Password:</strong> {credential.password}
                </li>
                <li className='list-group-item'>
                  <strong>Comment:</strong> {credential.comment}
                </li>
              </ul>
            </div>
            <div className='card-footer text-muted'>{credential.date}</div>
          </div>
        ))}
        {/* -------------------- */}
      </div>
    );
  }
}
