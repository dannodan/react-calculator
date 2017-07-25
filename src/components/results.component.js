import React, { Component } from 'react'

class Results extends Component {
  render() {
    return (
      <div className="input">
        {this.props.result}
      </div>
    );
  }
}

export default Results