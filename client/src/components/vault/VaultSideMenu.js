import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

export default class VaultSidemenu extends Component {
  constructor() {
    super();

    this.state = {
      Id: 0,
      Date: null,
      sitename: "",
      username: "",
      email: "",
      password: "",
      comment: "",
      listOfNames: [],
      errorMsg: false,
    };

    this.loadNames = this.loadNames.bind(this);
    this.saveCredentials = this.saveCredentials.bind(this);
  }

  loadNames(e) {
    e.preventDefault();

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    axios
      .get("/api/vault/load-names")
      .then((res) => {
        this.setState({
          listOfNames: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveCredentials(e) {
    e.preventDefault();

    const sitename = e.target.elements.sitename.value;
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const comment = e.target.elements.comment.value;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "/api/vault/save-credentials",
        {
          sitename: sitename,
          username: username,
          email: email,
          password: password,
          comment: comment,
        },
        config
      )
      .then((response) => {
        this.setState({
          errorMsg: false,
        });
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          errorMsg: true,
        });
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* {this.state.errorMsg ? (
          <Alert variant="danger" onClose={() => this.setState({ errorMsg: false })} dismissible>
            <Alert.Heading>"Email already used by other account."</Alert.Heading>
          </Alert>
        ) : null} */}
        {/* Enter and Find tabs */}
        <ul className="nav nav-tabs" id="myTab">
          <li className="nav-item">
            <a className="nav-link active" id="enter-tab" data-toggle="tab" href="#enter">
              Enter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="find-tab" data-toggle="tab" onClick={this.loadNames} href="#find">
              Find
            </a>
          </li>
        </ul>
        {/* ------------------ */}

        <div className="tab-content">
          {/* Enter form */}
          <form className="tab-pane fade show active mt-4" id="enter" onSubmit={this.saveCredentials} method="POST">
            <div className="row justify-content-center">
              <div className="form-group col-10">
                <label htmlFor="sitename">Website Name:</label>
                <input type="text" className="form-control form-control-sm" id="sitename" placeholder="Gmail" required />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form-group col-10">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control form-control-sm" id="username" placeholder="john.doe" required />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form-group col-10">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control form-control-sm" id="email" placeholder="example.com" required />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form-group col-10">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control form-control-sm" id="password" placeholder="jdoe20" required />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="form-group col-10">
                <label htmlFor="comment">Comment</label>
                <textarea className="form-control form-control-sm" id="comment" rows="2" placeholder="Important notes here." required />
              </div>
            </div>

            <div className="row justify-content-center">
              <button type="submit" className="col-4 btn btn-primary">
                Save
              </button>
            </div>
          </form>
          {/* ----------------------- */}

          {/* Find tab list */}
          <div className="tab-pane fade" id="find">
            <ul className="list-group">
              {this.state.listOfNames.map((name, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/vault/${name.sitename}`} className="text-dark">
                    {name.sitename}
                  </Link>
                  <span className="badge badge-primary badge-pill">0</span>
                </li>
              ))}
            </ul>
          </div>
          {/* --------------------- */}
        </div>
      </div>
    );
  }
}
