import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import { clickCategory, clickSubCategory } from '../actions/act';

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
                        onTitleClick={()=>this.props.clickCategory(subl2.id)}
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
                        onTitleClick={()=>this.props.clickCategory(subl1.id)}
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
            <Menu onClick={(key)=>this.props.clickSubCategory(key)}>
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

    render(){
        return(
            <div>
                {this.listCategories()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        categories: state.categories
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({clickSubCategory: clickSubCategory, clickCategory: clickCategory}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopMenu);
