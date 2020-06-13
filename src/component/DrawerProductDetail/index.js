import React, { Component } from "react";

import { Drawer, Input, Button, notification } from "antd";
import { connect } from "react-redux";
import './index.scss';
import { cloneDeep } from 'lodash';
import {
  addProductToCart,
  fetchAllProduct
} from '../../action';
import axios from 'axios';
import qs from 'querystring';

import ModalProduct from '../ModalProduct';

class DrawerProductDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      product: {},
      quantity: 0,
      visibleModal: false,
    }
  }

  componentDidMount = () => {
    const { products, productId } = this.props;

    for (let i=0; i<products.length; i++){
      if(products[i].id === productId){
        this.setState({
          product: cloneDeep(products[i]),
        })
      }
    }
  }

  handleClick = (type, id) => {
    const { callback, addProductToCart, fetchAllProduct } = this.props;
    const { quantity } = this.state;

    if(type == 'cancel'){
      callback(false)
    }

    if (type == 'add_item'){
      const params = {
        productID: id,
        quantity: quantity,
      }
      addProductToCart(params).then(res => {
        if (res.status == "Success") {
          return notification.open({
            message: "Add to cart successfully"
          })
        } else {
          return notification.open({
            message: "Add to cart failed",
            description: "You have not logged in"
          })
        }
      })
    }

    if (type == 'delete') {
      let url = `https://hustshop.azurewebsites.net/rest/connect/deleteproduct`;

      axios
        .post(
          url,
          qs.stringify({
            id: id,
          })
        ).then(res => {
          if (res.data.status == "Success"){
            notification.open({
              message: "Delete product success"
            })
            fetchAllProduct().then(res => {
              callback()
            })
          } else {
            notification.open({
              message: "Delete product fail",
              description: "Product does not exist",
            })
          }
        })
    }

    if (type == 'update') {
      this.setState({
        visibleModal: true,
      })
    }
  }

  handleChangeInput = e => {
    const value = e.currentTarget.value;

    if (value && (value < 1 || value > 50)) {
      return notification.open({
        message: "Quantity can't be under 0 or over 50"
      })
    } else {
      this.setState({
        quantity: value,
      })
    }
  }

  handleCancelModal = () => {
    this.setState({
      visibleModal: false,
    })
  }

  renderModalAddProduct() {
    const { visibleModal, product } = this.state;
    const { id, name, price, description, category, imageURL } = product;

    return(
      visibleModal && <ModalProduct
        visibleAddProduct={visibleModal}
        isCreate={false}
        callback={e => {this.handleCancelModal()}}
        name={name}
        price={price}
        description={description}
        category={category}
        imageURL={imageURL}
        id={id}
      />
    )
  }

  renderDrawerContent() {
    const { isHome, productQuantity, user } = this.props;
    const { product } = this.state;
    const { id, name, category, price, description, imageURL} = product;
    const { type } = user;

    return(
      <div className="drawer-background">
        <img
          src={imageURL}
          className="image-background"
        />
        <div className="drawer-line">
          <div className="line-title"> ID </div>
          <div className="line-input"> {id} </div>
        </div>
        <div className="drawer-line">
          <div className="line-title"> Name </div>
          <div className="line-input"> {name} </div>
        </div>
        <div className="drawer-line">
          <div className="line-title"> Category </div>
          <div className="line-input"> {category} </div>
        </div>
        <div className="drawer-line">
          <div className="line-title"> Price </div>
          <div className="line-input"> {price} </div>
        </div>
        <div className="drawer-line">
          <div className="line-title"> Description </div>
          <div className="line-input"> {description} </div>
        </div>
        <div className="drawer-line">
          <div className="line-title"> Quantity </div>
          <Input
            defaultValue={productQuantity}
            className="line-input"
            onChange={this.handleChangeInput}
          />
        </div>
        <div className="line-button">
          {type == 1 && isHome &&
            <Button
            danger
            className="drawer-button"
            onClick={e => this.handleClick('delete', id)}
            >
              Delete
            </Button>
          }
          {isHome && 
            <Button
              className="drawer-button"
              onClick={e => this.handleClick('add_item', id)}>
              Add to cart
            </Button>
          }
          {type == 1 && isHome &&
            <Button
            className="drawer-button"
            onClick={e => this.handleClick('update', id)}
            >
              Edit
            </Button>
          }
        </div>
      </div>
    )
  }

  render() {
    const { visibleDrawer, callback } = this.props

    return(
      <div>
        <Drawer
          visible={visibleDrawer}
          onClose={() => callback(false)}
          width={500}
          title="Product detail"
        >
          {this.renderDrawerContent()}
        </Drawer>
        {this.renderModalAddProduct()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    user: state.user.user,
  }
}

export default connect(
  mapStateToProps,
  {
    addProductToCart,
    fetchAllProduct
  }
)(DrawerProductDetail);