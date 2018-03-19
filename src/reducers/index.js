import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import cartReducer from './cartReducer';
import currCategoryReducer from './currCategoryReducer';

const allReducers = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    currCategory: currCategoryReducer
});

export default allReducers;