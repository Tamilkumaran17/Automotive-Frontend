import { createSlice } from "@reduxjs/toolkit";


const wishListSlice = createSlice({
    name: "wishList",
    initialState: {
        items: []
    },
    reducers: {
        addWishList(state, action) {
            const existingItem = state.items.find( item => item.id === action.payload.id)

            if(!existingItem){
                state.items.push(action.payload);           
             }
        },
        removeWishList(state, action){
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if(index !==-1){
                state.items.splice(index,1);
            }
        } ,
        clearWishList(state, action){
            state.items = [];
        },
        initWishlist: (state, action)=>{
            state.items = action.payload;
        }

    }

})

export const {addWishList, removeWishList ,clearWishList, initWishlist} = wishListSlice.actions;
export default wishListSlice.reducer;