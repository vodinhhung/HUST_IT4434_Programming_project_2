import React, { Component } from "react";

import { Drawer, Input, Button } from "antd";
import { connect } from "react-redux";
import './index.scss';
import { cloneDeep } from 'lodash';

class DrawerProductDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      product: {},
    }
  }

  componentDidMount = () => {
    const { products, productId } = this.props;
    console.log(productId)

    for (let i=0; i<products.length; i++){
      if(products[i].id === productId){
        console.log(products[i])
        this.setState({
          product: cloneDeep(products[i]),
        })
      }
    }
  }

  handleClick = type => {
    const { callback } = this.props;
    console.log(type)

    if(type == 'cancel'){
      callback(false)
    }
  }

  renderDrawerContent() {
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
        <div className="line-button">
          <Button
            className="drawer-button"
            onClick={e => this.handleClick('cancel')}>
            Cancel
          </Button>
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

  }
)(DrawerProductDetail);