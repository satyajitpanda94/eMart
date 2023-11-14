import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './lib/CartReducer'

export default configureStore({
    reducer: {
        cart: CartReducer
    },
})