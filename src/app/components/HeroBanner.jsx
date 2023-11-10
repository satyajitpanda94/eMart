'use client'

import React from 'react'
import { urlFor } from '../../../lib/getImageUrl'
import Image from 'next/image'
import style from './styles/HeroBanner.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

export default function HeroBanner({ bannerData }) {
    return (
        <div
            className={style.heroBannerContainer}
        >
            <Carousel
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false}
            >
                {
                    bannerData && bannerData.map(banner => (
                        <div
                            key={banner._id}
                        >
                            <Image
                                src={urlFor(banner.image).url()}
                                alt="banner"
                                width={1280}
                                height={450}
                                className={style.heroBannerImage}
                            />
                        </div>
                    ))
                }
            </Carousel >
        </div >
    )
}
