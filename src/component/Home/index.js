import React, { Component } from "react";
import { Modal, Button } from "antd";
import "./index.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false
    };
  }

  handleShowModal = () => {
    this.setState({ visibleModal: true });
  };

  handleCloseModal = () => {
    this.setState({ visibleModal: false });
  };

  render() {
    const { visibleModal } = this.state;

    return (
      <div className="home">
        <div className="sticky_scroll">
          <Button
            className="sticky_button"
            onClick={this.handleShowModal}
            size="small"
            placeholder="Log in">
              Login
          </Button>
          <Button
            className="sticky_button">
            Register
          </Button>
          <Button
            className="sticky_button">
            My account
          </Button>
        </div>
        <div className="home_title">
          <div className="web_name">
            Web ban hang back khoa
          </div>
          <Button
            className="user_cart">
            Gio hang
          </Button>
        </div>
        <div className="categories_home">
          <Button className="button_category">
            Do gia dung
          </Button>
          <Button className="button_category">
            Do gia dung
          </Button>
          <Button className="button_category">
            Do gia dung
          </Button>
          <Button className="button_category">
            Do gia dung
          </Button>
          <Button className="button_category">
            Do gia dung
          </Button>
          <Button className="button_category">
            Do gia dung
          </Button>
        </div>
        <div className="home_content">
          <div className="best_product">
            <div className="title_best_product">
              Best product
            </div>
            <div className="best_product_content">
              Content of best product
            </div>
          </div>
          <div className="normal_product">
            Normal product
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
