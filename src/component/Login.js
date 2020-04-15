import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/global.css';
import { Input } from 'antd';

class Login extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="login_wrapper">
        <Input/>
      </div>
    )
  }
}
 
export default Login;