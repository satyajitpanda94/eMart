import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './lib/CartReducer'
import OrdersReducer from './lib/OrdersReducer'

export default configureStore({
    reducer: {
        cart: CartReducer,
        order: OrdersReducer
    },
})