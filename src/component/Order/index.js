import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input, Collapse, Tag, Button, notification
} from 'antd';

import HomeMenu from "./../Menu";
import "./index.scss";
import {
  feathOrderVerifyingAdmin,
  fetchUserInfo,
} from "../../action";
import axios from "axios";

const Search = Input.Search;
const Panel = Collapse.Panel;

class Order extends Component {
  constructor(props) {
    super();

    this.state = {
      orders: [],
    }
  }

  componentDidMount = async () => {
    const { feathOrderVerifyingAdmin, fetchUserInfo } = this.props;

    await fetchUserInfo()
    await feathOrderVerifyingAdmin()
      .then(res => {
        if(res.status === "Success") {
          this.setState({
            orders: res.orders,
          })
        }
      })
  }

  handleDeclineOrder = id => {
    const { feathOrderVerifyingAdmin } = this.props;

    let url = `https://hustshop.azurewebsites.net/rest/connect/declineorder`;
    let params = {
      id: id,
    }
    
    return axios
      .get(url, { params })
      .then(res => {
        if(res.data.status === "Success"){
          notification.open({
            message: "Decline order successfully",
          })
          feathOrderVerifyingAdmin()
            .then(res => {
              if(res.status === "Success") {
                this.setState({
                  orders: res.orders,
                })
              }
            })
        } else {
          notification.open({
            message: "Decline order fail",
            description: "CartId check failed",
          })
        }
      })
  }

  handleVerifyOrder = id => {
    const { feathOrderVerifyingAdmin } = this.props;

    let url = `https://hustshop.azurewebsites.net/rest/connect/verifyorder`;
    let params = {
      id: id,
    }
    
    return axios
      .get(url, { params })
      .then(res => {
        if(res.data.status === "Success"){
          notification.open({
            message: "Verify order successfully",
          })
          feathOrderVerifyingAdmin()
            .then(res => {
              if(res.status === "Success") {
                this.setState({
                  orders: res.orders,
                })
              }
            })
        } else {
          notification.open({
            message: "Verify order fail",
            description: "CartId check failed",
          })
        }
      })
  }

  renderProductListContent = productList => {
    return productList.map(product => {
      const {imageURL, name, category, price, quantity } = product;

      return(
        <div className="list-item">
          <img 
            src={imageURL}
            className="list-item-image"/>
          <div className="list-item-content">
            <div className="list-item-content-item">
              <div className="list-item-content-item-title"> Name </div>
              <div className="list-item-content-item-info"> {name} </div>
            </div>
            <div className="list-item-content-item">
              <div className="list-item-content-item-title"> Category </div>
              <div className="list-item-content-item-info"> {category} </div>
            </div>
            <div className="list-item-content-item">
              <div className="list-item-content-item-title"> Price </div>
              <div className="list-item-content-item-info"> {price} </div>
            </div>
            <div className="list-item-content-item">
              <div className="list-item-content-item-title"> Quantity </div>
              <div className="list-item-content-item-info"> {quantity} </div>
            </div>
          </div>
        </div>
      )
    })
  }

  renderProductList = productList => {
    if(productList.length > 0){
      return(
        <div className="product-list-info">
          {this.renderProductListContent(productList)}
        </div>
      )
    } else {
      return (
        <Tag color='red' className="product-empty-list">
           No product in list
        </Tag>
      )
    }
  }
  
  renderPanelContent = order => {
    const { userType, totalSum, checkoutTime, cartID, productList, user } = order;

    return (
      <div className="panel-content">
        <div className="content-line">
          <div className="line-title"> ID : </div>
          <div className="line-info"> {cartID} </div>
        </div>
        <div className="content-line">
          <div className="line-title"> Account : </div>
          <div className="line-info"> {this.renderUserHeaderPanel(user, userType)} </div>
        </div>
        <div className="content-line">
          <div className="line-title"> Checkout time : </div>
          <div className="line-info"> {checkoutTime} </div>
        </div>
        <div className="content-line">
          <div className="line-title"> Total sum : </div>
          <div className="line-info"> {totalSum} </div>
        </div>
        <div className="product-list">
          <div className="product-list-title"> Product list :</div>
          {this.renderProductList(productList)}
        </div>
        <div className="content-button">
          <Button
            onClick={() => this.handleVerifyOrder(cartID)}
            style={{ borderRadius: 10, width: 100 }}
          >
            Verify
          </Button>
          <Button
            danger
            onClick={() => this.handleDeclineOrder(cartID)}
            style={{ borderRadius: 10, width: 100 }}
          >
            Decline
          </Button>
        </div>
      </div>
    )
  }

  renderUserHeaderPanel = (user, type) => {
    let color;
    if(type == 0) {
      color = 'green'
    } else if (type == 1) {
      color = 'blue'
    } else {
      color = 'red'
    }

    return (
      <Tag
        color={color}
        style={{ borderRadius: 20 }}
      >
        {user}
      </Tag>
    )
  }

  renderHeaderPanel = (id, user, checkoutTime, sum, type) => {
    return(
      <div className="order-panel">
        <div className="id-panel"> {id} </div>
        <div className="user-panel"> {this.renderUserHeaderPanel(user, type)} </div>
        <div className="checkout-panel"> {checkoutTime} </div>
        <div className="sum-panel"> {sum} </div>
      </div>
    )
  }

  renderOrderList() {
    const { orders } = this.state;

    if(orders && orders.length > 0) {
      return orders.map(order => {
        const { userType, totalSum, checkoutTime, cartID, productList, user } = order;

        return(
          <Panel header={this.renderHeaderPanel(cartID, user, checkoutTime, totalSum, userType)}>
            {this.renderPanelContent(order)}
          </Panel>
        )
      })
    }
  }

  render() {
    const { history } = this.props;

    return (
      <div className="order-background">
        <div className="order-menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="order-list">
          <div className="order-list-title">
            <div className="order-list-title-title">
              Verify order
            </div>
            {/* <div className="order-list-title-search-input">
              <Search
                placeholder="Enter order name to search"
                className="order-list-title-search"
                enterButton={true}
                onSearch={this.handleSearchOrder}
              />
            </div> */}
          </div>
          <div className="order-content">
            <div className="order-content-title">
              <div className="id-title"> ID </div>
              <div className="user-title"> Account </div>
              <div className="checkoutdate-title"> Checkout date </div>
              <div className="sum-title"> Total sum </div>
            </div>
            <Collapse  
              accordion
              className="order-collapse">
              {this.renderOrderList()}
            </Collapse>
          </div>
        </div>
      </div>
    )
  }
}

const mapPropsToState = state => {
  return {

  };
}

export default connect(
  mapPropsToState, 
  {
    feathOrderVerifyingAdmin,
    fetchUserInfo
  }
)(Order);