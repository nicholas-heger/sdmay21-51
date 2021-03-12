import React, { Component } from "react";

import axios from 'axios';

export default class Skills extends Component {
  state = {
    totalReactPackages: null,
    persons: [],
    name1: null,
    test: null,
    personNames: [],
    id: 1,
    skills: [],
  }

  componentDidMount() {
    // axios.get('https://api.npms.io/v2/search?q=react').then(response => this.setState({ totalReactPackages: response.data.total }));

    // axios.get('https://jsonplaceholder.typicode.com/users')
    // .then(response => this.setState({ test: response.data }));

    // axios.get('http://headers.jsontest.com/')
    //     .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //     this.setState({test: persons.Host});
    // })

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
            var skills = [];
            for (var i = 0; i < length; i++) {
              console.log(res.data[i].id);
              if(res.data[i].id === this.state.id) {
                console.log("ID FOUND");
                const skillLength = res.data[i].skills.length;
                for (var j = 0; j < skillLength; j++) {
                  skills[j] = res.data[i].skills[j];
                }
              }
            }
            this.setState({ skills: skills });
            console.log(skills);


            // console.log(persons.filter((person) => person.id === 1));
          })

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
  }

  render() {
    // const { totalReactPackages } = this.state;
    return (
        // <div className="card text-center m-3">
        //     <h5 className="card-header">Simple GET Request</h5>
        //     <div className="card-body">
        //         Total react packages: {totalReactPackages}
        //     </div>
        // </div>

        // <ul>
        //     {this.state.name1}
        // </ul>

      // <ul>
      //   { this.state.persons.map(person => <li>{person.name}</li>)}
      // </ul>
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Add Skill
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Some Text
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <ul className="list-group">
          { this.state.skills.map(skill => <li className="list-group-item">{skill}</li>)}
        </ul>
      </div>
    )
  }
}
