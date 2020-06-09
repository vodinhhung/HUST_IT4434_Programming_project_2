import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../style/global.css';
import './index.scss';
import Router from 'next/router';

import { Button, Input } from 'antd';
import {
  checkLoginStatus
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
    const { checkLoginStatus } = this.props;

    let params = {
      username: userName,
      password: password,
    }

    let isLoginSucess =  await checkLoginStatus(params);
    if (isLoginSucess){
    }
  }

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
              {title}
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
    checkLoginStatus
  }
)(Login);