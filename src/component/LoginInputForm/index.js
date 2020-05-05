import { Component } from "react";
import { Input } from "antd";

class LoginInput extends Component {
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
    return (
      <div>
        <div> Label </div>
        <Input
          onChange={this.handleChange}
          type={password? 'password' : 'text'}
          defaultValue={defaultValue}
        />
      </div>
    )
  }
}

export default LoginInput;