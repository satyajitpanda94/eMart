import { client } from "../../lib/client";
import HeroBanner from "./components/HeroBanner";
import Navbar from "./components/Navbar";


export const getData = async () => {
  const bannerquery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerquery)

  return {
    bannerData
  }
}

export default async function Home() {
  const { bannerData } = await getData()

  return (
    <div>
      <Navbar />
      <HeroBanner bannerData={bannerData} />
    </div>
  )
}
