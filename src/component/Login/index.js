import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../style/global.css';
import './index.scss';

import { Button, Input, notification } from 'antd';
import {
  checkLoginStatus,
  createNewCustomer,
} from './../../action';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      userName: "",
      password: "",
      isCreating: false,
      isLogin: false,
    }
  }

  handleChange = (type, value) => {
    if (type === 'username'){
      this.setState({ userName: value.currentTarget.value});
    }
    if (type === 'password'){
      this.setState({ password: value.currentTarget.value});
    }
  }

  handleClickSignInButton = async () => {
    const { userName, password } = this.state;
    const { checkLoginStatus, history } = this.props;

    if (this.checkNull(userName) || this.checkNull(password)){
      return notification.open({
        message: "Login fail",
        description: "Username or password can't be empty",
      })
    }

    let params = {
      username: userName,
      password: password,
    }

    await checkLoginStatus(params)
      .then(res => {
        if (res.status === 'Success'){
          history.push('/home')
        } else {
          return notification.open({
            message: "Login fail",
            description: "",
          })
        }
      })
  }

  handleSignUp = async () => {
    const { userName, password } = this.state;
    const { createNewCustomer } = this.props;

    if (this.checkNull(userName) || this.checkNull(password)){
      return notification.open({
        message: "Signup fail",
        description: "Username or password can't be empty",
      })
    }

    let params = {
      username: userName,
      password: password,
    }

    await createNewCustomer(params)
      .then(res => {
        if (res.status === 'Success'){
          return notification.open({
            message: "Signup success",
            description: "Enter username and password to login",
          })
        } else {
          return notification.open({
            message: "Signup fail",
            description: "",
          })
        }
      })
  }

  checkNull = value => value === null || value === ''

  renderInputForm(type) {
    const { userName, password } = this.state;

    let label = type === 'password'? "Password":"Username";
    let defaultValue = type === 'password'? password : userName;

    return (
      <div className="input_login">
        <Input
          className="box_input"
          onChange={(value) => this.handleChange(type, value)}
          defaultValue={defaultValue}
          placeholder={label}
        />
      </div>
    )
  }

  render(){
    const { isSignup } = this.props;
    const title = isSignup? "Signup" : "Login"

    return(
      <div className="login_background">
        <div className="login_info">
          <div className="login_title_content">
            {title}
          </div>
          <div className="login_input">
            {this.renderInputForm('username')}
            {this.renderInputForm('password')}
          </div>
          <div className="login_button">
            <Button
              onClick={() => this.handleClickSignInButton()}
              className="button"
            >
              Login
            </Button>
            <Button
              onClick={() => this.handleSignUp()}
              className="button"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}
 
export default connect(
  mapStateToProps,
  {
    checkLoginStatus,
    createNewCustomer,
  }
)(Login);