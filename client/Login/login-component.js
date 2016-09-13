import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { onLoginSubmit } from './login-module'

import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

export class LoginForm extends Component
{
    handleSubmit(e)
    {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    };

    render() 
    {
        const { userName, password, agreement } = this.props;
        return (
        <Form inline onSubmit={this.handleSubmit}>
            <FormItem label="账户">
            <Input placeholder="请输入账户名"
                value={ userName }
            />
            </FormItem>

            <FormItem label="密码">
            <Input type="password" placeholder="请输入密码"
                value={ password }
            />
            </FormItem>

            <FormItem>
            <Checkbox value={ agreement }>记住我</Checkbox>
            </FormItem>

            <Button type="primary" htmlType="submit">登录</Button>
        </Form>
        );
    }
}


LoginForm.propTypes = {
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
    agreement: React.PropTypes.bool
    //handleSubmit: React.PropTypes.func.isRequired
}


export default LoginForm