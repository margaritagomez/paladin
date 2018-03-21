const cartReducer = (state = (JSON.parse(localStorage.getItem('carroo')) || []), action) => {
    switch (action.type) {
        case "CLICK_PRODUCT":
            console.log( localStorage.getItem('carroo'));
            console.log('payload type ', typeof action.payload);
            const nState = [...state, action.payload];
            localStorage.setItem('carroo', JSON.stringify(nState));
            return nState;

        case "DELETE_FROM_CART":
            const toDelete = action.payload;
            let newArr = [...state];
            const ind = newArr.indexOf(toDelete);
            if (ind > -1)
                newArr.splice(ind, 1);
            localStorage.setItem('carroo', JSON.stringify(newArr));
            return newArr;

        case "BUY_CART":
            const emptyArr = [];
            localStorage.setItem('carroo', JSON.stringify(emptyArr));
            return emptyArr;

        default:
            return state
    }
};

export default cartReducer;
