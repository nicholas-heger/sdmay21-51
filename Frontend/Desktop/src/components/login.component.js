import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Query } from "@apollo/client/react/components";
import {
  QUERY_GET_EMPLOYER_BY_EMAIL,
  QUERY_GET_WORKER_BY_EMAIL,
} from "./queries";
import { client } from "../index.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
  }

  state = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "Employer",
    accountValid: true,
    nextPage: "/tasks",
    skills: null,
    location: null,
  };

  signIn(queryToExecute) {
    client
      .query({
        query: queryToExecute,
        variables: { email: this.state.email },
      })
      .then((res) => {
        console.log("email that was sent to backend");
        console.log(this.state.email);
        console.log("query data");
        console.log(res.data);
        if (this.state.accountType === "Employer") {
          if (res.data.employersByEmail.length > 0) {
            console.log(res.data.employersByEmail[0]);
            this.setState({ userId: res.data.employersByEmail[0].id });
            this.setState({
              firstName: res.data.employersByEmail[0].firstName,
            });
            this.setState({ lastName: res.data.employersByEmail[0].lastName });
            localStorage.setItem("userId", res.data.employersByEmail[0].id);
          } else {
            return;
          }
        } else {
          if (res.data.workersByEmail.length > 0) {
            console.log(res.data.workersByEmail[0]);
            this.setState({ userId: res.data.workersByEmail[0].id });
            this.setState({ firstName: res.data.workersByEmail[0].firstName });
            this.setState({ lastName: res.data.workersByEmail[0].lastName });
            localStorage.setItem("userId", res.data.workersByEmail[0].id);
          } else {
            return;
          }
        }
      });
  }

  render() {
    var pathname =
      this.state.accountType === "Employer" ? "/tasks" : "/assignments";
    pathname = this.state.accountValid ? pathname : "/";
    var queryToExecute =
      this.state.accountType === "Employer"
        ? QUERY_GET_EMPLOYER_BY_EMAIL
        : QUERY_GET_WORKER_BY_EMAIL;

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={state.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={state.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <select
                type="select"
                className="form-control"
                onChange={this.setAccountType}
                value={this.state.accountType}
              >
                <option defaultValue>Employer</option>
                <option>Worker</option>
              </select>
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <Link
              to={{
                pathname: pathname,
                state: {
                  email: this.state.email,
                  accountType: this.state.accountType,
                },
              }}
            >
              <Query
                variables={{
                  email: this.state.email,
                }}
                query={queryToExecute}
              >
                {() => {
                  return (
                    <button
                      id="submitButton"
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={() => this.signIn(queryToExecute)}
                    >
                      Sign In
                    </button>
                  );
                }}
              </Query>
            </Link>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
