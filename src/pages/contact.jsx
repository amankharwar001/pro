import React from 'react'
import HeroSections from '../components/ClientSide/contactPage/HeroSections'
import Header from '../components/ClientSide/commonComponent/Header'
import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
import FormSection from '../components/ClientSide/contactPage/FormSection'
import ContactInfo from '../components/ClientSide/contactPage/ContactInfo'
import Form1 from '@/components/ClientSide/forms/Form1'
import HeadTagSEO from '@/components/HeadTag'

const contact = ({ data, error, baseUrl }) => {

  return (
    <div>
      <HeadTagSEO data={data} />
        <HeroSections heroSection={data.heroSection.heroSectionContact[0]} image={data.heroSection.Images[0].filePath} baseUrl={baseUrl}/>
        <FormSection/>
        <ContactInfo data={data.getInTouchData} baseUrl={baseUrl} />
        
        <FooterSection />
    </div>
  )
}
// Fetch data server-side
export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/contact`);
    if (!response.ok) {
      return { props: { error: "contact not found", data: null, baseUrl } };
    }
    const data = await response.json();
    
    return { props: { data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch contact:", err);
    return { props: { error: err.message, data: null, baseUrl } };
  }
}

export default contact