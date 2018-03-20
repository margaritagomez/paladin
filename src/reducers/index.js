import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import cartReducer from './cartReducer';
import currCategoryReducer from './currCategoryReducer';
import sortFilterReducer from './sortFilterReducer';

const allReducers = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    currCategory: currCategoryReducer,
    sortFilter: sortFilterReducer
});

export default allReducers;
