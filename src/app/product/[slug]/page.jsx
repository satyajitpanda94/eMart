'use client'
import React, { useEffect, useState } from 'react'
import { client } from '../../../../lib/client';
import { urlFor } from '../../../../lib/getImageUrl';
import Image from 'next/image';
import style from './page.module.css'
import Rating from '@/app/components/Rating';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
    incrementQuantity,
    decrementQuantity,
    addToCart
} from '../../../../lib/CartReducer'
import ProductFeed from '@/app/components/ProductFeed';
import { useRouter } from 'next/navigation';
import { addToOrderList } from '../../../../lib/PlaceOrderReducer';

export default function ProductDetails({ params }) {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [index, setIndex] = useState(0)
    const dispatch = useDispatch()
    const quantity = useSelector((state) => state.cart.quantity)
    const router = useRouter()

    const addProductToCart = (product) => {
        dispatch(addToCart(product))
    }

    const placeOrder = (product) => {
        dispatch(addToOrderList([{ ...product, quantity }]))
        dispatch(addToCart(product))
        router.push('/placeorder')
    }

    useEffect(() => {
        const getData = async (slug) => {
            const productQuery = `*[_type == "product" && slug.current=='${slug}'][0]`
            const productData = await client.fetch(productQuery, { next: { revalidate: 3600 } })

            setProductDetails(productData)

            const relatedProductsQuery = `*[_type == "product" && _id!='${productData._id}' && subcategory=='${productData.subcategory}'][0..4]`
            const relatedProducts = await client.fetch(relatedProductsQuery, { next: { revalidate: 3600 } })
            setRelatedProducts(relatedProducts)
        }
        getData(params.slug)
    }, [params.slug])

    return (
        <div>
            <div className={style.productDetailsContainer}>
                {
                    productDetails != null && (
                        <>
                            <div>
                                <div className={style.imageContainer}>
                                    <Image
                                        src={urlFor(productDetails?.image[index]).url()}
                                        alt=""
                                        width={400}
                                        height={450}
                                        placeholder="blur"
                                        blurDataURL={urlFor(productDetails?.image[index]).url()}
                                        className={style.productDetailsImage}
                                    />
                                </div>
                                <div className={style.smallImagesContainer}>
                                    {
                                        productDetails && productDetails?.image?.map((item, i) => (
                                            <Image
                                                src={urlFor(item).url()}
                                                width={250}
                                                height={300}
                                                className={
                                                    i === index ?
                                                        `${style.smallImage} ${style.selectedImage}` :
                                                        `${style.smallImage}`
                                                }
                                                alt="image"
                                                onMouseEnter={() => setIndex(i)}
                                                key={i}
                                            />
                                        ))
                                    }
                                </div>

                            </div>
                            <div className={style.productDetailsDesc}>
                                <h1 className={style.productName}>{productDetails?.name}</h1>
                                <h2>₹{productDetails?.price}</h2>
                                {
                                    productDetails.discount &&
                                    <h4>{productDetails.discount} Off</h4>
                                }
                                <span>
                                    Delivery Charge : {
                                        productDetails.deliveryCharges ?
                                            `₹${productDetails.deliveryCharges}` :
                                            'Free'
                                    }
                                </span>
                                <Rating rating={productDetails.rating} color={'red'} />
                                <h4>Details: </h4>
                                <p className={style.productDesc}>{productDetails?.details}</p>
                                <div className={style.quantityDetails}>
                                    <h3>Quantity: </h3>
                                    <div className={style.quantity}>
                                        <span
                                            className={style.minus}
                                            onClick={() => dispatch(decrementQuantity())}
                                        >
                                            <AiOutlineMinus />
                                        </span>
                                        <span className={style.num}>
                                            {quantity}
                                        </span>
                                        <span
                                            className={style.plus}
                                            onClick={() => dispatch(incrementQuantity())}
                                        >
                                            <AiOutlinePlus />
                                        </span>
                                    </div>
                                </div>
                                <div className={style.button}>
                                    <button type="button" className={style.addToCart} onClick={() => addProductToCart(productDetails)}>Add to Cart</button>
                                    <button type="button" className={style.buyNow} onClick={() => placeOrder(productDetails)}>Buy Now</button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <div className={style.relatedProducts}>
                <h1>You might be interested in</h1>
                <ProductFeed products={relatedProducts} />
            </div>
        </div>
    )
}
