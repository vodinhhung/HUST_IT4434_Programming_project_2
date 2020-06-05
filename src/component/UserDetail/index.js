import React, { Component } from "react";
import { connect } from "react-redux";

import './index.scss';

class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="userdetail_background">
        Hey hey
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(UserDetail);
