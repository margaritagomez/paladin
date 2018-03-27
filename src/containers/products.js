import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    clickProduct,
    searchProducts,
    sortFilterProducts,
    setDropdownVisibility,
    setFiltered,
    filterSearch,
    noCategory
} from '../actions/act';
import { Table, Input, Button, Icon } from 'antd';

class Products extends Component{

    /*
    * Handles changes in filters and sorters
    */
    handleChange = (pagination, filters, sorter) => {
        //console.log('Various parameters', filters, sorter);
        this.props.sortFilterProducts({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    /*
    * Clears all existing filters and sorters
    */
    clearAll = () => {
        this.props.sortFilterProducts({
            filteredInfo: {},
            sortedInfo: {}
        });
        const reg = new RegExp('', 'gi');
        this.props.filterSearch(reg);
        this.props.noCategory();
    };

    /*
    * Defines price sorter by changing String price values to Integers
    */
    sortPrice = (a, b) => {
        const aPriceNoSign = a.price.substring(1);
        const bPriceNoSign = b.price.substring(1);
        const aPriceNoComma = aPriceNoSign.replace(',','');
        const bPriceNoComma = bPriceNoSign.replace(',','');
        const aPrice = parseInt(aPriceNoComma, 10);
        const bPrice = parseInt(bPriceNoComma, 10);
        return aPrice - bPrice;
    };

    /*
    * Checks if price is between given values
    */
    checkPrice = (strRange, item) => {
        const priceNoSign = item.price.substring(1);
        const priceNoComma = priceNoSign.replace(',','');
        const priceNum = parseInt(priceNoComma, 10);

        const arrRange = strRange.split(',');
        const range = [parseInt(arrRange[0],10),parseInt(arrRange[1],10)];

        return (priceNum>=range[0] && priceNum<range[1]);
    };

    /*
    * Checks if quantity is between given values
    */
    checkQuantity = (strRange, item) => {
        const quant = item.quantity;
        const arrRange = strRange.split(',');
        const range = [parseInt(arrRange[0],10),parseInt(arrRange[1],10)];
        return (quant>=range[0] && quant<range[1]);
    };

    /*
    * Checks if item is available
    */
    checkAvailability = (value, item) => {
        let av = "false";
        if (item.available)
            av = "true";
        return av === value;
    };

    /*
    * Returns rendering value according to availability
    */
    showAvailability = (av) => {
        return (av) ? <p> In Stock </p> : <p> Not Available </p>;
    };

    onInputChange = (e) => {
        this.props.searchProducts(e.target.value);
    };

    onSearch = () => {
        const searchText  = this.props.search.searchText;
        const reg = new RegExp(searchText, 'gi');

        this.props.setDropdownVisibility(false);
        this.props.setFiltered(!!searchText);
        this.props.filterSearch(reg);
    };

    render(){
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.props.search.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.props.search.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.props.search.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.props.setDropdownVisibility(visible);
            }
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
        }, {
            title: 'Buy',
            render: (record) => {
                return <Button type="primary" onClick={()=>this.props.clickProduct(record)} ghost>Buy</Button>
            },
            key: 'operation',
            fixed: 'right',
            width: 100
        }];

        return(
            <div>
                <div className="btClear">
                    <Button onClick={this.clearAll}>Clear filters and sorters </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.props.products}
                    onChange={this.handleChange}
                    rowKey={record => record.id}
                    scroll={{ x: 650 }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products,
        sortFilter: state.sortFilter,
        search: state.search
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickProduct: clickProduct,
        sortFilterProducts: sortFilterProducts,
        searchProducts: searchProducts,
        setDropdownVisibility: setDropdownVisibility,
        setFiltered: setFiltered,
        filterSearch : filterSearch,
        noCategory: noCategory
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Products);
