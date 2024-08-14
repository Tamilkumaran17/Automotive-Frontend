// import { createSlice } from "@reduxjs/toolkit";
// // import { product } from "../constant";
// import axios from 'axios';
// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

// const fetchProducts= async () =>{
//     try{
//         const response = await axios.get("http://localhost:3000/products");
//         return response.data;
//     }
//     catch(error){
//         console.log("failed to fetch products: ",error);
//         throw error;
//     }
// };


// const initialState = {
//     query: [],
// };


// const searchSlice = createSlice({

//     name: "search",

//     initialState:{},

//     reducers: {
        
        

//             // if(action.payload=== null){
//             //     state.query = product
//             // }

//             // else
//             // state.query = product.filter((item)=> item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
//             //                                       item.description.toLowerCase().includes(action.payload.toLowerCase()) ||
//             //                                     item.category.toLowerCase().includes(action.payload.toLowerCase())
//             //                                 );


//             setSearchQuery(state,action){
//                 const products = action.payload;
//                 state.query=products;
//             }
//         },

        


        
    

// })

// export const {setSearchQuery } = searchSlice.actions;

// export const fetchAndSet = ()=> async (dispatch) =>{
//     const products = await fetchProducts();
//     dispatch(setSearchQuery(products));

// }
// export default searchSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const fetchProducts = async () => {

    
    
    try {
        const response = await axios.get("https://automotive-backend-ctzn.onrender.com/products",);
        return response.data;

    } catch (error) {
        console.error('Failed to fetch products:', error);
        return []; 
    }
};


const products = await fetchProducts();

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: products,
    },
    reducers: {
        setSearchQuery(state, action) {
            if (action.payload === null) {
                state.query = products;
            } else {
                state.query = products.filter((item) => 
                    item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    item.description.toLowerCase().includes(action.payload.toLowerCase()) ||
                    item.category.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
        },
    },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
