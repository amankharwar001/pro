import HeroSections from '../components/ClientSide/contactPage/HeroSections'
import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
import React from 'react'
import HeadTagSEO from '@/components/HeadTag'
const PrivacyPolicy = ({ data, error, baseUrl }) => {
  console.log("data show is here privaxcy poilic",data)

  return (
    <div>
      <HeadTagSEO data={data} />
      <HeroSections heroSection={data?.heroSection} image={data?.heroSection?.images[0]?.filePath} alttext={data?.heroSection?.images[0]?.filePath} baseUrl={baseUrl} />
      <div
        className="mt-8 blog-content-editor prose container "
        dangerouslySetInnerHTML={{ __html: data?.content || "no content available" }}
      />
      {/* <ContactInfo /> */}
      <div className='mt-40'></div>
      
    </div>
  )
}
export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/privacy-policy`,{
      headers: {
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
       },
    });
    if (!response.ok) {
      return { props: { error: "Product not found", data: null, baseUrl } };
    }
    const data = await response.json();

    return { props: { data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return { props: { error: err.message, data: null, baseUrl } };
  }
}

export default PrivacyPolicy;