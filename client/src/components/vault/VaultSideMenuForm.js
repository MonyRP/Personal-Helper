import React, { Component } from 'react';
import axios from 'axios';

import Alert from 'react-bootstrap/Alert';

export default class VaultSideMenuForm extends Component {
  constructor() {
    super();

    this.state = {
      showErrorMsg: false,
      showSuccessMsg: false
    };

    this.saveCredentials = this.saveCredentials.bind(this);
  }

  // Saves credentials entered in form
  saveCredentials(e) {
    e.preventDefault();

    const sitename = e.target.elements.sitename.value;
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const comment = e.target.elements.comment.value;

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios
      .post(
        '/api/vault/save-credentials',
        {
          sitename: sitename,
          username: username,
          email: email,
          password: password,
          comment: comment
        },
        config
      )
      .then((response) => {
        try {
          this.setState({
            showErrorMsg: false,
            showSuccessMsg: true
          });

          console.log(response);
        } catch (error) {
          console.log('error: ' + error);
        }
      })
      .catch((error) => {
        console.log('/api/vault/save-credentials error: ' + error);
        this.setState({
          showErrorMsg: true,
          showSuccessMsg: false
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.showErrorMsg ? (
          <Alert variant='danger' onClose={() => this.setState({ showErrorMsg: false })} dismissible>
            A credential with this site name and username/email already exist.
          </Alert>
        ) : null}

        {this.state.showSuccessMsg ? (
          <Alert variant='success' onClose={() => this.setState({ showSuccessMsg: false })} dismissible>
            Credential saved.
          </Alert>
        ) : null}

        <form className='tab-pane fade show active mt-4' id='enter' onSubmit={this.saveCredentials} method='POST'>
          <div className='row justify-content-center'>
            <div className='form-group col-10'>
              <label htmlFor='sitename'>Website Name:</label>
              <input id='sitename' className='form-control form-control-sm' type='text' placeholder='Gmail' required />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='form-group col-10'>
              <label htmlFor='username'>Username:</label>
              <input
                id='username'
                className='form-control form-control-sm'
                type='text'
                placeholder='john.doe'
                required
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='form-group col-10'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                className='form-control form-control-sm'
                type='email'
                placeholder='example.com'
                required
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='form-group col-10'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                className='form-control form-control-sm'
                type='password'
                placeholder='jdoe20'
                required
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='form-group col-10'>
              <label htmlFor='comment'>Comment</label>
              <textarea
                id='comment'
                className='form-control form-control-sm'
                rows='2'
                placeholder='Important notes here.'
                required
              />
            </div>
          </div>

          <div className='row justify-content-center'>
            <input type='submit' className='col-3 btn btn-primary mr-1' value='Save' />
            <input type='reset' className='col-3 btn btn-primary' value='Clear' />
          </div>
        </form>
      </div>
    );
  }
}
