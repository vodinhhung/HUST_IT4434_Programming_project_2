import React, { Component } from 'react';
import './../../style/global.css';

import LoginInputForm from './../LoginInputForm/index';

class Login extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="login_wrapper">
        <LoginInputForm
          defaultValue={"Name"}
        />
        <LoginInputForm
          defaultValue={"Password"}
          password={true}
        />
      </div>
    )
  }
}
 
export default Login;