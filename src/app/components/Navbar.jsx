'use client'
import React from 'react'
import style from './styles/Navbar.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={style.navbarContainer}>
            <div className={style.navbarLeft}>
                <div className={style.logo}>PandaMart</div>
                <div className={style.category}>
                    <Link href='/'>
                        <span>Home</span>
                    </Link>
                    <span>Men</span>
                    <span>Women</span>
                    <span>Electronics</span>
                </div>
            </div>
            <div className={style.navbarRight}>
                <span>Orders</span>
                <Link href='/cart'>
                    <div className={style.cartLogo}>
                        <span>Cart</span>
                        <AiOutlineShoppingCart size={20} />
                    </div>
                </Link>
                <span>Login/Signup</span>
            </div>
            <div className={style.hamburger}>
                <GiHamburgerMenu size={24} />
            </div>
        </div>
    )
}
