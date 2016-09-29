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

const data = [
  { key: 1, projectName: '灵通打单xxx', type: 'error', userAgent: 'IE8', time: 1992, details: 'a is not defined',
  	line: 1, column:13,stackTrace: 'balabalabalabalabalabalabalabala', },
  { key: 2, projectName: '灵通短信', type: 'error', userAgent: 'IE9', time: 2005, details: 'b is not defined' ,
  	line: 11, column:133,stackTrace: 'balabalabalabalabalabalabalabala'},
  { key: 3, projectName: '百世店家', type: 'performance', userAgent: 'chrome', time: 2015, details: 'c is not defined',
  	line: 1, column:7,stackTrace: 'balabalabalabalabalabalabalabala'}
];

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Table
      columns={columns}
      expandedRowRender={record => record.type === 'error' ? <div><p>第{record.line}行,第{record.column}列</p><p>{record.stackTrace}</p></div> :
         <p>加载首页花费了890ms</p>}
      dataSource={data}
      className="table"
    />
  }
}
module.exports = Grid;