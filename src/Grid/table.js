import { Table } from 'antd';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const columns = [
  { title: '项目名', dataIndex: 'projectName', key: 'projectName' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '浏览器', dataIndex: 'userAgent', key: 'userAgent' },
  { title: '日期', dataIndex: 'time', key: 'time'},
  { title: '详细信息', dataIndex: 'details', key: 'details'}
];

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Table
      columns={columns}
      expandedRowRender={record => <p>加载首页花费了890ms</p>}
      dataSource={this.props.logs}
      className="table"
    />
  }
}
module.exports = Grid;