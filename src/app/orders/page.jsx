'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import style from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../../lib/getImageUrl'
import Rating from '../components/Rating'

export default function page() {
    const ordersList = useSelector((state) => state.order.ordersList)
    const getDiscountedPrice = (price, discount, quantity) => {
        discount = discount.split('%')[0]
        return (price - (price * discount) / 100) * quantity
    }
    return (
        <div className={style.orderContainer}>
            <div className={style.orderDetailsContainer}>
                <h3 className={style.heading}>Your Orders</h3>
                {
                    ordersList.length === 0
                        ? (<div className={style.emptyOrdersList}>
                            <span>No Item placed till now.</span>
                            <Link href='/'>
                                <button type="button" className={style.button}>Continue Shopping</button>
                            </Link>
                        </div>)
                        : ordersList.map((item, index) => (
                            <div key={index} className={style.orderDetails}>
                                <div className={style.imageContainer}>
                                    <Image
                                        src={urlFor(item.image[0]).url()}
                                        alt="product"
                                        width={100}
                                        height={150}
                                        placeholder="blur"
                                        blurDataURL={urlFor(item.image[0]).url()}
                                        className={style.orderImage}
                                    />
                                </div>
                                <div className={style.cartItemDetails}>
                                    <Link href={`/product/${item.slug.current}`}>
                                        <h3 className={style.productName}>{item.name}</h3>
                                    </Link>
                                    <Rating rating={item.rating} color={'red'} />
                                    <span>Quantity : {item.quantity}</span>
                                    <p>
                                        Price ( ₹{item.price} / item ) :&nbsp;
                                        <span>
                                            {
                                                item.discount
                                                    ? (<>
                                                        <span className={style.productPrice}>
                                                            ₹{getDiscountedPrice(item.price, item.discount, item.quantity).toFixed(2)} &nbsp;
                                                        </span>
                                                        <span>{item.discount} Off</span>
                                                    </>
                                                    )
                                                    : <span className={style.productPrice}>₹{item.price.toFixed(2)}</span>
                                            }
                                        </span>
                                    </p>
                                    <span>Order Placed On : {item.orderOn}</span>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
