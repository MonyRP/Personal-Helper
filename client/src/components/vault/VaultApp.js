import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import VaultMainWindow from './VaultMainWindow';
import VaultSideMenu from './VaultSideMenu';

// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class VaultApp extends Component {
  state = {
    sidemenuIsOpen: true
  };

  openNav = () => {
    this.setState({
      sidemenuIsOpen: true
    });
  };

  closeNav = () => {
    this.setState({
      sidemenuIsOpen: false
    });
  };

  render() {
    return (
      <Router>
        <Container fluid>
          {this.state.sidemenuIsOpen ? (
            <Row>
              <Col xs={12} md={5} lg={4} xl={3} id='sidemenu' className='py-5 border'>
                <VaultSideMenu />
              </Col>

              <Col id='main'>
                {this.state.sidemenuIsOpen ? (
                  <i className='fas fa-arrow-left sidemenu-slider' onClick={this.closeNav} />
                ) : (
                  <i className='fas fa-arrow-right sidemenu-slider' onClick={this.openNav} />
                )}

                <Row className='justify-content-center'>
                  <Col md={8} lg={5} xl={4}>
                    {/* Route for link from sidebar to display account info */}
                    <Route
                      path='/vault/:site'
                      render={(props) => <VaultMainWindow key={props.match.params.site} {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <Row id='main'>
              <Col xs={1}>
                {this.state.sidemenuIsOpen ? (
                  <i className='fas fa-arrow-left sidemenu-slider' onClick={this.closeNav} />
                ) : (
                  <i className='fas fa-arrow-right sidemenu-slider' onClick={this.openNav} />
                )}
              </Col>
              <Col>
                <Row className='justify-content-center'>
                  <Col xs={10} md={8} lg={5} xl={3}>
                    {/* Route for link from sidebar to display account info */}
                    <Route
                      path='/vault/:site'
                      render={(props) => <VaultMainWindow key={props.match.params.site} {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      </Router>
    );
  }
}
