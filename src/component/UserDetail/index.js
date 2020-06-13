import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { Input, Button, notification, Collapse } from 'antd';
import qs from 'querystring';

import {
  fetchUserInfo,
  updateUserInfo
} from "./../../action";
import HomeMenu from "./../Menu";
import './index.scss';
import Fifa from './fifa.jpg';

const Panel = Collapse.Panel;
const Password = Input.Password;

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      isChangeUser: false,
      newPassword: "",
      verifyPassword: "",
    }
  }

  componentDidMount = async () => {
    const { fetchUserInfo } = this.props;
    await fetchUserInfo().then(res => {
      this.setState({
        user: res,
      })
      if (res.name === "") {
        return notification.open({
          message: "Please enter your information",
          description: "",
        })
      }
    })
  }

  handleUpdateUser = e => {
    const { updateUserInfo } = this.props;
    const { user } = this.state;
    
    updateUserInfo(user)
  }

  handleOnChangeInput = (value, type) => {
    let { user } = this.state;
    user[type] = value;

    this.setState({ user })
  }

  getValueUserDetail = (type) => {
    const { user } = this.state;
    return user && user.name? user[type] : "";
  }

  handleEnterPassword = (value, type) => {
    if(type === "new") {
      this.setState({ newPassword: value})
    } else {
      this.setState({ verifyPassword: value })
    }
  }

  handleClickChangePassword = () => {
    const { newPassword, verifyPassword } = this.state;

    if (newPassword !== verifyPassword) {
      return notification.open({
        message: "Password re-enter not right"
      })
    } else {
      let url = `https://hustshop.azurewebsites.net/rest/connect/updatepassword`;
      

      axios
        .post(
          url,
          qs.stringify({
            password: newPassword,
          }))
        .then(res => {
          console.log(res)
          if(res.data.status === "Success") {
            return notification.open({
              message: "Change password successfully"
            })
          }
        })
    }
  }

  renderChangePasswordView() {
    return(
      <div className="change-password-view">
        <div className="change-password-line">
          <div className="change-password-line-title"> Old password </div>
          <Password
            placeholder="Enter old password"
            className="change-password-line-input"
          />
        </div>
        <div className="change-password-line">
          <div className="change-password-line-title"> New password </div>
          <Password
            placeholder="Enter new password"
            className="change-password-line-input"
            onChange={e=> this.handleEnterPassword(e.currentTarget.value, "new")}
          />
        </div>
        <div className="change-password-line">
          <div className="change-password-line-title"> New password </div>
          <Password
            placeholder="Re-enter new password"
            className="change-password-line-input"
            onChange={e=> this.handleEnterPassword(e.currentTarget.value, "verify")}
          />
        </div>
        <Button
          onClick={this.handleClickChangePassword}
          className="button-password">
          Change password
        </Button>
      </div>
    )
  }

  renderHeaderPanel = type => {
    let label = type === "userdetail"
      ? "Edit personal information"
      : "Change password"

    return(
      <div className="userdetail-header-panel">
        {label}
      </div>
    )
  }

  renderInfoDetail() {
    return(
      <div className="info-detail">
        <div className="info-line">
          <div className="info-line-title"> Name </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "name")}
            value={this.getValueUserDetail("name")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Gender </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "gender")}
            value={this.getValueUserDetail("gender")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Birthday </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "birthday")}
            value={this.getValueUserDetail("birthday")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Addresss </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "address")}
            value={this.getValueUserDetail("address")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> District </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "district")}
            value={this.getValueUserDetail("district")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Province </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "province")}
            value={this.getValueUserDetail("province")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> City </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "city")}
            value={this.getValueUserDetail("city")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Country </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "country")}
            value={this.getValueUserDetail("country")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Phone Number </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "telephone")}
            value={this.getValueUserDetail("telephone")}
          />
        </div>
      </div>
    )
  }

  render() {
    const { history } = this.props;

    return (
      <div className="userdetail_background">
        <div className="side-image">
          <HomeMenu
            history={history}
          />
        </div>
        <img src={Fifa} className="image-backup">
        </img>
        <Collapse 
          accordion
          className="userdetail-collapse">
          <Panel header={this.renderHeaderPanel("userdetail")}>
            <div className="user-info">
              {/* <div className="info-title">
                User information
              </div> */}
              {this.renderInfoDetail()}
              <div className="info-button-line">
                <Button
                  className="info-button"
                  onClick={this.handleUpdateUser}
                  >
                  Update
                </Button>
              </div>
            </div>
          </Panel>
          <Panel header={this.renderHeaderPanel("password")}>
            <div>
              {this.renderChangePasswordView()}
            </div>
          </Panel>
        </Collapse>
        {/* <div className="user-info">
          <div className="info-title">
            User information
          </div>
          {this.renderInfoDetail()}
          <div className="info-button-line">
            <Button
              className="info-button"
              onClick={this.handleUpdateUser}
              >
              Update
            </Button>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {
  updateUserInfo,
  fetchUserInfo
})(UserDetail);
