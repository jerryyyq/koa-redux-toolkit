import React, { Component } from 'react'

import { Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'

const FormItem = Form.Item

export class LoginForm extends Component
{
    render ()
    {
        if (undefined === this.props.userinfo.showname)
        {
            return (
                <Form onSubmit={this.props.handleSubmit}>
                    <FormItem label='账户'>
                        <Input placeholder='请输入账户名' name='name' onChange={this.props.handleNameChange} value={this.props.userName} />
                    </FormItem>

                    <FormItem label='密码'>
                        <Input type='password' name='pwd' placeholder='请输入密码' onChange={this.props.handlePasswordChange} value={this.props.password} />
                    </FormItem>

                    <FormItem>
                        <Checkbox name='remember' onChange={this.props.handleAgreeChange} value={this.props.remember}>记住我</Checkbox>
                    </FormItem>

                    <Button type='primary' htmlType='submit'>登录</Button>
                </Form>
            )
        }
        else
        {
            return (
                <Form onSubmit={this.props.handleLogout}>
                    <p> 欢迎您： {this.props.userinfo.showname}&nbsp;
                        <Button type='primary' htmlType='submit'>登出</Button>
                    </p>
                </Form>
            )
        }
    }
}

LoginForm.propTypes = {
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
    remember: React.PropTypes.bool,
    userinfo: React.PropTypes.object,
    handleNameChange: React.PropTypes.func.isRequired,
    handlePasswordChange: React.PropTypes.func.isRequired,
    handleAgreeChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    handleLogout: React.PropTypes.func.isRequired
}

export default LoginForm
