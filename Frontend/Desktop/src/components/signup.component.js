import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.createAccount = this.createAccount.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setAccountType = this.setAccountType.bind(this);
        // this.timeout = this.timeout.bind(this);
      }
    
      state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accountType: "Task Generator",
        accountValid: true,
        nextPage: "/tasks"
      };
    
    createAccount() {
        // POST
    }

    setFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    setLastName(event) {
        this.setState({lastName: event.target.value});
    }

    setEmail(event) {
        this.setState({email: event.target.value});
    }

    setPassword(event) {
        this.setState({password: event.target.value});
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    setAccountType(event) {
        this.setState({accountType: event.target.value});
        // await this.timeout(1000);
    }
    

    render() {
        var pathname = this.state.accountType === "Task Generator" ? "/tasks" : "/assignments";
        pathname = this.state.accountValid ? pathname : "/"

        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-row">
                    <div className="col form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={this.setFirstName}/>
                    </div>

                    <div className="col form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" onChange={this.setLastName}/>
                    </div>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.setEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.setPassword}/>
                </div>

                <div className="form-group">
                    <label>Account Type</label>
                    <select type="select" className="form-control" onChange={this.setAccountType} value={this.state.accountType}>
                        <option defaultValue>Task Generator</option>
                        <option>Worker</option>
                    </select>
                </div>

                <Link to={{pathname: pathname, state: {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, accountType: this.state.accountType}}}>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </Link>
                <p className="forgot-password text-right">
                    Already registered <a href="../sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}