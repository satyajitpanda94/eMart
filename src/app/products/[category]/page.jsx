'use client'
import ProductFeed from '@/app/components/ProductFeed';
import React, { useEffect, useState } from 'react'
import { client } from '../../../../lib/client';
import HeroBanner from '@/app/components/HeroBanner';

export const getData = async (category) => {
  const productsQuery = `*[_type == "product" && category=='${category}']`
  const products = await client.fetch(productsQuery, { next: { revalidate: 3600 } })

  const heroBannerquery = `*[_type == "banner" && bannerType=='HeroBanner']`
  const heroBannerData = await client.fetch(heroBannerquery)

  return {
    products,
    heroBannerData
  }
}
export default async function page({ params }) {
  const { heroBannerData, products } = await getData(params.category)

  return (
    <>
      <HeroBanner bannerData={heroBannerData} />
      <ProductFeed products={products} />
    </>
  )
}
