'use client'
import React, { useEffect, useState } from 'react'
import style from './styles/Cart.module.css'
import { urlFor } from '../../../lib/getImageUrl'
import Image from 'next/image'
import Rating from './Rating'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { incrementQuantityInCart, decrementQuantityInCart, removeFromCart } from '../../../lib/CartReducer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToOrdersList } from '../../../lib/OrdersReducer'

export default function Cart({ cartItems, totalCartQuantity, totalPriceOfCart }) {
    const dispatch = useDispatch()
    const router = useRouter()

    const totalDiscountedPrice = cartItems.reduce((totalDiscount, item) => {
        if (item.discount) {
            const discount = item.discount.split('%')[0]
            return totalDiscount + (item.price * item.quantity * discount) / 100
        }
        return totalDiscount
    }, 0).toFixed(2)

    const totalDeliveryCharge = cartItems.reduce((totalDeliveryCharges, item) => {
        if (item.deliveryCharges) {
            return totalDeliveryCharges + item.deliveryCharges
        }
        return totalDeliveryCharges
    }, 0).toFixed(2)

    const grandTotal = (Number(totalPriceOfCart) + Number(totalDeliveryCharge) - Number(totalDiscountedPrice)).toFixed(2)

    const getDiscountedPrice = (price, discount) => {
        discount = discount.split('%')[0]
        return (price - (price * discount) / 100).toFixed(2)
    }

    const placeOrder = (products) => {
        dispatch(addToOrdersList([...products]))
        router.push('/placeorder')
    }

    return (
        <div className={style.Cart}>
            <div className={style.cartItemCards}>
                {
                    cartItems.map((item, index) => (
                        <div key={index} className={style.cartItemCard}>
                            <div className={style.imageContainer}>
                                <Image
                                    src={urlFor(item.image[0]).url()}
                                    alt="cart item"
                                    width={100}
                                    height={150}
                                    placeholder="blur"
                                    blurDataURL={urlFor(item.image[0]).url()}
                                    className={style.cartImage}
                                />
                            </div>
                            <div className={style.cartItemDetails}>
                                <Link href={`/product/${item.slug.current}`}>
                                    <h3 className={style.productName}>{item.name}</h3>
                                </Link>
                                <Rating rating={item.rating} color={'red'} />
                                <p>
                                    Price ( ₹{item.price} / item ) :&nbsp;
                                    <span>
                                        {
                                            item.discount
                                                ? (<>
                                                    <span className={style.productPrice}>
                                                        ₹{getDiscountedPrice(item.totalPrice, item.discount)} &nbsp;
                                                    </span>
                                                    <span>{item.discount} Off</span>
                                                </>
                                                )
                                                : <span className={style.productPrice}>₹{item.totalPrice.toFixed(2)}</span>
                                        }
                                    </span>
                                </p>
                                <span>
                                    Delivery Charge : {
                                        item.deliveryCharges ?
                                            `₹${item.deliveryCharges}` :
                                            'Free'
                                    }
                                </span>
                                <div className={style.quantity}>
                                    <span
                                        className={style.minus}
                                        onClick={() => dispatch(decrementQuantityInCart(item))}
                                    >
                                        <AiOutlineMinus />
                                    </span>
                                    <span className={style.num}>
                                        {item.quantity}
                                    </span>
                                    <span
                                        className={style.plus}
                                        onClick={() => dispatch(incrementQuantityInCart(item))}
                                    >
                                        <AiOutlinePlus />
                                    </span>
                                </div>
                                <span
                                    className={style.remove}
                                    onClick={() => dispatch(removeFromCart(item))}
                                >REMOVE</span>
                            </div>
                        </div>
                    ))
                }
                <div className={style.orderBottom}>
                    <button
                        className={style.placeOrderButton}
                        onClick={() => placeOrder(cartItems)}
                    >Place Order</button>
                </div>
            </div>
            <div className={style.priceDetailContainer}>
                <div className={style.priceDetail}>
                    <h4>PRICE DETAILS</h4>
                    <div className={style.priceRow}>
                        <span>Price ({totalCartQuantity} items)</span>
                        <span>₹{totalPriceOfCart.toFixed(2)}</span>
                    </div>
                    <div className={style.priceRow}>
                        <span>Discount</span>
                        <span>-₹{totalDiscountedPrice}</span>
                    </div>
                    <div className={style.priceRow}>
                        <span>Delivery Charges</span>
                        <span>₹{totalDeliveryCharge}</span>
                    </div>
                    <div className={style.totalPrice}>
                        <h4>Total Amount</h4>
                        <h4>₹{grandTotal}</h4>
                    </div>
                </div>
            </div>
        </div >
    )
}
