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
      email: "",
      isCreating: false,
      isLogin: true,
    }
  }

  handleClickChangeToCreate = () => {
    this.setState({
      isCreating: true,
      isLogin: false,
    })
  }

  handleChange = (type, value) => {
    if (type === 'username'){
      this.setState({ userName: value.currentTarget.value});
    } else if (type === 'password'){
      this.setState({ password: value.currentTarget.value});
    } else {
      this.setState({ email: value.currentTarget.value});
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
        } else if (res.status === "Fail/account locked"){
          return notification.open({
            message: "Login blocked",
            description: "",
          })
        } else {
          return notification.open({
            message: "Login fail",
            description: "Username or password is not right"
          })
        }
      })
  }

  handleSignUp = async () => {
    const { userName, password, email } = this.state;
    const { createNewCustomer } = this.props;

    if (this.checkNull(userName) || this.checkNull(password) || this.checkNull(email)){
      return notification.open({
        message: "Signup fail",
        description: "Username or password can't be empty",
      })
    }

    let params = {
      username: userName,
      password: password,
      email: email,
    }

    await createNewCustomer(params)
      .then(res => {
        if (res.status === 'Success'){
          notification.open({
            message: "Signup success",
            description: "Enter username and password to login",
          })
          this.setState({
            isCreating: false,
            isLogin: true,
          })
        } else if(res.status === "Fail/username already exists") {
          return notification.open({
            message: "Signup fail",
            description: "Username already exists",
          })
        } else {
          return notification.open({
            message: "Signup fail",
            description: "Email already exists",
          })
        }
      })
  }

  checkNull = value => value === null || value === ''

  handleClickReturnLogin = () => {
    this.setState({
      isCreating: false,
      isLogin: true,
    })
  }

  renderInputForm(type) {
    const { userName, password, email } = this.state;

    let label = type === 'password'? "Password":"Username";
    let defaultValue = type === 'password'? password : userName;
    if(type === 'email') {
      label = "Email";
      defaultValue = email
    } 

    if(type === 'password') {
      return (
        <div className="input_login">
          <Input.Password
            className="box_input"
            onChange={(value) => this.handleChange(type, value)}
            defaultValue={defaultValue}
            placeholder={label}
          />
        </div>
      )
    }

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
    const { isCreating, isLogin } = this.state;
    const title = isCreating? "Sign up" : "Login"

    return(
      <div className="login_background">
        <div className="login_info">
          <div className="login_title_content">
            {title}
          </div>
          <div className="login_input">
            {this.renderInputForm('username')}
            {isCreating && this.renderInputForm('email')}
            {this.renderInputForm('password')}
          </div>
          {isLogin && 
            <div 
            className="create_account"
            onClick={() => this.handleClickChangeToCreate()}>
            Create an account
            </div>
          }
          {isCreating && 
            <div
              className="create_account"
              onClick={() => this.handleClickReturnLogin()}>
                Return to login
            </div>
          }
          <div className="login_button">
            {isLogin && 
              <Button
                onClick={() => this.handleClickSignInButton()}
                className="button"
              >
                Login
              </Button>
            }
            {isCreating && 
              <Button
                onClick={() => this.handleSignUp()}
                className="button"
              >
                Sign up
              </Button>
            }
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