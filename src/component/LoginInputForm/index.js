import React, { Component } from "react";
import { Input } from "antd";

class LoginInputForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.defaultValue || '',
    }
  }

  handleChange = e => {
    const { onChange } = this.props;
    const value = e.currentTarget.value;
    this.setState({ value: e.currentTarget.value });
    if (onChange && typeof onChange === 'function') onChange(value);
  }

  render() {
    const { password, defaultValue } = this.props;

    let label = password? "Password":"Username";

    return (
      <div>
        <div> {label} </div>
        <Input
          onChange={this.handleChange}
          type={password? 'password' : 'text'}
          defaultValue={defaultValue}
        />
      </div>
    )
  }
}

export default LoginInputForm;