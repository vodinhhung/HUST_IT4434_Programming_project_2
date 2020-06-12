import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './index.scss';

const Item = Menu.Item;

class HomeMenu extends Component {
  constructor(props){
    super(props);
  }

  handleOnClinkMenu = ({ key }) => {
    const { history } = this.props;

    if (key != "logout") {
      history.push(key)
    } else {
      let url = `https://hustshop.azurewebsites.net/rest/connect/logout`;

      axios.get(url).then(res => {
        if(res.data === "Logged out") {
          history.push("/")
        }
      })
    }
  }

  handleLogOut = e => {
    let url = `https://hustshop.azurewebsites.net/rest/connect/logout`
    const { history } = this.props;

    axios.get(url).then(res => {
      if(res.data === "Logged out") {
        history.push("/")
      }
    })
  };

  render() {
    const { user } = this.props;
    const { type } = user;

    const menu = (
      <Menu
        onClick={this.handleOnClinkMenu}
        className="menu-content"
      >
        <Item key="/home"> Home </Item>
        <Item key="/userdetail"> Detail </Item>
        <Item key="/cart"> Cart </Item>
        { type == 1 &&
          <Item key="/order"> Order </Item>
        }
        { type == 1 &&
          <Item key="/account"> Account </Item>
        }
        <Item key="logout"> Logout</Item>
      </Menu>
    );

    return(
      <div className="menu-background">
        <div className="menu-content"> HUSTSHOP </div>
        <a
          className="cart"
          onClick={() => this.handleOnClinkMenu('/cart')}>
          <ShoppingCartOutlined style={{ fontSize: 20}}/>
        </a>
        <Dropdown
          overlay={menu}
          className="menu-dropdown"
        >
          <a 
            className="ant-dropdown-link" 
            onClick={e => e.preventDefault()}>
            <UserOutlined style={{ fontSize: 20}}/>
          </a>
        </Dropdown>
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
