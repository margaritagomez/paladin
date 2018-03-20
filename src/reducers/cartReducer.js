const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "CLICK_PRODUCT":
            console.log(state);
            return [
                ...state,
                action.payload
            ];
        default:
            return state
    }
};

export default cartReducer;
