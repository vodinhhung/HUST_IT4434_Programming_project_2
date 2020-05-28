import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../style/global.css';
import './index.scss';

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
      <div style={{ display: 'flex' }}>
        <div> {label} </div>
        <Input
          className="input_login"
          onChange={(value) => this.handleChange(type, value)}
          defaultValue={defaultValue}
        />
      </div>
    )
  }

  render(){
    return(
      <div className="background">
        <div className="login_wrapper">
          {this.renderInputForm('username')}
          {this.renderInputForm('password')}
        </div>
        <Button
          size="small"
          onClick={() => this.handleClickSignInButton()}
        >
          Login
          </Button>
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