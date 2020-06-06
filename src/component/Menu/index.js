import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu } from 'antd';
import './index.scss';
const Item = Menu.Item;

class HomeMenu extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const name = "Hung"

    return(
      <div className="menu-background">
        <div className="menu-info">
          Welcome {name}
        </div>
        <Menu className="menu-content">
          <Item> Home </Item>
          <Item> User detail </Item>
          <Item> Cart </Item>
          <Item> Like </Item>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps, {})(HomeMenu);
