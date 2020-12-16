import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

// react-bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class VaultMainWindow extends Component {
  constructor() {
    super();

    this.state = {
      credentials: []
    };
  }

  componentDidMount() {
    axios.get(`/api/vault/get-credentials/${this.props.match.params.site}`).then((res) => {
      this.setState({ credentials: res.data });
    });
  }

  render() {
    return (
      <div>
        <Row className='border-bottom border-secondary mb-4 pb-3'>
          <Col className='text-center'>
            <h1>{this.props.match.params.site}</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          {/* Loop through credentials and create card for each one */}
          {this.state.credentials.map((credential, index) => (
            <Col xs={10} sm={7} md={8} lg={6} xl={4} className='mb-3'>
              <Card key={index} className='card shadow p-3 mb-3 bg-white rounded text-left'>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Username:</strong> {credential.username}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {credential.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Password:</strong> {credential.password}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Comment:</strong> {credential.comment}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
          {/* -------------------- */}
        </Row>
      </div>
    );
  }
}
