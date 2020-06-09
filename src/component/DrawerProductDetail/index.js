import React, { Component } from "react";

import { Drawer, Input, Button } from "antd";
import { connect } from "react-redux";
import './index.scss';

class DrawerProductDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      product: {
        id: 1,
        name: "aoe",
        category: "war",
        price: 1000000,
        description: "hey hey"
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
    const { id, name, category, price, description} = product;

    return(
      <div className="drawer-background">
        <div className="drawer-line">
          <div className="line-title"> ID </div>
          <Input
            className="line-input"
            defaultValue={id}
          />
        </div>
        <div className="drawer-line">
          <div className="line-title"> Name </div>
          <Input
            className="line-input"
            defaultValue={name}
          />
        </div>
        <div className="drawer-line">
          <div className="line-title"> Category </div>
          <Input
            className="line-input"
            defaultValue={category}
          />
        </div>
        <div className="drawer-line">
          <div className="line-title"> Price </div>
          <Input
            className="line-input"
            defaultValue={price}
          />
        </div>
        <div className="drawer-line">
          <div className="line-title"> Description </div>
          <Input
            className="line-input"
            defaultValue={description}
          />
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
    
  }
}

export default connect(
  mapStateToProps,
  {

  }
)(DrawerProductDetail);