import React, { Component } from 'react';
import logo from './logo.svg';
import Calculator from './components/calculator.component'
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React Calculator</h2>
          </div>
          <Calculator/>
        </div>
    );
  }
}

export default App;
