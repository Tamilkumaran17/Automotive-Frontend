import {createSlice} from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count:10

    },
    reducers: {
        increment: (state,action)=>{
            state.count +=action.payload;
        },
        decrement: () =>{}

    }
});


export const {increment,decrement} = counterSlice.actions;
export default counterSlice.reducer;