//import products from '../data/products.json';
//import categories from '../data/categories.json';

const sortFilterReducer = (state = {filteredInfo:{}, sortedInfo:{}}, action) => {
    switch (action.type) {

        case "SORT_FILTER_PRODUCTS":
            //Sort products
            const sortFilters = action.payload;
            state = {filteredInfo:sortFilters.filteredInfo, sortedInfo:sortFilters.sortedInfo};
            return state;

        default:
            return state
    }
};

export default sortFilterReducer;
