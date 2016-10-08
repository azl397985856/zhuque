import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="zq-layout">
        <div className="zq-logo">
        </div>
        {this.props.children}
      </div>
    )
  }
}
module.exports = App;