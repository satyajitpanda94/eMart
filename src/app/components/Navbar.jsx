'use client'
import React from 'react'
import style from './styles/Navbar.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const totalCartQuantity = useSelector((state) => state.cart.totalCartQuantity)

    return (
        <div className={style.navbarContainer}>
            <div className={style.navbarTop}>
                <div className={style.navbarTopLeft}>
                    <Link href='/'>
                        <div className={style.logo}>PandaMart</div>
                    </Link>
                </div>
                <div className={style.navbarTopRight}>
                    <Link href='/orders'>
                        <span className={style.navbarTopRightItem}>Orders</span>
                    </Link>
                    <Link href='/cart'>
                        <div className={style.cartLogo}>
                            <span>Cart</span>
                            <AiOutlineShoppingCart size={20} />
                            {
                                totalCartQuantity !== 0 &&
                                <span className={style.cartQuantity}>{totalCartQuantity}</span>
                            }
                        </div>
                    </Link>
                </div>
            </div>
            <div className={style.navbarBattom}>
                <Link href='/'>
                    <span>Home</span>
                </Link>
                <Link href='/products/men'>
                    <span>Men</span>
                </Link>
                <Link href='/products/women'>
                    <span>Women</span>
                </Link>
                <Link href='/products/electronics'>
                    <span>Electronics</span>
                </Link>
            </div>
        </div>
    )
}
