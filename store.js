import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './lib/CartReducer'
import PlaceOrderReducer from './lib/PlaceOrderReducer'

export default configureStore({
    reducer: {
        cart: CartReducer,
        order: PlaceOrderReducer
    },
})