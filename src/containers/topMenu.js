import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, Button } from 'antd';
import {clickCategory, clickSubCategory, showCart} from '../actions/act';

const SubMenu = Menu.SubMenu;

class TopMenu extends Component{


    listSubcat2 = (subl1) => {
        return subl1.sublevels.map((subl2) => {
            // Traverses second sublevels
            let sublevels3 = subl2.sublevels;
            if (sublevels3) {
                return (
                    <SubMenu
                        title={subl2.name}
                        key={subl2.id}
                        onTitleClick={()=>this.show('cat',subl2.id)}
                    >
                        {this.listSubcat2(subl2)}
                    </SubMenu>
                );
            }
            else {
                return (
                    <Menu.Item key={subl2.id}>
                        {subl2.name}
                    </Menu.Item>
                );
            }
        });
    };

    listSubcat = (cat) => {
        // Traverses first sublevels
        return cat.sublevels.map((subl1) => {
            // Traverses second sublevels
            let sublevels2 = subl1.sublevels;
            if (sublevels2) {
                return (
                    <SubMenu
                        title={subl1.name}
                        key={subl1.id}
                        onTitleClick={()=>this.show('cat',subl1.id)}
                    >
                        {this.listSubcat2(subl1)}
                    </SubMenu>
                );
            }
            else {
                return (
                    <Menu.Item key={subl1.id}>
                        {subl1.name}
                    </Menu.Item>
                );
            }
        });
    };

    eachCat = (cat) => {
        return (
            <Menu onClick={(key)=>this.show('sub',key)}>
                {this.listSubcat(cat)}
            </Menu>
        );
    };

    listCategories = () => {
        return this.props.categories.map((cat) => {
            return (
                <Dropdown
                    theme="dark"
                    mode="horizontal"
                    overlay = {this.eachCat(cat)}
                    key={cat.id}
                >
                    <a className="ant-dropdown-link">
                        {cat.name} <Icon type="down" />
                    </a>
                </Dropdown>

            );
        });
    };

    cartNumber = () => {
        return this.props.cart.length;
    };

    show = (subOrCat, param) => {
        if (subOrCat==='cat'){
            this.props.clickCategory(param);
        } else {
            this.props.clickSubCategory(param);
        }
        if (this.props.app)
            this.props.showCart();
    };

    render(){
        return(
            <div>
                {this.listCategories()}
                <Button
                    type="primary"
                    icon="shopping-cart"
                    className="cartBt"
                    onClick={() => this.props.showCart()}
                > {this.cartNumber()} </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        categories: state.categories,
        cart: state.cart,
        app: state.app
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickSubCategory: clickSubCategory,
        clickCategory: clickCategory,
        showCart: showCart
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopMenu);
