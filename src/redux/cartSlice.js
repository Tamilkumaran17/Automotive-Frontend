    import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    name: "cart",

    initialState: {
        items: []
    },

    reducers: {

        add: (state, action) => {

            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1, productId: action.payload.id });
            }
        },

        remove: (state, action) => {

            const index = state.items.findIndex(item => item.productId === action.payload.productId);

            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },

        update: (state, action) => {

            const existingItem = state.items.find(item => item.productId === action.payload.productId);

            if (existingItem) {
                if (existingItem.quantity + action.payload.quantity >= 1) {
                    existingItem.quantity += action.payload.quantity;
                }
            }
        },

        decrement: (state, action) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },


        clear: (state) => {
            state.items = [];
        },
        initCart: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const { add, remove, clear, update, decrement, initCart } = cartSlice.actions;
export default cartSlice.reducer;
