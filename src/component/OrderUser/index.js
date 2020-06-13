import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import HomeMenu from "./../Menu";
import './index.scss';
import {
  fetchUserInfo,
  fetchOrderUser
} from '../../action';
import {
  Collapse, Tag, Button, notification
} from 'antd';

const Panel = Collapse.Panel;

class OrderUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userOrders: [],
    }
  }

  componentDidMount = async () => {
    const { fetchOrderUser, fetchUserInfo } = this.props;

    await fetchUserInfo()
    await fetchOrderUser().then(res => {
      if (res.status === "Success") {
        this.setState({
          userOrders: res.order,
        })
      }
    })
  }

  handleCancelOrder = id => {
    const { fetchOrderUser } = this.props;

    let url = `https://hustshop.azurewebsites.net/rest/connect/cancelorder`;
    let params = {
      id: id,
    }
    
    return axios
      .get(url, { params })
      .then(res => {
        if(res.data.status === "Success"){
          notification.open({
            message: "Cancel order successfully",
          })
          fetchOrderUser()
            .then(res => {
              if(res.status === "Success") {
                this.setState({
                  userOrders: res.order,
                })
              }
            })
        } else {
          notification.open({
            message: "Cancel order fail",
            description: "CartId check failed",
          })
        }
      })
  }

  renderProductListContent = productList => {
    return productList.map(product => {
      const {imageURL, name, category, price, quantity } = product;

      return(
        <div className="user-list-item">
          <img 
            src={imageURL}
            className="user-list-item-image"/>
          <div className="user-list-item-content">
            <div className="user-list-item-content-item">
              <div className="user-list-item-content-item-title"> Name </div>
              <div className="user-list-item-content-item-info"> {name} </div>
            </div>
            <div className="user-list-item-content-item">
              <div className="user-list-item-content-item-title"> Category </div>
              <div className="user-list-item-content-item-info"> {category} </div>
            </div>
            <div className="user-list-item-content-item">
              <div className="user-list-item-content-item-title"> Price </div>
              <div className="user-list-item-content-item-info"> {price} </div>
            </div>
            <div className="user-list-item-content-item">
              <div className="user-list-item-content-item-title"> Quantity </div>
              <div className="user-list-item-content-item-info"> {quantity} </div>
            </div>
          </div>
        </div>
      )
    })
  }

  renderProductList = productList => {
    if(productList.length > 0){
      return(
        <div className="user-product-list-info">
          {this.renderProductListContent(productList)}
        </div>
      )
    } else {
      return (
        <Tag color='red' className="user-product-empty-list">
           No product in list
        </Tag>
      )
    }
  }

  renderPanelContent = order => {
    const { paymentStatus, totalSum, checkoutTime, cartID, productList } = order;

    return(
      <div className="user-panel-content">
        <div className="user-content-line">
          <div className="user-line-title"> ID : </div>
          <div className="user-line-info"> {cartID} </div>
        </div>
        <div className="user-content-line">
          <div className="user-line-title"> Status : </div>
          <div className="user-line-info"> {this.renderUserHeaderPanel(paymentStatus)} </div>
        </div>
        <div className="user-content-line">
          <div className="user-line-title"> Checkout time : </div>
          <div className="user-line-info"> {checkoutTime} </div>
        </div>
        <div className="user-content-line">
          <div className="user-line-title"> Total sum : </div>
          <div className="user-line-info"> {totalSum} </div>
        </div>
        <div className="user-product-list">
          <div className="user-product-list-title"> Product list :</div>
          {this.renderProductList(productList)}
        </div>
        {paymentStatus === "Verifying" && 
          <div className="user-content-button">
            <Button
              onClick={() => this.handleCancelOrder(cartID)}
              style={{ borderRadius: 10, width: 100 }}
              danger
            >
              Cancel order
            </Button>
          </div>
        }
      </div>
    )
  }

  renderUserHeaderPanel = (status) => {
    let color;

    if (status === "Completed") {
      color = 'green';
    } else if (status === "Unpaid") {
      color = 'gold';
    } else if (status === "Verifying") {
      color = 'cyan';
    } else if (status === "Expired") {
      color = 'magenta';
    } else {
      color = 'red';
    }

    return(
      <Tag color={color} style={{ borderRadius: 20 }}>
        {status}
      </Tag>
    )
  }

  renderHeaderPanel = (id, status, checkoutTime, sum) => {
    return(
      <div className="user-order-panel">
        <div className="user-id-panel"> {id} </div>
        <div className="user-panel"> {this.renderUserHeaderPanel(status)} </div>
        <div className="user-checkout-panel"> {checkoutTime} </div>
        <div className="user-sum-panel"> {sum} </div>
      </div>
    )
  }

  renderOrderList() {
    const { userOrders } = this.state;

    if (userOrders && userOrders.length > 0 ){
      return userOrders.map(order => {
        const { totalSum, checkoutTime, cartID, productList, paymentStatus } = order;

        return(
          <Panel header={this.renderHeaderPanel(cartID, paymentStatus, checkoutTime, totalSum )}>
            {this.renderPanelContent(order)}
          </Panel>
        )
      })
    }
  }

  render() {
    const { history } = this.props;

    return (
      <div className="user-order-background">
        <div className="user-order-menu">
          <HomeMenu history={history}/>
        </div>
        <div className="user-order-list">
          <div className="user-order-list-title">
            <div className="user-order-list-title-title">
              Order of user
            </div>
          </div>
          <div className="user-order-content">
            <div className="user-order-content-title">
              <div className="user-id-title"> ID </div>
              <div className="user-user-title"> Status </div>
              <div className="user-checkoutdate-title"> Checkout date </div>
              <div className="user-sum-title"> Total sum </div>
            </div>
            <Collapse  
              accordion
              className="user-order-collapse">
              {this.renderOrderList()}
            </Collapse>
          </div>
        </div>
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
    fetchUserInfo,
    fetchOrderUser
  }
)(OrderUser);