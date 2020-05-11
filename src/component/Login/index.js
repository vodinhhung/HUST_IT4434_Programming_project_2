import React, { Component } from 'react';
import './../../style/global.css';
import './index.scss';

import LoginInputForm from './../LoginInputForm/index';

class Login extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <body className="background">
        <div className="login_wrapper">
          <LoginInputForm
            defaultValue={"Name"}
          />
          <LoginInputForm
            defaultValue={"Password"}
            password={true}
          />
        </div>
      </body>
      
    )
  }
}
 
export default Login;