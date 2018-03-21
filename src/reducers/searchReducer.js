const searchReducer = (state = {
    filterDropdownVisible: false,
    searchText:'',
    filtered:false
}, action) => {
    switch (action.type) {

        case "SEARCH_PRODUCTS":
            //Search products
            const criteria = action.payload;
            return {
                ...state,
                searchText: criteria
            };

        case "SET_DROPDOWN_VISIBILITY":
            // Change dropdown visibility
            const visib = action.payload;
            return {
                ...state,
                filterDropdownVisible: visib
            };

        case "SET_FILTERED":
            // Change filtered value
            const filt = action.payload;
            return {
                ...state,
                filtered: filt
            };

        default:
            return state
    }
};

export default searchReducer;
