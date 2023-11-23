'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './page.module.css'
import { urlFor } from '../../../lib/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import Rating from '../components/Rating'
import { useRouter } from 'next/navigation'
import { removeFromCart } from '../../../lib/CartReducer'

export default function PlaceOrder() {
    const products = useSelector((state) => state.order.products)
    const [address, setAddress] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const getDiscountedPrice = (price, discount, quantity) => {
        discount = discount.split('%')[0]
        return (price - (price * discount) / 100) * quantity
    }

    const totalPrice = (products) => {
        return products.reduce((accumulatedPrice, item) => {
            if (item.discount) {
                const discount = item.discount.split('%')[0]
                const discountPrice = (item.price * item.quantity * discount) / 100
                return accumulatedPrice + item.price * item.quantity - discountPrice
            }
            return accumulatedPrice + item.price * item.quantity
        }, 0).toFixed(2)
    }

    const deliveryCharges = (products) => {
        return products.reduce((totalDeliveryCharges, item) => {
            if (item.deliveryCharges) {
                return totalDeliveryCharges + item.deliveryCharges
            }
            return totalDeliveryCharges
        }, 0).toFixed(2)
    }

    const totalPayable = (produts) => {
        return (parseFloat(totalPrice(products)) + parseFloat(deliveryCharges(products))).toFixed(2)
    }

    const handleSubmitAddress = (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const phone = e.target[1].value
        const address = e.target[2].value
        setAddress(`Name: ${name}\nPhone: ${phone}\nAddress: ${address}`)
    }

    const handleSubmitToPay = (e) => {
        e.preventDefault()
        products.forEach(product => {
            dispatch(removeFromCart(product))
        })
        router.push('/success')
    }

    return (
        <div className={style.orderContainer}>
            <div className={style.orderDetailsContainer}>
                <h3 className={style.heading}>ORDER SUMMARY</h3>
                {
                    products.map((item, index) => (
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
                                <span>Delivery by 7 days</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                products.length > 0 &&
                <div className={style.priceDetails}>
                    <h3 className={style.heading}>PRICE DETAILS</h3>
                    <div className={style.priceRow}>
                        <span>Price : </span>
                        <span>{totalPrice(products)}</span>
                    </div>
                    <div className={style.priceRow}>
                        <span>Delivery Charges : </span>
                        <span>{deliveryCharges(products)}</span>
                    </div>
                    <div className={style.totalPayable}>
                        <span>Total Payable : </span>
                        <span>{totalPayable(products)}</span>
                    </div>
                </div>
            }
            <div className={style.addressDetails}>
                <h3 className={style.heading}>ADDRESS DETAILS</h3>
                {
                    address.length === 0 ?
                        (<form className={style.addressInput} onSubmit={handleSubmitAddress}>
                            <input type="text" placeholder='Name' required />
                            <input
                                type="tel"
                                placeholder='10 Digit Phone Number'
                                required maxLength='10'
                                pattern="\d*"
                                onInvalid={(e) => e.target.setCustomValidity('Please Enter Number')}
                                onInput={e => e.target.setCustomValidity('')}
                            />
                            <textarea placeholder='Address' required></textarea>
                            <button type='submit' className={style.button}>SAVE AND DELIVER HERE</button>
                        </form>) :
                        (<pre className={style.addressText}>{address}</pre>)
                }
            </div>
            {
                address &&
                <div className={style.payAndDeliver}>
                    <h3 className={style.heading}>PAY AND DELIVER</h3>
                    <form className={style.addressInput} onSubmit={handleSubmitToPay}>
                        <div className={style.deliveryType}>
                            <input type="radio" id='deliveryType' value='Cash On Delivery' checked readOnly />
                            <label htmlFor='deliveryType'>Cash On Delivery</label>
                        </div>
                        <button type='submit' className={style.button}>PLACE ORDER</button>
                    </form>
                </div>
            }
        </div>
    )
}
