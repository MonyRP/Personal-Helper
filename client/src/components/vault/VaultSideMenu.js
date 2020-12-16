import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Custom components
import VaultSideMenuForm from './VaultSideMenuForm';

// Bootstrap imports
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';

export default class VaultSidemenu extends Component {
  constructor() {
    super();

    this.state = {
      Id: 0,
      Date: null,
      sitename: '',
      username: '',
      email: '',
      password: '',
      comment: '',
      listOfNames: []
    };

    this.loadNames = this.loadNames.bind(this);
  }

  // Loads list of site names from available credentials
  loadNames(e) {
    axios
      .get('/api/vault/load-names')
      .then((res) => {
        this.setState({
          listOfNames: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey='newCredentials'
          id='credentials-tabs'
          onSelect={(key) => {
            if (key == 'findCredentials') {
              this.loadNames();
            }
          }}
        >
          <Tab eventKey='newCredentials' title='New Credentials'>
            {/* Enter credentials form */}
            <VaultSideMenuForm />
          </Tab>
          <Tab eventKey='findCredentials' title='Find Credentials'>
            {/* Find credentials list */}
            <Tab.Container id='find-credentials-list-group'>
              <ListGroup>
                {this.state.listOfNames.map((element, index) => (
                  <ListGroup.Item key={index} className='d-flex justify-content-between align-items-center'>
                    <Link to={`/vault/${element.siteName}`} className='text-dark'>
                      {element.siteName}
                    </Link>
                    <span className='badge badge-primary badge-pill'>{element.recordCount}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab.Container>

            {/* --------------------- */}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
