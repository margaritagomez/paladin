const menuReducer = (state = {showing:false, menuMode: ''}, action) => {
    switch (action.type) {
        case "MENU_VISIBILITY":
            const newSh = !state.showing;
            return {
                ...state,
                showing: newSh
            };

        case "MENU_MODE_INLINE":
            return {
                ...state,
                menuMode: 'inline'
            };

        case "MENU_MODE_HORIZONTAL":
            return {
                ...state,
                menuMode: 'horizontal'
            };
        default:
            return state
    }
};

export default menuReducer;
