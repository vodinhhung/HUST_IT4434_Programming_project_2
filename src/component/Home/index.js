import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import "./index.scss";
import {
  fetchAllProduct,
  fetchCartInfo
} from '../../action';

import HomeMenu from '../Menu';
import DrawerProductDetail from '../DrawerProductDetail';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleDrawer: false,
      productId: 0,
    };
  }

  componentDidMount = async () => {
    const { fetchAllProduct, fetchCartInfo }= this.props;
    await fetchAllProduct()
    await fetchCartInfo()
  }

  handleOnClickImage = id => {
    this.setState({
      visibleDrawer: true,
      productId: id,
    })
  }

  handleCloseDrawer = () => {
    this.setState({
      visibleDrawer: false,
    })
  }

  renderDrawerProductDetail() {
    const { visibleDrawer, productId } = this.state;

    return visibleDrawer && (
      <DrawerProductDetail
        visibleDrawer={visibleDrawer}
        callback={e => {this.handleCloseDrawer()}}
        productId={productId}
        isHome={true}
      />
    )
  }

  renderProductBoxes() {
    const { products } = this.props;

    return products.map(product => {
      const { id, name, category, description, imageURL, price } = product;

      return (
        <div className="product_box">
          <img 
            src={imageURL} 
            className="product_image"
            onClick={e => this.handleOnClickImage(id)}/>
          <div className="product_info">
            <div>{category}</div>
            <div>{name}</div>
            <div>{price}</div>
          </div>
        </div>
      )
    })
  };

  render() {
    const { history } = this.props;

    return (
      <div className="home_content">
        <div className="home_menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="home_image"></div>
        <div className="home_product">
          {this.renderProductBoxes()}
        </div>
        {this.renderDrawerProductDetail()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.product.products,
  }
}

export default connect(
  mapStateToProps, 
  {
    fetchAllProduct,
    fetchCartInfo
  }
)(Home);
