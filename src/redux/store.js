import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import searchSlice from './searchSlice';
import wishListSlice from './wishListSlice';
import ProductList from './ProductList';
import userSlice, { setUser } from './userSlice';
import tokenSlice from './tokenSlice';



const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchSlice,
        wishList: wishListSlice,
        productlist: ProductList,
        user: userSlice,
        token:tokenSlice
        
        
    }
});

export default store;