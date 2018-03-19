import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer
})

export default allReducers;