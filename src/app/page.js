import { client } from "../../lib/client";
import FooterBanner from "./components/FooterBanner";
import HeroBanner from "./components/HeroBanner";
import Navbar from "./components/Navbar";


export const getData = async () => {
  const heroBannerquery = `*[_type == "banner" && bannerType=='HeroBanner']`
  const heroBannerData = await client.fetch(heroBannerquery)

  const footerBannerquery = `*[_type == "banner" && bannerType=='FooterBanner']`
  const footerBannerData = await client.fetch(footerBannerquery)

  return {
    heroBannerData,
    footerBannerData
  }
}

export default async function Home() {
  const { heroBannerData, footerBannerData } = await getData()

  return (
    <div>
      <Navbar />
      <HeroBanner bannerData={heroBannerData} />
      <FooterBanner bannerData={footerBannerData} />
    </div>
  )
}
