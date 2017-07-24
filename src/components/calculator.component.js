import React, { Component } from 'react'
import Keyboard from './keyboard.component'

class Calculator extends Component {
  render() {
    return (
      <div className="container">
          <Keyboard/>
      </div>
    );
  }
}

export default Calculator