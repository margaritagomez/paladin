const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "CLICK_PRODUCT":
            return [
                ...state,
                action.payload
            ];

        case "DELETE_FROM_CART":
            const toDelete = action.payload;
            let newArr = [...state];
            const ind = newArr.indexOf(toDelete);
            if (ind > -1)
                newArr.splice(ind, 1);
            return newArr;

        case "BUY_CART":
            return [];

        default:
            return state
    }
};

export default cartReducer;
