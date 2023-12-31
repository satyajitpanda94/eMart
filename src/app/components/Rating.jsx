'use client'
import React from 'react'
import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi'
import style from './styles/Products.module.css'

export default function Rating({ rating, color }) {
    return (
        <div className={style.rating}>
            {
                Array(5).fill(1).map((value, index) => {
                    if (rating - 1 >= index)
                        return <BiSolidStar key={index} color={color} />
                    if (rating - 1 < index && rating - 1 > index - 1)
                        return <BiSolidStarHalf key={index} color={color} />
                    return <BiStar key={index} color={color} />
                })
            }
            {
                rating
            }
        </div>
    )
}
