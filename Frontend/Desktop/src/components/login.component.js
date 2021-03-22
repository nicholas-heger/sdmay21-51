import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.setAccountType = this.setAccountType.bind(this);
      }
    
      state = {
        email: null,
        accountType: "Task Generator"
      };
    
      signIn() {
        // GET
      }

    setAccountType(event) {
        this.setState({accountType: event.target.value});
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Account Type</label>
                    <select type="select" className="form-control" onChange={this.setAccountType} value={this.state.accountType}>
                        <option defaultValue>Task Generator</option>
                        <option>Worker</option>
                    </select>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <Link to={{pathname: "/tasks", state: {email: this.state.email, accountType: this.state.accountType}}}>
                    <button id="submitButton" type="submit" className="btn btn-primary btn-block">Submit</button>
                </Link>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}