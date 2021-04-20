import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import axios from 'axios';
import { Mutation } from "@apollo/client/react/components";
import { MUTATE_WORKER_ACCOUNT_ADD_SKILL } from './mutations';
import { SkillInput } from '../classes/SkillInput';
import { LocationInput } from '../classes/LocationInput';

export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.addSkill = this.addSkill.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setNewSkillName = this.setNewSkillName.bind(this);
    this.setNewSkillRating = this.setNewSkillRating.bind(this);
  } 

  state = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    skills: [new SkillInput("html", 5), new SkillInput("css", 4)],
    location: null,
    showModal: false,
    newSkill: null,
    //mostly crap below here
    persons: [],
    name1: null,
    test: null,
    personNames: [],
    id: 1,
  };

  addSkill(addSkill) {
    addSkill()
      .then(res => {
        console.log("post response");
        console.log(res);
      })
    this.setState({skills: [...this.state.skills, ...[this.state.newSkill]]});
    this.toggleModal();
  }

  toggleModal() {
    console.log("toggleModal");
    console.log(this.state.showModal);
    const currentState = this.state.showModal;
    this.setState({showModal: !currentState});
  };

  setNewSkillName(event) {
    var rating = null;
    if (this?.state?.newSkill?.rating != null) {
      rating = this.state.newSkill.rating;
    }
    this.setState({newSkill: new SkillInput(event.target.value, rating)});
  }

  setNewSkillRating(event) {
    var name = null;
    if (this?.state?.newSkill?.name != null) {
      name = this.state.newSkill.name;
    }
    this.setState({newSkill: new SkillInput(name, event.target.value)});
  }

  updateNewSkill() {
    var name = document.getElementById("skillEntered").value;
    var rating = document.getElementById("skillRatingEntered").value;
    this.setState({newSkill: new SkillInput(name, rating)});
  }

  componentDidMount() {
    console.log("userId in local storage");
    console.log(localStorage.getItem('userId'));
    this.setState({userId: localStorage.getItem('userId')});
    if (this?.props?.location?.state !== undefined) {
      // this.setState({firstName: this.props.location.state.firstName});
      // this.setState({lastName: this.props.location.state.lastName});
      // this.setState({email: this.props.location.state.email});
      // this.setState({accountType: this.props.location.state.accountType});
    }

    // axios.get(`https://api.mocki.io/v1/98d5b2a9`)
    //       .then(res => {
    //         const name1 = res.data[0].name;
    //         console.log("RES DATA");
    //         console.log(res.data[0].name);
    //         this.setState({name1: name1});

    //         const persons = res.data;
    //         console.log("PERSONS");
    //         console.log(persons);
    //         this.setState({ persons: persons });

    //         const length = res.data.length;
    //         var skills = [];
    //         for (var i = 0; i < length; i++) {
    //           console.log(res.data[i].id);
    //           if(res.data[i].id === this.state.id) {
    //             console.log("ID FOUND");
    //             const skillLength = res.data[i].skills.length;
    //             for (var j = 0; j < skillLength; j++) {
    //               skills[j] = res.data[i].skills[j];
    //             }
    //           }
    //         }
    //         this.setState({ skills: skills });
    //         console.log(skills);


    //         console.log(persons.filter((person) => person.id === 1));
    //       })



        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        //   .then(res => {
        //     const name1 = res.data[0].name;
        //     console.log("RES DATA");
        //     console.log(res.data[0].name);
        //     this.setState({name1: name1});

        //     const persons = res.data;
        //     console.log("PERSONS");
        //     console.log(persons);
        //     this.setState({ persons: persons });

        //     const length = res.data.length;
        //     var personNames = [];
        //     for (var i = 0; i < length; i++){
        //       personNames[i] = res.data[i].name;
        //     }
        //     this.setState({personNames: personNames});
        //     // console.log(persons.filter((person) => person.id === 1));
        //   })

    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //     var json = JSON.parse(persons);
    //     this.setState({id1: json[0].id});
    //   })

    // axios.get('https://jsonplaceholder.typicode.com/users')
    //   .then(res => {
    //     const {id, name} = res.data;
    //     this.setState(state => {
    //         const persons = state.persons.concat({id, name})

    //         return {
    //             persons,
    //         };
    //     });
    //   })
    this.interval = setInterval(() => this.updateNewSkill(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addSkillModal" onClick={this.toggleModal}>
          Add Skill
        </button>

        <div className={this.state.showModal ? 'modal modalShow': 'modal modalHide'}  id="addSkillModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Skill</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input id="skillEntered" type="text" className="form-control" placeholder="Enter Skill" onChange={this.setNewSkillName}/>
                </div>
                <div className="form-group">
                  <input id="skillRatingEntered" type="text" className="form-control" placeholder="Enter Skill Proficiency (1-5)" onChange={this.setNewSkillRating}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.toggleModal}>Close</button>
                <Mutation variables={{
                        id: this.state.userId,
                        skills: [...this.state.skills, ...[this.state.newSkill]]
                    }} mutation={MUTATE_WORKER_ACCOUNT_ADD_SKILL}>
                        {
                            (addSkill) => {
                            return (
                              <button type="button" className="btn btn-primary" onClick={() => this.addSkill(addSkill)}>Save changes</button>
                                );
                            }
                        }
                    </Mutation>
              </div>
            </div>
          </div>
        </div>

        <ul className="list-group">
          <li className="list-group-item"><b>My Skills</b></li>
          {this.state.skills.map(skill => <li className="list-group-item d-flex justify-content-between align-items-center">{skill.name}<Badge>{skill.rating}</Badge></li>)}
        </ul>
      </div>
            </div>
        </div>
    )
  }
}
