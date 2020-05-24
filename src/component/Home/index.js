import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import "./index.scss";

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            visibleModal: false,
        }
    }

    handleShowModal = () => {
        this.setState({ visibleModal: true, })
    }

    handleCloseModal = () => {
        this.setState({ visibleModal: false, })
    }

    render() {
        const { visibleModal } = this.state;

        return(
            <div className="home">
                <div className="sticky_scroll">
                    <Button
                        style={{
                            width: 200,
                            height: 500,
                        }}
                        onClick={this.handleShowModal}
                        size="small"
                        placeholder="Log in"
                    />
                    {/* {visibleModal && ( */}
                        <Modal
                            title="Login Layout"
                            visible={visibleModal}
                            onCancel={this.handleCloseModal}
                            onOk={this.handleCloseModal}
                        >
                            Hey hey hey hey
                        </Modal>
                    {/* )} */}
                </div>
            </div>
        )
    }
}

export default Home;