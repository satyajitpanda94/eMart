import { client } from "../../lib/client";
import FooterBanner from "./components/FooterBanner";
import HeroBanner from "./components/HeroBanner";
import ProductFeed from "./components/ProductFeed";

export const getData = async () => {
  const heroBannerquery = `*[_type == "banner" && bannerType=='HeroBanner']`
  const heroBannerData = await client.fetch(heroBannerquery)

  const footerBannerquery = `*[_type == "banner" && bannerType=='FooterBanner']`
  const footerBannerData = await client.fetch(footerBannerquery)

  const productsquery = `*[_type == "product"]`
  const productsData = await client.fetch(productsquery)

  return {
    heroBannerData,
    footerBannerData,
    productsData
  }
}

export default async function Home() {
  const { heroBannerData, footerBannerData, productsData } = await getData()

  return (
    <div>
      <HeroBanner bannerData={heroBannerData} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        background:'rgb(245, 245, 245)',
        paddingTop:'10px'
      }}>
        <h1>Our Products</h1>
        <ProductFeed products={productsData} />
      </div>
      <FooterBanner bannerData={footerBannerData} />
    </div>
  )
}
