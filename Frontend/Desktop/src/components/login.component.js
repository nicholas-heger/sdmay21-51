import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Query } from "@apollo/client/react/components";
import { QUERY_GET_EMPLOYER_ACCOUNTS } from './queries';
import {client} from '../index.js';

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
    
    signIn() {
        client.query({
            query: QUERY_GET_EMPLOYER_ACCOUNTS,
        })
        .then((res) => {
            console.log("query data")
            console.log(res.data)
            this.setState({userId: res.data.id})
            this.setState({firstName: res.data.firstName})
            this.setState({lastName: res.data.lastName})
            if(res.data.password === this.state.password){
                this.setState({accountValid: true})
            }
            localStorage.setItem('userId', res.data.id);
        })
    }

    setEmail(event) {
        this.setState({email: event.target.value});
    }

    setPassword(event) {
        this.setState({password: event.target.value});
    }

    setAccountType(event) {
        this.setState({accountType: event.target.value});
    }

    render() {
        var pathname = this.state.accountType === "Employer" ? "/tasks" : "/assignments";
        pathname = this.state.accountValid ? pathname : "/";

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={this.setEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  onChange={this.setPassword}/>
                </div>

                <div className="form-group">
                    <label>Account Type</label>
                    <select type="select" className="form-control" onChange={this.setAccountType} value={this.state.accountType}>
                        <option defaultValue>Employer</option>
                        <option>Worker</option>
                    </select>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <Link to={{pathname: pathname, state: {email: this.state.email, accountType: this.state.accountType}}}>
                    <Query 
                    variables={{
                    //     email: this.state.email,
                    //     password: this.state.password
                    }} 
                    query={QUERY_GET_EMPLOYER_ACCOUNTS}>
                        {
                            () => {
                            return (
                                <button id="submitButton" type="submit" className="btn btn-primary btn-block" onClick={() => this.signIn()}>Sign In</button>
                                );
                            }
                        }
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