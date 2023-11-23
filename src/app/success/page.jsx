import Link from 'next/link'
import React from 'react'
import style from './page.module.css'

export default function page() {
    return (
        <div className={style.successPageContainer}>
            <div className={style.orderSuccessMessage}>
                <span className={style.successMessage}>Order Placed Successfully.</span>
                <span className={style.thanksMessage}>Thanks for shopping with us ! Please visit our site again to shop online.</span>
            </div>
            <Link href='/'>
                <button type="button" className={style.button}>Continue Shopping</button>
            </Link>
        </div>
    )
}
