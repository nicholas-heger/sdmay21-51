import React, { Component } from "react";

import axios from 'axios';

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  } 

  state = {
    email: null,
    accountType: null,
    persons: [],
    name1: null,
    test: null,
    personNames: [],
    id: 1,
    tasks: [],
    showModal: false,
  };

  addTask() {
    // POST
    this.toggleModal();
  }

  toggleModal() {
    console.log("toggleModal");
    console.log(this.state.showModal);
    const currentState = this.state.showModal;
    this.setState({showModal: !currentState});
    console.log(this.state.accountType);
  };

  componentDidMount() {
    // Data from sign up page
    console.log("Account Type");
    console.log(this.props.location.state.accountType);
    this.setState({email: this.props.location.state.email})
    this.setState({accountType: this.props.location.state.accountType})

    // Get request
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

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createTaskModal" onClick={this.toggleModal}>
          Create Task
        </button>

        <div className={this.state.showModal ? 'modal modalShow': 'modal modalHide'}  id="createTaskModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input id="taskEntered" type="text" className="form-control" placeholder="Task Title" />
                </div>
                <div className="form-group">
                  <input id="skillRequired" type="text" className="form-control" placeholder="Enter Skill Required" />
                </div>
                <div className="form-group">
                  <input id="latitudeEntered" type="text" className="form-control" placeholder="Enter Latitude" />
                </div>
                <div className="form-group">
                  <input id="longitudeEntered" type="text" className="form-control" placeholder="Enter Longitude" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.toggleModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.addTask}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <ul className="list-group">
          { this.state.tasks.map(task => <li className="list-group-item">{task}</li>)}
        </ul>
      </div>
    )
  }
}
