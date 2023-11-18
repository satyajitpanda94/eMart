'use client'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import EmptyCart from '../components/EmptyCart'
import Cart from '../components/Cart'

export default function page() {
    const cartItems = useSelector(state => state.cart.cartItems)
    
    return (
        <div>
            {
                cartItems.length === 0 ?
                    <EmptyCart />  :
                    <Cart cartItems={cartItems} />
            }
        </div>
    )
}
