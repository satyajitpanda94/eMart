import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
    },
    reducers: {
        addToOrderList: (state, action) => {
            state.products=[...action.payload]
        }
    },
});


export const {
   addToOrderList
} = CartSlice.actions;

export default CartSlice.reducer