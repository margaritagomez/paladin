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
