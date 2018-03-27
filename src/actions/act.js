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

export const showCart = () => {
    return {
        type: "SHOW_CART",
        payload: ''
    }
};

export const deleteFromCart = (product) => {
    return {
        type: "DELETE_FROM_CART",
        payload: product
    }
};

export const buyCart = () => {
    return {
        type: "BUY_CART",
        payload: ''
    }
};

export const menuVisibility = () => {
    return {
        type: "MENU_VISIBILITY",
        payload: ''
    }
};

export const menuModeHorizontal = () => {
    return {
        type: "MENU_MODE_HORIZONTAL",
        payload: ''
    }
};

export const menuModeInline = () => {
    return {
        type: "MENU_MODE_INLINE",
        payload: ''
    }
};
