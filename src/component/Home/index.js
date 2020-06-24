import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Input, Button, Modal } from "antd";
import "./index.scss";
import {
  fetchAllProduct,
  fetchCartInfo,
  fetchUserInfo
} from '../../action';

import HomeMenu from '../Menu';
import DrawerProductDetail from '../DrawerProductDetail';
import ModalProduct from '../ModalProduct';

const { Search } = Input;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleDrawer: false,
      productId: 0,
      visibleAddProduct: false,
      userInfo: {},
    };
  }

  componentDidMount = async () => {
    const { fetchAllProduct, fetchCartInfo, fetchUserInfo }= this.props;
    const params = {
      name: "",
      category: "",
    }

    await fetchAllProduct(params)
    await fetchUserInfo().then(res => {
      this.setState({
        userInfo: res,
      })
    })
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

  handleSearch = async (value) => {
    const { fetchAllProduct } = this.props;
    const params = {
      name: value,
      category: "",
    }

    await fetchAllProduct(params)
  }

  handleSearchByCategory = async (key) => {
    const { fetchAllProduct } = this.props;
    const params = {
      name: "",
      category: key != "all" ? key : "",
    }
    await fetchAllProduct(params)
  }

  handleButtonAddNewProduct = e => {
    this.setState({
      visibleAddProduct: true,
    })
  }

  handleCancelModal = e => {
    this.setState({
      visibleAddProduct: false,
    })
  }

  renderModalAddProduct() {
    const { visibleAddProduct } = this.state;

    return(
      <ModalProduct
        visibleAddProduct={visibleAddProduct}
        isCreate={true}
        callback={e => {this.handleCancelModal()}}
      />
    )
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
            <div className="name">{name}</div>
            <div>{price}đ </div>
          </div>
        </div>
      )
    })
  };

  render() {
    const { history } = this.props;
    const { userInfo } = this.state;
    const { type } = userInfo;
 
    return (
      <div className="home_content">
        <div className="home_menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="home_image"></div>
        <div className="home_search">
          <div className="menu_category">
            <Menu 
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ width: 300}}
              onClick={({key}) => this.handleSearchByCategory(key)}>
              <Menu.Item key="all"> All </Menu.Item>
              <Menu.Item key="RPG"> RPG </Menu.Item>
              <Menu.Item key="FPS"> FPS </Menu.Item>
              <Menu.Item key="Action"> Action </Menu.Item>
              <Menu.Item key="Sports"> Sports </Menu.Item>
              <Menu.Item key="Indie"> Indie </Menu.Item>
            </Menu>
          </div>
          <div className="search_input">
            {type == 1 && 
              <Button
                className="add-new-button"
                type="primary"
                onClick={this.handleButtonAddNewProduct}
              >
                Add new product
              </Button>
            }
            <Search
              placeholder="Search"
              onSearch={value => this.handleSearch(value)}
              className="search"
            />
          </div>
        </div>
        <div className="home_product">
          {this.renderProductBoxes()}
        </div>
        {this.renderDrawerProductDetail()}
        {this.renderModalAddProduct()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    products: state.product.products,
  }
}

export default connect(
  mapStateToProps, 
  {
    fetchAllProduct,
    fetchCartInfo,
    fetchUserInfo
  }
)(Home);
