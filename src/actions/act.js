export const clickProduct = (product) => {
    return {
        type: "CLICK_PRODUCT",
        payload: product
    }
};

export const clickCategory = (category) => {
    return {
        type: "CLICK_CATEGORY",
        payload: category
    }
};

export const clickSubCategory = (category) => {
    return {
        type: "CLICK_SUBCATEGORY",
        payload: category
    }
};

export const sortFilterProducts = (criteria) => {
    return {
        type: "SORT_FILTER_PRODUCTS",
        payload: criteria
    }
};

export const searchProducts = (criteria) => {
    return {
        type: "SEARCH_PRODUCTS",
        payload: criteria
    }
};

export const setDropdownVisibility = (visibility) => {
    return {
        type: "SET_DROPDOWN_VISIBILITY",
        payload: visibility
    }
};

export const setFiltered = (value) => {
    return {
        type: "SET_FILTERED",
        payload: value
    }
};

export const filterSearch = (regEx) => {
    return {
        type: "FILTER_SEARCH",
        payload: regEx
    }
};

export const noCategory = () => {
    return {
        type: "NO_CATEGORY",
        payload: ''
    }
};