import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickProduct, sortFilterProducts } from '../actions/act';
import { Table, Button } from 'antd';

class Products extends Component{

    createListItems = () => {
        return this.props.products.map((prod) => {
            return (
                <li
                    key={prod.id}
                    onClick={()=>this.props.clickProduct(prod)}
                >
                    {prod.name} {' '}
                    {prod.sublevel_id}
                </li>
            );
        });
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', filters, sorter);
        this.props.sortFilterProducts({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    clearAll = () => {
        this.props.sortFilterProducts({
            filteredInfo: {},
            sortedInfo: {}
        });
    };

    sortPrice = (a, b) => {
        const aPriceNoSign = a.price.substring(1);
        const bPriceNoSign = b.price.substring(1);
        const aPriceNoComma = aPriceNoSign.replace(',','');
        const bPriceNoComma = bPriceNoSign.replace(',','');
        const aPrice = parseInt(aPriceNoComma, 10);
        const bPrice = parseInt(bPriceNoComma, 10);
        return aPrice - bPrice;
    };

    checkPrice = (strRange, item) => {
        const priceNoSign = item.price.substring(1);
        const priceNoComma = priceNoSign.replace(',','');
        const priceNum = parseInt(priceNoComma, 10);

        const arrRange = strRange.split(',');
        const range = [parseInt(arrRange[0],10),parseInt(arrRange[1],10)];

        return (priceNum>=range[0] && priceNum<range[1]);
    };

    checkQuantity = (strRange, item) => {
        const quant = item.quantity;
        const arrRange = strRange.split(',');
        const range = [parseInt(arrRange[0],10),parseInt(arrRange[1],10)];
        return (quant>=range[0] && quant<range[1]);
    };

    checkAvailability = (value, item) => {
        let av = "false";
        if (item.available)
            av = "true";
        return av === value;
    };

    showAvailability = (av) => {
        return (av) ? <p> In Stock </p> : <p> Not Available </p>;
    };

    render(){
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            filters: [
                { text:'$0 - $5,000', value:[0, 5000] },
                { text:'$5,000 - $10,000', value:[5000, 10000] },
                { text:'$10,000 - $15,000', value:[10000, 15000] },
                { text:'$15,000 - $20,000', value:[15000, 20000] }
            ],
            filteredValue: this.props.sortFilter.filteredInfo.price || null,
            onFilter:  (value, record) => this.checkPrice(value, record),
            sorter: (a, b) => this.sortPrice(a,b),
            sortOrder: this.props.sortFilter.sortedInfo.columnKey === 'price' && this.props.sortFilter.sortedInfo.order
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            filters: [
                { text:'0 - 250', value:[0, 250] },
                { text:'251 - 500', value:[250, 500] },
                { text:'501 - 750', value:[500, 750] },
                { text:'751 - 1000', value:[750, 1000] }
            ],
            filteredValue: this.props.sortFilter.filteredInfo.quantity || null,
            onFilter: (value, record) => this.checkQuantity(value, record),
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder: this.props.sortFilter.sortedInfo.columnKey === 'quantity' && this.props.sortFilter.sortedInfo.order
        }, {
            title: 'Available',
            dataIndex: 'available',
            render: (record) => this.showAvailability(record),
            key: 'available',
            filters: [
                { text:'Available', value:true },
                { text: "Not available", value:false }
            ],
            filteredValue: this.props.sortFilter.filteredInfo.available || null,
            onFilter: (value, record) => this.checkAvailability(value, record),
            sorter: (a, b) => a.available - b.available,
            sortOrder: this.props.sortFilter.sortedInfo.columnKey === 'available' && this.props.sortFilter.sortedInfo.order
        }];

        return(
            <div>
                <div>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                </div>
                <Table columns={columns} dataSource={this.props.products} onChange={this.handleChange} rowKey={record => record.id}/>
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products,
        sortFilter: state.sortFilter
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickProduct: clickProduct,
        sortFilterProducts: sortFilterProducts
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Products);
