import React, { Component } from "react";
import { connect } from "react-redux";

import HomeMenu from "./../Menu";
import "./index.scss";

class Order extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { history } = this.props;

    return (
      <div className="order-background">
        <div className="order-menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div>
          hey hey
        </div>
      </div>
    )
  }
}

const mapPropsToState = state => {
  return {

  };
}

export default connect(
  mapPropsToState, 
  {

  }
)(Order);