import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import { HashRouter as Router, Switch } from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <>
        <Router>
          <Switch />
          <Main />
        </Router> 
      </>
    );
  }
}

export default App;
