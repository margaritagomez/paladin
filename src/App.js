import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import TopMenu from './containers/topMenu';
import Products from './containers/products';
import BreadcrumbCat from './containers/breadcrumbCat';
import {connect} from "react-redux";
import Cart from "./containers/cart";

const { Header, Content, Footer } = Layout;

class App extends Component {
    render() {

        let bodyApp = {};
        if (this.props.app) {
            bodyApp = (
                <div className="body">
                    <Cart/>
                </div>
            );
        } else {
            bodyApp = (
                <div>
                    <BreadcrumbCat />
                    <div className="body" >
                        <Products/>
                    </div>
                </div>
            );
        }

        return (

            <div className="App">
                <Layout className="layout">
                    <Header className="head">
                        <TopMenu/>
                    </Header>
                    <Content className="content">
                        { bodyApp }
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Margarita Gómez
                    </Footer>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        app: state.app
    }
};

export default connect(mapStateToProps)(App);
