'use client'
import React from 'react'
import style from './styles/Cart.module.css'
import { urlFor } from '../../../lib/getImageUrl'
import Image from 'next/image'
import Rating from './Rating'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { incrementQuantityInCart, decrementQuantityInCart, removeFromCart } from '../../../lib/CartReducer'

export default function Cart({ cartItems }) {
    const dispatch = useDispatch()

    console.log(cartItems)
    return (
        <div className={style.Cart}>
            <div className={style.cartItemCards}>
                {
                    cartItems.map((item, index) => (
                        <div key={index} className={style.cartItemCard}>
                            <Image
                                src={urlFor(item.image[0]).url()}
                                alt="cart item"
                                width={100}
                                height={150}
                                placeholder="blur"
                                blurDataURL={urlFor(item.image[0]).url()}
                                className={style.emptyCartImage}
                            />
                            <div className={style.cartItemDetails}>
                                <h3>{item.name}</h3>
                                <Rating rating={item.rating} color={'red'} />
                                <p>Price ( ₹{item.price} / item ) : ₹{item.totalPrice}</p>
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
                    <button className={style.button}>Place Order</button>
                </div>
            </div>
            <div className={style.priceDetail}>
                <h4>PRICE DETAILS</h4>
                <div className={style.priceRow}>
                    <span>Price (2 items)</span>
                    <span>₹73,794</span>
                </div>
                <div className={style.priceRow}>
                    <span>Discount</span>
                    <span>-₹18,305</span>
                </div>
                <div className={style.priceRow}>
                    <span>Delivery Charges</span>
                    <span>Free</span>
                </div>
                <div className={style.totalPrice}>
                    <h4>Total Amount</h4>
                    <h4>₹55,489</h4>
                </div>
            </div>
        </div>
    )
}
