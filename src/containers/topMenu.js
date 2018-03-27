import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon, Popover } from 'antd';
import Media from 'react-media';
import {
    clickCategory, clickSubCategory, showCart, menuVisibility, menuModeHorizontal,
    menuModeInline
} from '../actions/act';

const SubMenu = Menu.SubMenu;

class TopMenu extends Component {

    componentWillMount () {
        this.checkSize();
    }

    componentDidMount () {
        window.onresize = this.checkSize;
    }

    checkSize = () => {
        if (window.innerWidth<671)
            this.props.menuModeInline();
        else this.props.menuModeHorizontal();
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
                        {this.listSubcat(subl1)}
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

    listCategories = () => {
        return this.props.categories.map((cat) => {
            return (
                <SubMenu
                    title={cat.name}
                    key={cat.id}
                >
                    {this.listSubcat(cat)}
                </SubMenu>

            );
        });
    };

    show = (subOrCat, param) => {
        if (subOrCat==='cat')
            this.props.clickCategory(param);
        else if (subOrCat==='sub' && param.key!=='cart')
            this.props.clickSubCategory(param);
        if (this.props.app || param.key==='cart')
            this.props.showCart();
    };

    render(){
        const menu = (
            <Menu className="topmenu" theme="dark" mode={this.props.menu.menuMode} onClick={(key)=>this.show('sub',key)}>
                {this.listCategories()}
                <Menu.Item key="cart">
                    <Icon type="shopping-cart" /> Shopping cart ({this.props.cart.length})
                </Menu.Item>
            </Menu>
        );

        return(
            <Media query="(max-width: 670px)">
                {
                    matches => {
                        if (matches) {
                            return (
                                <Popover
                                    overlayClassName="popover-menu"
                                    placement="bottomLeft"
                                    content={menu}
                                    trigger="click"
                                    visible={this.props.menu.showing}
                                    arrowPointAtCenter
                                >
                                    <Icon
                                        style={{color: '#FFF'}}
                                        type="menu-unfold"
                                        onClick={() => this.props.menuVisibility()}
                                    />
                                </Popover>
                            );
                        } else {
                            return menu;
                        }

                    }
                }
            </Media>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        categories: state.categories,
        cart: state.cart,
        app: state.app,
        menu: state.menu
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickSubCategory: clickSubCategory,
        clickCategory: clickCategory,
        showCart: showCart,
        menuVisibility: menuVisibility,
        menuModeHorizontal: menuModeHorizontal,
        menuModeInline: menuModeInline
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopMenu);
