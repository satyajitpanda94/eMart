import React from 'react'
import { client } from '../../../../lib/client';
import ProductFeed from '@/app/components/ProductFeed';

export const getData = async (discount) => {
  let productsQuery='';
  if(discount=='all')
      productsQuery = `*[_type == "product" && discount!=null]`
  else 
      productsQuery= `*[_type == "product" && deal=='${discount}']`
  const products = await client.fetch(productsQuery, { next: { revalidate: 3600 } })

  return {
    products
  }
}

export default async function page({ params }) {
  const { products } = await getData(params.discount)
  return (
    <>
      <ProductFeed products={products} />
    </>
  )
}
