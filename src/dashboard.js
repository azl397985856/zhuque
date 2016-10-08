import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import 'antd/dist/antd.css';
import './layout.less'
import './dashboard.less';
import fetch from 'isomorphic-fetch';

// dashboard
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	counts: {},
    }
    this.beforeNavigate = this.beforeNavigate.bind(this);
    fetch('http://localhost:1333/dashboard', {
	    	method: 'POST',
	    	headers: {
				'Content-Type': 'application/json',
			}
	    })
		.then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
	        return response.json();
	    })
	    .then(counts => this.setState({counts,})
	);
	}
	beforeNavigate(type) {
		window.localStorage.type = type;
	}
  render() {
    return <div>
    <div className="zq-dashboard">
	    <div className="item item-type-line">
			<a className="item-hover" href="/#search?type=error" onClick={this.beforeNavigate.bind(null, 'error')}>
				<div className="item-info">
					<div className="headline">错误日志收集</div>
					<div className="line"></div>
					<div className="date">朱雀平台</div>
				</div>
				<div className="mask"></div>
			</a>
			<div className="item-img">
				<img src="assets/error.jpg" alt="" />
				<span className="text-red fs-20">{this.state.counts.errorCount}</span>条
			</div>
		</div>
		<div className="item item-type-line">
			<a className="item-hover" href="/#search?type=perf" onClick={this.beforeNavigate.bind(null, 'performance')}>
				<div className="item-info">
					<div className="headline">性能日志收集</div>
					<div className="line"></div>
					<div className="date">朱雀平台</div>
				</div>
				<div className="mask"></div>
			</a>
			<div className="item-img">
				<img src="assets/perf.png" alt="" />
				<span className="text-red fs-20">{this.state.counts.perfCount}</span>条
			</div>
		</div>
		</div>
		<div className="zq-dashboard-graph">
		<span className="fs-20">这一块区域放置图标统计信息</span>
		</div>
	</div>
  }
}
module.exports = Dashboard;
