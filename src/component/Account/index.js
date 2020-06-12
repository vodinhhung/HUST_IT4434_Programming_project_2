import React, { Component } from "react";
import { connect } from "react-redux";

import HomeMenu from "./../Menu";
import "./index.scss";

class Account extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        account
      </div>
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
)(Account);