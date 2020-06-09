import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu, Button } from 'antd';
import './index.scss';
const Item = Menu.Item;

class HomeMenu extends Component {
  constructor(props){
    super(props);
  }

  handleOnClinkMenu = ({ key }) => {
    const { history } = this.props;
    history.push(key)
  }

  render() {
    const { auth } = this.props;
    const { name, type } = auth;

    return(
      <div className="menu-background">
        <div className="menu-info">
          Welcome {name}
        </div>
        <Menu
          onClick={this.handleOnClinkMenu}
          className="menu-content"
        >
          <Item key="/home"> Home </Item>
          <Item key="/userdetail"> User detail </Item>
          <Item key="/cart"> Cart </Item>
        </Menu>
        <Button>
          Logout
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps, 
  {

  }
)(HomeMenu);
