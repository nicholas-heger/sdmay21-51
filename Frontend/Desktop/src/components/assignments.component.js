import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Mutation } from "@apollo/client/react/components";
import { MUTATE_WORKER_ACCOUNT_ADD_LOCATION } from './mutations';
import { SkillInput } from '../classes/SkillInput';
import { LocationInput } from '../classes/LocationInput';

export default class Assignments extends Component {
  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
  } 

  state = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
    skills: new SkillInput("newSkill", 3),
    location: null,
    persons: [],
    name1: null,
    personNames: [],
    id: 1, // this is old code, use userId but don't remove this yet
    tasks: [],
  };

  addLocation(addLocation) {
    addLocation()
      .then(res => {
        console.log("post response");
        console.log(res);
      })
  }

  async componentDidMount() {
    if (this?.props?.location?.state !== undefined) {
      this.setState({firstName: this.props.location.state.firstName});
      this.setState({lastName: this.props.location.state.lastName});
      this.setState({email: this.props.location.state.email});
      this.setState({accountType: this.props.location.state.accountType});
      console.log("userId in local storage");
      console.log(localStorage.getItem('userId'));
      this.setState({userId: localStorage.getItem('userId')});
    }

    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    // Only will work if location is allowed (if "Available" is printed above)
    var position = await this.getPosition();
    console.log("POSITION");
    console.log(position);

    this.setState({location: new LocationInput(position.coords.latitude, position.coords.longitude)});
    console.log("location when it is set for realsies");
    console.log(this.state.location);

    axios.get(`https://api.mocki.io/v1/98d5b2a9`)
          .then(res => {
            const name1 = res.data[0].name;
            console.log("RES DATA");
            console.log(res.data[0].name);
            this.setState({name1: name1});

            const persons = res.data;
            console.log("PERSONS");
            console.log(persons);
            this.setState({ persons: persons });

            const length = res.data.length;
            var tasks = [];
            for (var i = 0; i < length; i++) {
              console.log(res.data[i].id);
              if(res.data[i].id === this.state.id) {
                console.log("ID FOUND");
                const taskLength = res.data[i].skills.length; //change to tasks
                for (var j = 0; j < taskLength; j++) {
                  tasks[j] = res.data[i].skills[j]; // change to tasks
                }
              }
            }
            this.setState({ tasks: tasks });
            console.log(tasks);
          })
  }

  getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  // timeout(delay) {
  //   return new Promise(res => setTimeout(res, delay) );
  // }

  render() {
    console.log("state.location");
    console.log(this.state.location);
    console.log("state.userId");
    console.log(this.state.userId);

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
      <div>
        <Link to={{pathname: '/skills', state: {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, accountType: this.state.accountType}}}>
          <button type="button" className="btn btn-primary">View My Skills</button>
        </Link>

        <Mutation variables={{
          id: this.state.userId,
          location: this.state.location
        }} mutation={MUTATE_WORKER_ACCOUNT_ADD_LOCATION}>
          {
              (addLocation) => {
              return (
                  <button type="button" className="btn btn-primary" onClick={() => this.addLocation(addLocation)}>Push Location</button>
                  );
              }
          }
        </Mutation>
        <ul className="list-group">
          <li className="list-group-item"><b>Tasks Assigned To Me</b></li>
          {this.state.tasks.map(task => <li className="list-group-item">{task}</li>)}
        </ul>
      </div>
        </div>
      </div>
    )
  }
}
