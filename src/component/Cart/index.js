import React, { Component } from "react";
import { connect } from "react-redux";
import './index.scss';

import { Button, Input, notification } from 'antd';
import DrawerProductDetail from '../DrawerProductDetail'
import HomeMenu from '../Menu';
import {
  fetchCartInfo,
  addProductToCart,
  fetchAllProduct,
  fetchUserInfo,
} from "./../../action";
import {
  cloneDeep
} from 'lodash';
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      cart: {},
      products: [],
      visibleDrawer: false,
      productID: 0,
      productQuantity: 0,
      balance: 0,
    }
  }

  componentDidMount = async () => {
    const { fetchCartInfo, fetchAllProduct, fetchUserInfo } = this.props;
    await fetchCartInfo().then(res => {
      this.setState({
        cart: res,
        products: res.products,
      })
    })

    await fetchAllProduct();
    await fetchUserInfo().then(res => {
      this.setState({
        userInfo: res,
      })
    })
    await this.getBalance()
  }

  getBalance = () => {
    let url = `https://hustshop.azurewebsites.net/rest/connect/getbalance`;

    axios.get(url)
      .then(res => {
        if(res.status === 200) {
          this.setState({
            balance: res.data.balance,
          })
        }
      })
  }

  handleCloseDrawer = () => {
    this.setState({
      visibleDrawer: false,
      renderProductId: 0,
    })
  }

  handleChangeQuantity = async (e, id, quantity) => {
    const { addProductToCart, fetchCartInfo } = this.props;
    let params = {
      productID: id,
      quantity: e.currentTarget.value - quantity,
    } 

    await addProductToCart(params).then(res => {
      if(res.status === "Success") {
        fetchCartInfo().then(res => {
          this.setState({
            cart: res,
            products: res.products,
          })
        })
      }
    })
  }

  handleDeleteItemFromCart = (id, quantity) => {
    const { addProductToCart, fetchCartInfo } = this.props;

    let params = {
      productID: id,
      quantity: -quantity,
    }

    addProductToCart(params).then(res => {
      if (res.message === "Removed" && res.status === "Success"){
        notification.open({
          message: "Delete item from cart successfully"
        })

        fetchCartInfo().then(res => {
          this.setState({
            cart: res,
            products: res.products,
          })
        })
      }
    })
  }

  countSum = () => {
    const { products } = this.state;
    let sum = 0;

    if (products && products.length > 0) {
      for (let i=0; i<products.length; i++){
        sum += products[i].sum
      }
      return sum;
    } else{
      return 0;
    }
  }

  handleClickOrder = e => {
    const { fetchCartInfo } = this.props;

    let url = `https://hustshop.azurewebsites.net/rest/connect/pay`;

    return axios
      .get(url)
      .then(res => {
        if (res.data.status === "Success"){
          notification.open({
            message: "Order successfully",
            description: "Order will be tranfered to your address soon",
          })

          fetchCartInfo().then(res => {
            this.setState({
              cart: res,
              products: res.products,
            })
          })
        } else if (res.data.status === "Fail/unauthorized") {
          notification.open({
            message: "Proceed to order fail",
            description: "Login to proceed order",
          })
        } else if (res.data.status === "Fail/cart empty" || res.data.status === "Fail/no cart") {
          return notification.open({
            message: "Proceed to order fail",
            description: "Can not proceed to order when cart is empty",
          })
        } else if (res.data.status === "Fail/insufficient funds") {
          return notification.open({
            message: "Proceed to order fail",
            description: "Balance is not enough"
          })
        }
      })
  }

  handleViewMore = (id, quantity) => {
    this.setState({
      visibleDrawer: true,
      productID: id,
      productQuantity: quantity,
    })
  }

  renderDrawerProductDetail() {
    const { visibleDrawer, productID, productQuantity } = this.state;

    return visibleDrawer && (
      <DrawerProductDetail
        visibleDrawer={visibleDrawer}
        callback={e => {this.handleCloseDrawer()}}
        productId={productID}
        productQuantity={productQuantity}
      />
    )
  }

  renderCheckout() {
    const { userInfo } = this.state;
    const { country, address, province, city, district } = userInfo;

    return (
      <div className="cart-checkout">
        <div className="money-count">
          Subtotal: {this.countSum()} đ
        </div>
        <div className="deliver-address">
          <div className="deliver-title">
            Deliver to
          </div>
          <div className="deliver-content">
            <div className="deliver-content-title"> Address </div>
            <div className="deliver-content-content"> {address} </div>
          </div>
          <div className="deliver-content">
            <div className="deliver-content-title"> District </div>
            <div className="deliver-content-content"> {district} </div>
          </div>
          <div className="deliver-content">
            <div className="deliver-content-title"> City </div>
            <div className="deliver-content-content"> {city} </div>
          </div>
          <div className="deliver-content">
            <div className="deliver-content-title"> Province </div>
            <div className="deliver-content-content"> {province} </div>
          </div>
          <div className="deliver-content">
            <div className="deliver-content-title"> Country </div>
            <div className="deliver-content-content"> {country} </div>
          </div>
        </div>
        <Button
          className="order-button"
          onClick={this.handleClickOrder}
        >
          Proceed to order
        </Button>
      </div>
    )
  }

  renderProductsInCart() {
    const { products } = this.state;
    
    if (products && products.length > 0) {
      return products.map(product => {
        const {name, imageURL, price, quantity, category, id } = product;
        return(
          <div className="item">
            <img
              src={imageURL}
              className="item-image"
            />
            <div className="item-detail">
              <div className="name"> { name } </div>
              <div className="detail"> { category } </div>
              <div
                className="view-more"
                onClick={() => this.handleViewMore(id, quantity)}
              > view more</div>
            </div>
            <div className="item-checkout">
              <div className="price"> {price + " đ"} </div>
              <Input
                onPressEnter={e => this.handleChangeQuantity(e, id, quantity)}
                defaultValue={quantity}
                className="quantity-input"
              />
              <Button
                className="delete-button"
                danger
                onClick={e => this.handleDeleteItemFromCart(id, quantity)}>
                  Delete
              </Button>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div className="nothing">
          Add some item to view cart
        </div>
      )
    }
  }

  render() {
    const { history } = this.props;
    const { balance } = this.state;

    return(
      <div className="home-cart">
        <div className="cart-menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="cart-title">
          <div className="cart-title-title">
            Shopping cart
          </div>
          <div className="cart-title-balance">
            Balance: {balance} đ
          </div>
        </div>
        <div className="cart-content">
          <div className="cart-products">
            {this.renderProductsInCart()}
          </div>
          {this.renderCheckout()}
        </div>
        {this.renderDrawerProductDetail()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchCartInfo,
    addProductToCart, 
    fetchAllProduct,
    fetchUserInfo
  }
)(Cart);