import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Tasks from "./components/tasks.component";
import Assignments from "./components/assignments.component";
import Skills from "./components/skills.component";

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>sdmay21-51</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/tasks"}>Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/assignments"}>Assignments</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/skills"}>Skills</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/assignments" component={Assignments} />
            <Route path="/skills" component={Skills} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;