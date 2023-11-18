import React from 'react'
import style from './styles/Cart.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
    return (
        <div className={style.emptyCart}>
            <Image
                src='/empty-cart.png'
                alt="empty cart"
                width={260}
                height={220}
                priority={true}
                className={style.emptyCartImage}
            />
            <h3>Missing Cart items?</h3>
            <Link href='/'>
                <button type="button" className={style.button}>Continue Shopping</button>
            </Link>
        </div>
    )
}
