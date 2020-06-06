import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import "./index.scss";

import HomeMenu from '../Menu';

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
            className="sticky_button">
            Logout
          </Button>
          <Button
            className="sticky_button">
            Cart
          </Button>
        </div>
        <div className="home_content">
          <div className="home_menu">
            <HomeMenu/>
          </div>
          <div className="home_product">
            <div className="normal_product">
              Normal product
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    product: state.product,
  }
}

export default connect(
  mapStateToProps, 
  {

  }
)(Home);
