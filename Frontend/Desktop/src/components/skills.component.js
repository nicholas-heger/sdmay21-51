import React, { Component } from "react";

import axios from 'axios';

export default class Skills extends Component {
  state = {
    // totalReactPackages: null,
    persons: [],
    id1: null,
    test: null
  }

  componentDidMount() {
    // axios.get('https://api.npms.io/v2/search?q=react').then(response => this.setState({ totalReactPackages: response.data.total }));

    // axios.get('https://jsonplaceholder.typicode.com/users')
    // .then(response => this.setState({ test: response.data }));

    axios.get('http://headers.jsontest.com/')
        .then(res => {
        const persons = res.data;
        this.setState({ persons });
        this.setState({test: persons.Host});
    })

    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //       .then(res => {
    //         const persons = res.data;
    //         this.setState({ persons });
    //       })

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

        <ul>
            {this.state.test}
        </ul>

    //   <ul>
    //     { this.state.persons.map(person => <li>{person.name}</li>)}
    //   </ul>
    )
  }
}
