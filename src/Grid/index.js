import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';
import Table from './table';

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div><br /><SearchForm /><br /><Table /></div>
  }
}
module.exports = Grid;