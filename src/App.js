import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import TopMenu from './containers/topMenu';
import Products from './containers/products';
import BreadcrumbCat from './containers/breadcrumbCat';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout className="layout">
              <Header>
                  <TopMenu/>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                  <BreadcrumbCat />
                  <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                      <Products/>
                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                  Margarita Gómez
              </Footer>
          </Layout>
      </div>
    );
  }
}

export default App;
