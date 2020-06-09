import React, { Component } from "react";
import { connect } from "react-redux";
import './index.scss';

import { Table, Button } from 'antd';
import DrawerProductDetail from '../DrawerProductDetail'
import HomeMenu from '../Menu';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 1,
          name: "aoe",
          category: "war",
          price: 1000000,
          description: "hey hey"
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        },
        {
          id: 2,
          name: "fifa",
          category: "football",
          price: 2000000,
          description: "ojuwghworhgowh",
        }
      ],
      visibleDrawer: false,
      renderProductId: 0,
    }
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: "",
      key: 'action',
      align: 'center',
      dataIndex: 'delete'
    }
  ]

  getData() {
    const { products } = this.state;

    return products.map(product => {
      const { id, name, category, price, description } = product;

      return({
        key: id,
        name: name,
        price: price,
        delete: <Button onClick={() => this.handleDeleteRow(id)}> Delete </Button>
      })
    })
  }

  handleDeleteRow = key => {
    console.log(key)
  }

  handleClickRow = (event, record, rowIndex) => {
    const { key } = record;

    this.setState({
      visibleDrawer: true,
      renderProductId: key,
    })
  }

  handleCloseDrawer = () => {
    this.setState({
      visibleDrawer: false,
      renderProductId: 0,
    })
  }

  renderDrawerProductDetail() {
    const { visibleDrawer, renderProductId } = this.state;

    return visibleDrawer && (
      <DrawerProductDetail
        visibleDrawer={visibleDrawer}
        callback={e => {this.handleCloseDrawer()}}
        renderId={renderProductId}
      />
    )
  }

  render() {
    const { history } = this.props;
    const { product } = this.state;

    return(
      <div className="home-cart">
        <div className="cart-menu">
          <HomeMenu
            history={history}
          />
        </div>
        <div className="cart-content">
          <div className="cart-title">
            Cart
          </div>
          <div className="cart-product">
            <Table
              dataSource={this.getData()}
              columns={this.columns}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => this.handleClickRow(event, record, rowIndex)
                }
              }}
              scroll={{ y: 300 }}
            />
          </div>
        </div>
        {this.renderDrawerProductDetail()}
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
)(Cart);