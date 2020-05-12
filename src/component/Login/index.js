import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../style/global.css';
import './index.scss';

import { Button, Input } from 'antd';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      userName: "",
      password: "",
    }
  }

  handleChange = (type, value) => {
    if (type == 'username'){
      this.setState({ userName: value.currentTarget.value});
    }
    if (type == 'password'){
      this.setState({ password: value.currentTarget.value});
    }
  }

  handleClickSignInButton = () => {
    const { userName, password } = this.state;
    
    let params = {
      username: userName,
      password: password,
    }
  }

  renderInputForm(type) {
    const { userName, password } = this.state;

    let label = type == 'password'? "Password":"Username";
    let defaultValue = type == 'password'? password : userName;

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

  }
)(Login);