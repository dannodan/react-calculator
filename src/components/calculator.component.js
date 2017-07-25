import React, { Component } from 'react'
import Key from './key.component'
import Results from './results.component'

class Calculator extends Component {

  constructor(){
      super()

      this.state = {
          decimalSet: false, //
          showResult: true,
          result: "0",
          resultArray: []
      }
  }

  handleNumberPress(i) {
      const result = this.state.result
      console.log(result)
      const showResult = this.state.showResult
      if (showResult) {
        this.setState({result: i})
        this.setState({showResult: false})
      } else if (result === "0" && 48 <= i.charCodeAt(0) && i.charCodeAt(0) <= 57 && result.length === 1) {
        this.setState({result: i})
      } else {
        this.setState({result: result+i})
      }
  }

  isOperator(char, index) {
    switch(char.charCodeAt(index)) {
      case 47: return true
      case 45: return true
      case 43: return true
      case 42: return true
      default: return false
    }
  }

  endsInOperator(result) {
    if (result.charCodeAt(result.length-1) < 48 || result.charCodeAt(result.length-1) > 57) {
      return true
    } else {
      return false
    }
  }

  handleOperatorPress(o) {
      var result = this.state.result
      const resultArray = this.state.resultArray

      if (o.charCodeAt(0) === 61) { // Equals key is pressed
          if (this.endsInOperator(result)) {
            result = result.slice(0, result.length-1)
          }
          result = eval(result)
          if (!Number.isInteger(result)) { // Sets decimals to 2
            result = result.toFixed(2)
            this.setState({decimalSet: true})
          }
          this.setState({result: result.toString()})
          this.setState({showResult: true})
          if (resultArray.length > 4){
            resultArray.pop()
            this.setState({resultArray: resultArray})
          }
          resultArray.unshift(result)
          this.setState({resultArray: resultArray})
      } else if (o.charCodeAt(0) === 9003) { // Backspace key is pressed
          if (result.charCodeAt(result.length-1) === 46) {
            this.setState({decimalSet: false})
          }
          if (this.state.showResult) {
          } else if (result.length > 1) {
            this.setState({result: result.slice(0, result.length-1)})
          } else {
            this.setState({result: "0"})
          }
      } else if (o.charCodeAt(0) === 67 && o.charCodeAt(1) === 69) { // CE key is pressed
          this.setState({result: "0"})
          this.setState({resultArray: []})
          this.setState({showResult: true})
          this.setState({decimalSet: false})
      } else if (o.charCodeAt(0) === 67) { // C key is pressed
          this.setState({result: "0"})
          this.setState({showResult: true})
          this.setState({decimalSet: false})
      } else if (this.isOperator(o, 0)) { // Operator key is pressed
        console.log(result.length-1)
        if (this.isOperator(result, result.length-1)) {
          result = result.slice(0, result.length-1)
        }
        this.setState({decimalSet: false})
        this.setState({showResult: false})
        this.setState({result: result+o})
      } else if (o.charCodeAt(0) === 46) { // Dot key is pressed
        if (this.state.showResult) {
          this.setState({result: "0"+o})
          this.setState({showResult: false})
        } else if (!this.state.decimalSet) {
          this.setState({decimalSet: true})
          this.setState({showResult: false})
          if (result.charCodeAt(result.length-1) >= 48 && result.charCodeAt(result.length-1) <= 57) {
            this.setState({result: result+o})
          } else if (this.isOperator(result, result.length-1)) {
            this.setState({result: result+"0"+o})
          } else if (this.state.showResult) {
            this.setState({result: "0"+o})
          }
        }
      } else {
        console.log("Wut")
      }
  }

  renderNumber(i) { // Renders the number keys on the Keyboard
      return <Key keyValue={i} onKeyPress={() => this.handleNumberPress(i)}/>;
  }

  renderOperator(o) { // Renders the operator keys on the keyboard
      return <Key keyValue={o} onKeyPress={() => this.handleOperatorPress(o)}/>;
  }

  renderResults() { // Renders the result screen
      return <Results result={this.state.result} />
  }

  renderResultArray() { // Renders the result history for up to 5 results
      const resultArray = this.state.resultArray
      return resultArray.map((result, index) => <div className="result-history-div" key={index}>{result}<br/></div>)
  }

  render() { // Main render method

    return (
      <div className="container">
        <div className="keyboard">
          {this.renderResults()}
          <div className="board-row">
            {this.renderOperator("CE")}
            {this.renderOperator("C")}
            <div className="blank"/>
            {this.renderOperator("⌫")}
          </div>
          <div className="board-row">
            {this.renderNumber("7")}
            {this.renderNumber("8")}
            {this.renderNumber("9")}
            {this.renderOperator("/")}
          </div>
          <div className="board-row">
            {this.renderNumber("4")}
            {this.renderNumber("5")}
            {this.renderNumber("6")}
            {this.renderOperator("*")}
          </div>
          <div className="board-row">
            {this.renderNumber("1")}
            {this.renderNumber("2")}
            {this.renderNumber("3")}
            {this.renderOperator("-")}
          </div>
          <div className="board-row">
            {this.renderOperator(".")}
            {this.renderNumber("0")}
            {this.renderOperator("=")}
            {this.renderOperator("+")}
          </div>
        </div>
        <div className="result-history">
          <div className="result-history-title">Result History</div>
          {this.renderResultArray()}
        </div>
      </div>
    );
  }
}

export default Calculator