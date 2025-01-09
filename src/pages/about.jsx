import React from 'react'
import HeroSections from '../components/ClientSide/contactPage/HeroSections'
import AboutUs from '../components/ClientSide/AboutPage/AboutUs'
import FeatureGrid from '../components/ClientSide/AboutPage/FeatureGrid'
import VisionMissionSection from '../components/ClientSide/AboutPage/VisionMissionSection'
import CountingSection from '../components/ClientSide/AboutPage/CountingSection'
import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
import SeoTag from '@/components/Admin/common/SeoTag'
import HeadTagSEO from '@/components/HeadTag'

const about = ({ data, error, baseUrl }) => {

  return (
    <div>
        <HeadTagSEO data={data} />
        <HeroSections heroSection={data.heroSection} image={data.heroSection.images[0].filePath} baseUrl={baseUrl}/>
        <AboutUs data={data.section2} baseUrl={baseUrl}/>
        <FeatureGrid data={data.section3} baseUrl={baseUrl}/>
        <VisionMissionSection data={data.section4} baseUrl={baseUrl}/>
        <CountingSection data={data.section5} />
        <FooterSection />
    </div>
  )
}
// Fetch data server-side
export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/about`);
    if (!response.ok) {
      return { props: { error: "Product not found", data: null, baseUrl } };
    }
    const data = await response.json();
    
    return { props: { data:data.data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return { props: { error: err.message, data: null, baseUrl } };
  }
}

export default about