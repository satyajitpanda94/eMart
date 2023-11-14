'use client'

import Image from 'next/image'
import React from 'react'
import { urlFor } from '../../../lib/getImageUrl'
import style from './styles/FooterBanner.module.css'

export default function FooterBanner({ bannerData }) {
    return (
        <div className={style.footerBannerContainer}>
            <Image
                src={urlFor(bannerData[0].image).url()}
                alt="banner"
                width={1280}
                height={450}
                priority={true}
                className={style.footerBannerImage}
            />
        </div>
    )
}
