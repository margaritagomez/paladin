import React, { Component } from 'react';
import { buyCart, deleteFromCart } from "../actions/act";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'antd';

class Cart extends Component{

    setKey = () => {
        return Math.floor((Math.random() * 1000) + 1);
    };

    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: 'Delete',
            render: (record) => {
                return (
                    <Button
                        type="danger"
                        icon="delete"
                        onClick={()=>this.props.deleteFromCart(record)}
                        ghost
                    >
                        Delete
                    </Button>);
            },
            key: 'delete',
            fixed: 'right',
            width: 100
        }];

        let cartB = {};
        if (this.props.cart.length > 0)
            cartB = (
                <div>
                    <div className="btBuy">
                        <Button
                            onClick={() => this.props.buyCart()}
                            type="primary"
                            size="large"
                        >
                            Buy all products
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.props.cart}
                        rowKey={() => this.setKey()}
                        scroll={{ x: 600 }}
                    />
                </div>

            );
        else
            cartB = (
                <div className="textNoProd">
                    There are no products in the cart
                </div>
            );

        return(
            cartB
        );
    }

}

const mapStateToProps = (state) => {
    return{
        cart: state.cart
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteFromCart: deleteFromCart,
        buyCart: buyCart
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Cart);
