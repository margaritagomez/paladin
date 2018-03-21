import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';

class BreadcrumbCat extends Component {

    showActualCategory = () => {
        return this.props.currCategory.levels.map((cat) => {
            return (
                <Breadcrumb.Item
                    key={cat.id}
                >
                    {cat.name}
                </Breadcrumb.Item>
            );
        });
    };

    render() {
        return(
            <Breadcrumb className="head bread" style={{ margin: '16px 0' }}>
                { this.showActualCategory() }
            </Breadcrumb>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        currCategory: state.currCategory
    }
};

export default connect(mapStateToProps)(BreadcrumbCat);
