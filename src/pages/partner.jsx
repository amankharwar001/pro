import HeroSections from '../components/ClientSide/contactPage/HeroSections'
import Header from '../components/ClientSide/commonComponent/Header'
import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
import ContactInfo from '../components/ClientSide/contactPage/ContactInfo'
import React from 'react'
import Form1 from '../components/ClientSide/forms/Form1'
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import HeadTagSEO from '@/components/HeadTag'


const PartnerPage = ({ data, error, baseUrl }) => {
  return (
    <div>
      <HeadTagSEO data={data} />
        <HeroSections heroSection={data?.heroSection?.heroSectionPartner[0]} image={data?.heroSection?.Images[0]?.filePath} baseUrl={baseUrl}/>        
        <Form1/>
        <ContactInfo data={data?.getInTouchData} baseUrl={baseUrl} />
        <div className='mt-40'></div>
    </div>
  )
}
export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/partner/partner`,{
      headers: {
        'api-key': process.env.API_KEY, // Send the API key in the request header
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
export default PartnerPage;



