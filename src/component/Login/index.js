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
          
        />
      </div>
    )
  }
}
 
export default Login;