const cartReducer = (state = (JSON.parse(localStorage.getItem('cart')) || []), action) => {
    switch (action.type) {
        case "CLICK_PRODUCT":
            const nState = [...state, action.payload];
            localStorage.setItem('cart', JSON.stringify(nState));
            return nState;

        case "DELETE_FROM_CART":
            const toDelete = action.payload;
            let newArr = [...state];
            const ind = newArr.indexOf(toDelete);
            if (ind > -1)
                newArr.splice(ind, 1);
            localStorage.setItem('cart', JSON.stringify(newArr));
            return newArr;

        case "BUY_CART":
            const emptyArr = [];
            localStorage.setItem('cart', JSON.stringify(emptyArr));
            return emptyArr;

        default:
            return state
    }
};

export default cartReducer;
