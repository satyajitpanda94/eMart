import { createSlice } from "@reduxjs/toolkit";

export const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        ordersList: [],
        ordersToBePlaced: []
    },
    reducers: {
        addToOrdersList: (state, action) => {
            state.ordersToBePlaced = [...action.payload]
            const orderOn = new Date().toISOString().slice(0, 10)
            action.payload = action.payload.map(order => { return { ...order, orderOn } })
            state.ordersList = [...state.ordersList, ...action.payload]
        },
    },
});


export const {
    addToOrdersList
} = OrdersSlice.actions;

export default OrdersSlice.reducer