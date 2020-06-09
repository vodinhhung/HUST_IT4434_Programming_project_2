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
    const { history } = this.props;

    return (
      <div className="home_content">
        <div className="home_menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="home_product">
          <div className="normal_product">
            Normal product
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
