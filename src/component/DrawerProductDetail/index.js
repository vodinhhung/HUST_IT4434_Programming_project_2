import React, { Component } from "react";

import { Drawer, Input, Button, notification } from "antd";
import { connect } from "react-redux";
import './index.scss';
import { cloneDeep } from 'lodash';
import {
  addProductToCart
} from '../../action'

class DrawerProductDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      product: {},
      quantity: 0,
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
    const { callback, addProductToCart } = this.props;
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
  }

  handleChangeInput = e => {
    const value = e.currentTarget.value;

    this.setState({
      quantity: value,
    })
  }

  renderDrawerContent() {
    const { isHome, productQuantity } = this.props;
    const { product } = this.state;
    const { id, name, category, price, description, imageURL} = product;

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
          <Button
            className="drawer-button"
            onClick={e => this.handleClick('cancel')}>
            Cancel
          </Button>
          {isHome && 
            <Button
              className="drawer-button"
              onClick={e => this.handleClick('add_item', id)}>
              Add to cart
            </Button>
          }
        </div>
      </div>
    )
  }

  render() {
    const { visibleDrawer, callback } = this.props
    return(
      <Drawer
        visible={visibleDrawer}
        onClose={() => callback(false)}
        width={500}
        title="Product detail"
      >
        {this.renderDrawerContent()}
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
  }
}

export default connect(
  mapStateToProps,
  {
    addProductToCart
  }
)(DrawerProductDetail);