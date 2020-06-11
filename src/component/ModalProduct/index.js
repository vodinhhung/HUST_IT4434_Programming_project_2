import React, { Component } from "react";
import { Modal, Input, notification, Button } from 'antd';
import { connect } from "react-redux";
import qs from 'querystring';
import axios from 'axios';

import './index.scss';

class ModalProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || 0,
      name: props.name || "",
      category: props.category || "",
      price: props.price || "",
      description: props.description || "",
      imageURL: props.imageURL || "",
    }
  }

  handleAddProduct = () => {
    const { callback } = this.props;
    const { name, category, price, description, imageURL } = this.state;
    let url = `https://hustshop.azurewebsites.net/rest/connect/createproduct`;
    
    axios
      .post(
        url,
        qs.stringify({
          name: name,
          category: category,
          price: price,
          description: description,
          imageURL: imageURL,
        })
      )
      .then(res => {
        if(res.data.status === "Success"){
          notification.open({
            message: "Create new product successfully"
          })
          this.setState({
            name: "",
            category: "",
            price: "",
            description: "",
            imageURL: "",
          })
          callback()
        } else {
          notification.open({
            message: "Create new product fail",
            description: "Duplicate name of existing product",
          })
        }
      })
  }

  handleEditProduct = () => {
    const { id, name, category, price, description, imageURL } = this.state;
    let url = `https://hustshop.azurewebsites.net/rest/connect/updateproduct`;
    
    axios
      .post(
        url,
        qs.stringify({
          name: name,
          category: category,
          price: price,
          description: description,
          imageURL: imageURL,
          productID: id,
        })
      )
      .then(res => {
        console.log(res)
        if(res.data.status === "Success"){
          notification.open({
            message: "Update new product successfully"
          })
        } else {
          notification.open({
            message: "Update new product fail",
          })
        }
      })
  }

  handleChangeInput = (e, type) => {
    this.setState({
      [type]: e.currentTarget.value,
    })
  }

  handleClickSubmit = () => {
    const { isCreate } = this.props;

    isCreate 
      ? this.handleAddProduct() 
      : this.handleEditProduct()
  }

  render() {
    const { visibleAddProduct, callback, isCreate } = this.props;
    const { name, category, price, description, imageURL } = this.state;
    const label = isCreate ? "Add new product" : "Edit product";
    const labelButton = isCreate ? "Create" : "Edit";
    console.log(name)
    console.log(category)
    console.log(price)
    console.log(description)
    console.log(imageURL)

    return(
      <Modal
        title={label}
        visible={visibleAddProduct}
        onCancel={callback}
        onOk={this.handleAddProduct}
        className="modal-style"
        footer={[
          <Button onClick={callback}>
            Cancel
          </Button>,
          <Button onClick={this.handleClickSubmit} type="primary" style={{ width: 60 }}>
            {labelButton}
          </Button>
        ]}
      >
        <div
          className="modal-style"
        >
          <div className="ant-modal-body">
            <div className="user-field">
              <div className="field-title"> Name </div>
              <Input
                className="field-input"
                value={name}
                onChange={e => this.handleChangeInput(e, "name")}
              />
            </div>
            <div className="user-field">
              <div className="field-title"> Category </div>
              <Input
                className="field-input"
                value={category}
                onChange={e => this.handleChangeInput(e, "category")}
              />
            </div>
            <div className="user-field">
              <div className="field-title"> Price </div>
              <Input
                className="field-input"
                value={price}
                onChange={e => this.handleChangeInput(e, "price")}
              />
            </div>
            <div className="user-field">
              <div className="field-title"> Description </div>
              <Input
                className="field-input"
                value={description}
                onChange={e => this.handleChangeInput(e, "description")}
              />
            </div>
            <div className="user-field">
              <div className="field-title"> Image url </div>
              <Input
                className="field-input"
                value={imageURL}
                onChange={e => this.handleChangeInput(e, "imageURL")}
              />
            </div>
          </div>
        </div>
      </Modal>
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
)(ModalProduct);