import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/main.css';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Manage from './components/Manage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route component={Menu} path="/" exact />
            <Route component={Quiz} path="/quiz" />
            <Route component={Manage} path="/manage" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
