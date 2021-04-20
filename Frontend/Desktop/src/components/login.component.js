import React, { Component, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "./mutations";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { LOGIN_USER } from "./mutations";
import axios from "axios";
import { saveTokens } from "./tokens";

export const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [login, { data }] = useMutation(LOGIN_USER);

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    const { data } = await login({ variables: state });
    if (data && data.login) {
      saveTokens(data.login);
      history.push("/tasks");
    }
  }

  return (
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
          <option defaultValue>Task Generator</option>
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

      {/*<Link to={{pathname: "/tasks", state: {email: this.state.email, accountType: this.state.accountType}}}> */}
      <button
        id="submitButton"
        type="submit"
        className="btn btn-primary btn-block"
        onClick={handleLogin}
      >
        Submit
      </button>
      {/* </Link> */}
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
};
