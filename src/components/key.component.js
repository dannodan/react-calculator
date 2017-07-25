import React, { Component } from 'react'

class Key extends Component {
  render() {
    return (
      <button className="key" onClick={() => this.props.onKeyPress()}>
        {this.props.keyValue}
      </button>
    );
  }
}

export default Key