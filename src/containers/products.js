import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clickProduct} from '../actions/act';

class Products extends Component{

    createListItems(){
        return this.props.products.map((prod) => {
            return (
                <li
                    key={prod.id}
                    onClick={()=>this.props.clickProduct(prod)}
                >
                    {prod.name}
                </li>
            );
        });
    }

    render(){
        return(
            <div>
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({clickProduct: clickProduct}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Products);