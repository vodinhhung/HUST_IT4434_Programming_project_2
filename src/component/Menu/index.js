import React, { Component } from "react";
import { connect } from "react-redux";
// import Link from 'next/link';
// import Router from 'next/router';

import { Menu } from 'antd';
import './index.scss';
const Item = Menu.Item;

class HomeMenu extends Component {
  constructor(props){
    super(props);
  }

  // handleOnClinkMenu = ({ key }) => {
  //   Router.push(key)
  // }

  render() {
    const name = "Hung"

    return(
      <div className="menu-background">
        <div className="menu-info">
          Welcome {name}
        </div>
        <Menu 
          className="menu-content">
          <Item key="/"> 
            Home
          </Item>
          <Item key="/userdetail">
          </Item>
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
