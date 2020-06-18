import React, { Component } from "react";
import { connect } from "react-redux";
import { Tag, Button, notification, Modal, Table, Input } from 'antd';
import axios from 'axios';

import {
  fetchAccountList,
} from '../../action';
import HomeMenu from "./../Menu";
import "./index.scss";

const Search = Input.Search;

class Account extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: [],
      visibleOrderModal: false,
      orders: [],
    }
  }

  componentDidMount= async () => {
    const  { fetchAccountList } = this.props;
    await fetchAccountList().then(res => {
      if(res.status === "Success") {
        this.setState({
          accounts: res.accounts,
        })
      }
      else {
        return notification.open({
          message: "Load list of accounts fail",
          description: "Account unauthorized",
        })
      }
    })
  }

  orderColumns = () => {
    return(
      [
        {
          title: 'ID',
          dataIndex: 'cartID',
          key: 'cartID',
          width: '10%'
        },
        {
          title: 'Payment status',
          dataIndex: 'paymentStatus',
          key: 'paymentStatus',
          width: '40%'
        },
        {
          title: 'Products',
          dataIndex: 'productList',
          key: 'productList',
          width: '50%',
          render: productList => (
            <>
            {productList.map(product => {
                let name = product.name;
                return(
                  <Tag 
                    color="green"
                    style={{ borderRadius: 5, marginBottom: 5}}>
                    {name}
                  </Tag>
                )
              })}
            </>
          )
        }
      ]
    )
  }

  getOrderData = () => {
    const { orders } = this.state;
    
    return orders.map(order => ({
        cartID: order.cartID,
        paymentStatus: order.paymentStatus,
        productList: order.productList,
      })
    )
  }

  handleClickBlock = (type, username) => {
    let params = { username: username};

    if(type == 0){
      let url = `https://hustshop.azurewebsites.net/rest/connect/lockaccount`;

      axios
        .get(url, { params })
        .then(res => {
          if(res.data.status === "Success") {
            notification.open({
              message: "Block account success",
            })
          }
        })
    }
    if(type == 2){
      let url = `https://hustshop.azurewebsites.net/rest/connect/unlockaccount`;

      axios
        .get(url, { params })
        .then(res => {
          if(res.data.status === "Success") {
            notification.open({
              message: "Unblock account success",
            })
          }
        })
    }
  }

  handleViewOrder = username => {
    let url = `https://hustshop.azurewebsites.net/rest/connect/getuserorderlist`;
    let params = {
      u: username,
    }

    axios.get(url, { params })
      .then(res => {
        if (res.data.status == "Success") {
          this.setState({
            visibleOrderModal: true,
            orders: res.data.order,
          })
        } else {
          return notification.open({
            message: "Can not view orderlist of user",
            description: "You need to login again",
          })
        }
      })
  }

  handleCancelOrderModal() {
    this.setState({
      visibleOrderModal: false,
      orders: [],
    })
  }

  handleSearchAccount = value => {
    const { fetchAccountList } = this.props;
    let params = {
      u: value,
    }

    fetchAccountList(params)
      .then(res => {
        if (res.status === "Success") {
          this.setState({
            accounts: res.accounts,
          })
        } else {
          return notification.open({
            message: "Search account failed",
            description: "Account unauthorized",
          })
        }
      })
  }

  renderOrderModal() {
    const { visibleOrderModal } = this.state;

    return visibleOrderModal && (
      <Modal
        title="Orders list"
        visible={visibleOrderModal}
        onCancel={() => this.handleCancelOrderModal()}
        footer={
          <Button
            onClick={() => this.handleCancelOrderModal()}
          >
            Cancel
          </Button>
        }
      >
        <Table
          dataSource={this.getOrderData()}
          columns={this.orderColumns()}
          pagination={false}
        />
      </Modal>
    )
  }

  renderTag = type => {
    if (type == 0) {
      return(
        <Tag 
          color='green'
          style={{ borderRadius: 20 }}
        > 
          Not blocked 
        </Tag>
      )
    }
    if (type == 1) {
      return(
        <Tag 
          color='blue' 
          style={{ borderRadius: 20 }}> 
          Admin 
        </Tag>
      )
    }
    return(
      <Tag 
        color='red' 
        style={{ borderRadius: 20 }}> 
        Blocked 
      </Tag>
    )
  }

  renderButtonBlock = (type, username) => {
    const label = type == 0? "Block" : "Unblock";

    if (type == 0) {
      return (
        <Button
          danger
          onClick={e =>this.handleClickBlock(type, username)}
          style={{borderRadius: 10}}
        >
          {label}
        </Button>
      ) 
    }
    if (type == 2) {
      return (
        <Button
          onClick={e =>this.handleClickBlock(type, username)}
          style={{borderRadius: 10}}
        >
          {label}
        </Button>
      )
    }
    return(
      <div></div>
    )
  }

  renderAccountList() {
    const { accounts } = this.state;

    if(accounts && accounts.length > 0){
      return accounts.map(account => {
        const { username, type } = account;

        return (
          <div className="account-content-content">
            <div className="username-content"> {username} </div>
            <div className="order-content">
              <Button
                type="text"
                className="button-content"
                onClick={() => this.handleViewOrder(username)}
              >
                View account orders 
              </Button>
            </div>
            <div className="status-content"> {this.renderTag(type)} </div>
            <div className="block-button-content"> {this.renderButtonBlock(type, username)} </div>
          </div>
        )
      })
    } else {
      return (
        <div className="account-content-content">
          No account
        </div>
      )
    }
    
  }

  render() {
    const { history } = this.props;
    const { accounts } = this.state;

    return(
      <div className="account-background">
        <div className="account-menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="account-list">
          <div className="account-list-title">
            <div className="title">
              Account
            </div>
            <div className="search-input">
              <Search
                placeholder="Enter account name to search"
                className="search"
                enterButton={true}
                onSearch={this.handleSearchAccount}
              />
            </div>
          </div>
          <div className="account-content">
            <div className="account-content-title">
              <div className="username"> User </div>
              <div className="order"> Order </div>
              <div className="status"> Status </div>
              <div className="block-button"> Block </div>
            </div>
            {this.renderAccountList()}
          </div>
        </div>
        {this.renderOrderModal()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(
  mapStateToProps,
  {
    fetchAccountList,
  }
)(Account);