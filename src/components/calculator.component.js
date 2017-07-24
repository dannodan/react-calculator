import React, { Component } from 'react'
import Keyboard from './keyboard.component'

class Calculator extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Keyboard/>
        </div>
        <div className="game-info">
          <div></div>
        </div>
      </div>
    );
  }
}

export default Calculator