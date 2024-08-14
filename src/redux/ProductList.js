import { createSlice } from "@reduxjs/toolkit";

const ProductList = createSlice({
    name: "productlist",
    initialState: {
        products: {},
    },
    reducers: {
        setProducts(state, action) {
            

            
                state.products=(action.payload)

            
        }
    }
})

export const {setProducts} = ProductList.actions;
export default ProductList.reducer;