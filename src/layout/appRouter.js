import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router';
import App from '../layout/'
import Dashboard from '../dashboard.js';
import Grid from '../Grid/';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="search" component={Grid}/>
    </Route>
  </Router>
), document.getElementById('root'))