import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUserInfo,
  updateUserInfo
} from "./../../action";

import { Input, Button, notification } from 'antd';
import HomeMenu from "./../Menu";
import './index.scss';

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      isChangeUser: false,
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
        <div className="user-info">
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
        </div>
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
