import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Menu, Button, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import './index.scss';
import Logo from './logo.png'

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
        if(res.data.status === "Success") {
          history.push("/login")
        }
      })
    }
  }

  handleLogOut = e => {
    let url = `https://hustshop.azurewebsites.net/rest/connect/logout`
    const { history } = this.props;

    axios.get(url).then(res => {
      if(res.data.status === "Success") {
        history.push("/login")
      }
    })
  };

  handleClickCart= () => {
    const { history } = this.props;
    history.push("/cart")
  }

  handleClickHome = () => {
    const { history } = this.props;
    history.push('/')
  }

  handleClickLogin = () => {
    const { history } = this.props;
    history.push('/login')
  }

  render() {
    const { user } = this.props;
    const { type } = user;

    const menuUser = (
      <Menu
        onClick={this.handleOnClinkMenu}
        className="menu-content"
      >
        <Item key="/"> Home </Item>
        <Item key="/userdetail"> Detail </Item>
        <Item key="/userorder"> Order </Item>
        <Item key="logout"> Logout</Item>
      </Menu>
    );

    const menuAdmin = (
      <Menu
        onClick={this.handleOnClinkMenu}
        className="menu-content"
      >
        <Item key="/order"> Manage order </Item>
        <Item key="/account"> Manage account </Item>
      </Menu>
    )

    return(
      <div className="menu-background">
        <img src={Logo} className="menu-logo" onClick={() => this.handleClickHome()}/>
        <div className="menu-content"> HUSTSHOP </div>
        {type !== undefined &&
          <div
            className="cart"
            onClick={() => this.handleClickCart()}
          >
            <ShoppingCartOutlined style={{ fontSize: 20}}/>
          </div>
        }
        {type !== undefined && type == 1 &&
          <Dropdown
            overlay={menuAdmin}
            className="menu-dropdown"
            placement="bottomRight"
          >
            <a 
              className="ant-dropdown-link" 
              onClick={e => e.preventDefault()}>
              <SettingOutlined style={{ fontSize: 20}}/>
            </a>
          </Dropdown>
        }
        {type !== undefined && 
          <Dropdown
            overlay={menuUser}
            className="menu-dropdown"
            placement="bottomRight"
          >
            <a 
              className="ant-dropdown-link" 
              onClick={e => e.preventDefault()}>
              <UserOutlined style={{ fontSize: 20}}/>
            </a>
          </Dropdown>
        }
        {type === undefined && 
          <div
            className="cart"
            onClick={() => this.handleClickLogin()}
          >
            Login
          </div>
        }
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
