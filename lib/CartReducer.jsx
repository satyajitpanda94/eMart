import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        quantity: 1,
        totalCartQuantity: 0,
        totalPriceOfCart: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.cartItems.find(
                (item) => item._id === action.payload._id
            );

            if (itemPresent) {
                itemPresent.quantity += state.quantity;
                itemPresent.totalPrice += state.quantity * action.payload.price;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: state.quantity,
                    totalPrice: state.quantity * action.payload.price
                });
            }

            state.totalCartQuantity += state.quantity;
            state.totalPriceOfCart += state.quantity * action.payload.price;
            state.quantity = 1
        },
        removeFromCart: (state, action) => {
            const removeItem = state.cartItems.filter(
                (item) => item._id !== action.payload._id
            );

            state.cartItems = removeItem;
            state.totalCartQuantity -= action.payload.quantity;
            state.totalPriceOfCart -= action.payload.quantity * action.payload.price;
        },
        incrementQuantity: (state) => {
            state.quantity++;
        },
        decrementQuantity: (state) => {
            if (state.quantity > 1)
                state.quantity--
        },
        incrementQuantityInCart: (state, action) => {
            const itemPresent = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            itemPresent.quantity++
            itemPresent.totalPrice += action.payload.price;
            state.totalCartQuantity++
            state.totalPriceOfCart += action.payload.price;
        },
        decrementQuantityInCart: (state, action) => {
            const itemPresent = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            if (itemPresent.quantity === 1) {
                const removeItem = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );
                state.cartItems = removeItem;
            } else {
                itemPresent.quantity--;
                itemPresent.totalPrice -= action.payload.price;
            }
            state.totalCartQuantity--;
            state.totalPriceOfCart -= action.payload.price;
        },
        cleanCart: (state) => {
            state.cartItems = [];
            state.quantity = 1;
            state.totalCartQuantity = 0;
            state.totalPriceOfCart = 0;
        }
    },
});


export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    incrementQuantityInCart,
    decrementQuantityInCart,
    cleanCart
} = CartSlice.actions;

export default CartSlice.reducer