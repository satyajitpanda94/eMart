'use client'
import React from 'react'
import Product from './Product'
import style from './styles/Products.module.css'

export default function ProductFeed({products}) {
    
  return (
    <div className={style.productsContainer}>
        {
            products.map((product,index)=>(<Product product={product} key={index} />))
        }
    </div>
  )
}
