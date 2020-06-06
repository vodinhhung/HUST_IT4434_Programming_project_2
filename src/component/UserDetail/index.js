import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Input, Button } from 'antd';

import './index.scss';

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "Hung",
        gender: "Male",
        date: "12/07/1998",
        address: "62 Dinh Cong",
        district: "Thanh Xuan",
        province: "Ha Noi",
        city: "Ha Noi",
        country: "Viet Nam",
        telephone: "0912345678",
      },
      isChangeUser: false,
    }
  }

  handleUpdateUser = e => {
    const { user } = this.state;
    let url = `https://hustshop.azurewebsites.net/rest/connect/updateuserinfo`
    let params = user;

    axios
      .post(url, params)
      .then(res => {
        
      })
  }

  handleOnChangeInput = (value, type) => {
    let { user } = this.state;
    user[type] = value;

    this.setState({ user })
  }

  getValueUserDetail = (type) => {
    const { user } = this.state;
    return user && user[type] ? user[type] : "Null";
  }

  renderInfoDetail() {
    const { user } = this.state;

    return(
      <div className="info-detail">
        <div className="info-line">
          <div className="info-line-title"> Name </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "name")}
            defaultValue={this.getValueUserDetail("name")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Gender </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "gender")}
            defaultValue={this.getValueUserDetail("gender")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Birthday </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "date")}
            defaultValue={this.getValueUserDetail("date")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Addresss </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "address")}
            defaultValue={this.getValueUserDetail("address")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> District </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "district")}
            defaultValue={this.getValueUserDetail("district")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Province </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "province")}
            defaultValue={this.getValueUserDetail("province")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> City </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "city")}
            defaultValue={this.getValueUserDetail("city")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Country </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "country")}
            defaultValue={this.getValueUserDetail("country")}
          />
        </div>
        <div className="info-line">
          <div className="info-line-title"> Phone Number </div>
          <Input
            className="info-input"
            onChange={e => this.handleOnChangeInput(e.currentTarget.value, "Telephone")}
            defaultValue={this.getValueUserDetail("telephone")}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="userdetail_background">
        <div className="side-image">
          hey hey 1
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
        {/* <div className="side-image">
          hey hey hey 3
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(UserDetail);
