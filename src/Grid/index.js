import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';
import Table from './table';
import fetch from 'isomorphic-fetch';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	logs: []
    }
    this.search = this.search.bind(this);
   	this.search({
   		type: window.localStorage.type
   	});
  }
  search(searchTerm) {
  	 fetch('http://localhost:1333/search', {
	    	method: 'POST',
	    	headers: {
				'Content-Type': 'application/json',
			},
      credentials: 'include',
			body: JSON.stringify(searchTerm),
	    })
		.then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
	        return response.json();
	    })
    .then(result => {
       if (result.error === '请重新登录') {
        // 重定向到首页进行统一的错误处理
        window.location.href = 'http://localhost:1024/webpack-dev-server/index.html'
       } else {
        return result;
       }
      })
	    .then(logs => this.setState({logs,})
	);
  }
  render() {
    return <div>
    	<br />
    	<SearchForm onSearch={this.search}/><br />
    	<Table logs={this.state.logs} />
	</div>
  }
}
module.exports = Grid;