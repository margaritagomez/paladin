import { combineReducers } from 'redux';
import appReducer from './appReducer';
import menuReducer from './menuReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import cartReducer from './cartReducer';
import currCategoryReducer from './currCategoryReducer';
import sortFilterReducer from './sortFilterReducer';
import searchReducer from './searchReducer';

const allReducers = combineReducers({
    app: appReducer,
    menu: menuReducer,
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    currCategory: currCategoryReducer,
    sortFilter: sortFilterReducer,
    search: searchReducer
});

export default allReducers;
