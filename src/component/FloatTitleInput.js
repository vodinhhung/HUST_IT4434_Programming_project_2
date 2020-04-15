import { Component } from "react";
import { Input } from "antd";

class FloatTitleInput extends Component {
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

  // getInputValue() {
  //   const
  // }

  render() {
    const { password } = this.props;
    return (
      <div>
        <Input
          onChange={this.handleChange}
          type={password? 'password' : 'text'}
          value={this.getInputValue()}
        />
      </div>
    )
  }
}

export default FloatTitleInput;