import { Form, Input, Row, Col, Button, DatePicker, Select } from 'antd';
import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const createForm = Form.create;

function onFieldChange(field, setFieldsValue, e) {
  const value = e.target ? e.target.value : e;
  const obj = {};
  obj[field] = value;
  setFieldsValue(obj);
}

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.clearForm = this.clearForm.bind(this);
    this.search = this.search.bind(this);
    this.props.form.setFieldsValue({
      type: window.localStorage.type || '',
    });
  }
  clearForm(e) {
    this.props.form.setFieldsValue({
      projectName: '',
      userAgent: '',
      type: '',
      time: '',
      userId: '',
    });
  }
  search(e) {
   this.props.onSearch(this.props.form.getFieldsValue());
  }
  render() {
    const { setFieldsValue, getFieldValue, getFieldDecorator } = this.props.form;
    return <Form horizontal className="ant-advanced-search-form">
    <Row gutter={16}>
      <Col sm={8}>
        <FormItem
          label="项目名"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
        {
          getFieldDecorator('projectName')(
            <Input
              placeholder="暂不支持模糊查询"
              size="default"
            />
          )
        }
        </FormItem>
        <FormItem
          label="浏览器"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
        {
          getFieldDecorator('userAgent')(
          <Input
            placeholder="暂不支持模糊查询"
            size="default"
          />
          )
        }
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="类型"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
        {
          getFieldDecorator('type')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="">--全部--</Option>
            <Option value="error">错误</Option>
            <Option value="performance">性能</Option>
          </Select>
          )
        }
        </FormItem>
        <FormItem
          label="时间"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
        {
          getFieldDecorator('time')(
          <RangePicker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
          />
          )
        }
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="用户ID"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
       {
          getFieldDecorator('userId')(
          <Input
            placeholder="输入用户ID"
            size="default"
          />
          )
        }
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={12} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>&nbsp;&nbsp;
        <Button onClick={this.clearForm}>清除</Button>
      </Col>
    </Row>
  </Form>
  }
}
SearchForm = createForm()(SearchForm);
module.exports = SearchForm;