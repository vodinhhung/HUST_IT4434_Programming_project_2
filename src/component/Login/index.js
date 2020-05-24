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
    }
  }

  handleChange = (type, value) => {
    console.log(value.currentTarget.value, "value")
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
    console.log("login success", isLoginSucess)
    if (isLoginSucess){
      console.log("Login success")
    }
  }

  renderInputForm(type) {
    const { userName, password } = this.state;

    let label = type === 'password'? "Password":"Username";
    let defaultValue = type === 'password'? password : userName;

    return (
      <div>
        <div> {label} </div>
        <Input
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
          {/* <LoginInputForm
            defaultValue={"Name"}
          />
          <LoginInputForm
            defaultValue={"Password"}
            password={true}
          /> */}
          {this.renderInputForm('username')}
          {this.renderInputForm('password')}
        </div>
        <Button
          size="small"
          placeholder="Log in"
          onClick={() => this.handleClickSignInButton()}
          className="style-button"
        />
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