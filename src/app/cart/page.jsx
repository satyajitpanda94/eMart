'use client'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import EmptyCart from '../components/EmptyCart'
import Cart from '../components/Cart'

export default function page() {
    const cartItems = useSelector(state => state.cart.cartItems)
    const totalCartQuantity = useSelector(state => state.cart.totalCartQuantity)
    const totalPriceOfCart = useSelector(state => state.cart.totalPriceOfCart)

    return (
        <div>
            {
                cartItems.length === 0 ?
                    <EmptyCart /> :
                    <Cart
                        cartItems={cartItems}
                        totalCartQuantity={totalCartQuantity}
                        totalPriceOfCart={totalPriceOfCart}
                    />
            }
        </div>
    )
}
