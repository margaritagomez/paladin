const appReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_CART":
            return !state;
        default:
            return state
    }
};

export default appReducer;
