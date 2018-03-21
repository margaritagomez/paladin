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
                <div>
                    <Cart/>
                </div>
            );
        } else {
            bodyApp = (
                <div>
                    <BreadcrumbCat />
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Products/>
                    </div>
                </div>
            );
        }

        return (

            <div className="App">
                <Layout className="layout">
                    <Header>
                        <TopMenu/>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
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
