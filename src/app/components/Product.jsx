'use client'

import React from 'react'
import style from './styles/Products.module.css'
import Image from 'next/image'
import { urlFor } from '../../../lib/getImageUrl'
import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi'
import Rating from './Rating'
import Link from 'next/link'

export default function Product({ product }) {
    // console.log(product)
    return (<>
        <Link href={`/product/${product.slug.current}`}>
            <div className={style.productContainer}>
                <div className={style.imageContainer}>
                    <Image
                        src={urlFor(product.image[0]).url()}
                        alt="banner"
                        width={230}
                        height={280}
                        className={style.productImage}
                    />
                </div>
                <div className={style.productDetails}>
                    <h4>{product.name}</h4>
                    <div className={style.productDetailsBottom}>
                        <span>₹{product.price}</span>
                        <Rating rating={product.rating} />
                    </div>
                </div>
            </div>
        </Link>
    </>
    )
}
