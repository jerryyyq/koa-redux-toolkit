import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { onLoginSubmit } from './login-module'

import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css'

const FormItem = Form.Item;

export class LoginForm extends Component
{
    render() 
    {
        return (
        <Form inline onSubmit={this.props.handleSubmit}>
            <FormItem label="账户">
            <Input placeholder="请输入账户名" name="name" onChange={this.props.handleNameChange} value={ this.props.userName } />
            </FormItem>

            <FormItem label="密码">
            <Input type="password" name="pwd" placeholder="请输入密码" onChange={this.props.handlePasswordChange} value={ this.props.password } />
            </FormItem>

            <FormItem>
            <Checkbox name="agree" onChange={this.props.handleAgreeChange} value={ this.props.agreement }>记住我</Checkbox>
            </FormItem>

            <Button type="primary" htmlType="submit">登录</Button>
        </Form>
        );
    }
}


LoginForm.propTypes = {
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
    agreement: React.PropTypes.bool,
    handleNameChange: React.PropTypes.func.isRequired,
    handlePasswordChange: React.PropTypes.func.isRequired,
    handleAgreeChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
}


export default LoginForm