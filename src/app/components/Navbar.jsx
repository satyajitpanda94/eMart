'use client'
import React from 'react'
import style from './styles/Navbar.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Navbar() {
    return (
        <div className={style.navbarContainer}>
            <div className={style.navbarLeft}>
                <div className={style.logo}>PandaMart</div>
                <div className={style.category}>
                    <span>Home</span>
                    <span>Men</span>
                    <span>Women</span>
                    <span>Electronics</span>
                </div>
            </div>
            <div className={style.navbarRight}>
                <span>Orders</span>
                <div className={style.cartLogo}>
                    <span>Cart</span>
                    <AiOutlineShoppingCart size={20} />
                </div>
                <span>Login/Signup</span>
            </div>
            <div className={style.hamburger}>
                <GiHamburgerMenu size={24} />
            </div>
        </div>
    )
}
