'use client'

import React from 'react'
import style from './styles/Products.module.css'
import Image from 'next/image'
import { urlFor } from '../../../lib/getImageUrl'
import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi'
import Rating from './Rating'

export default function Product({ product }) {
    // console.log(product)
    return (
        <div className={style.productContainer}>
            <div className={style.imageContainer}>
                <Image
                    src={urlFor(product.image[0]).url()}
                    alt="banner"
                    width={250}
                    height={300}
                    className={style.productImage}
                />
            </div>
            <div className={style.productDetails}>
                <h4>{product.name}</h4>
                <div className={style.productDetailsBottom}>
                    <span>₹{product.price}</span>
                    <Rating rating={product.rating}/>
                </div>
            </div>
        </div>
    )
}
