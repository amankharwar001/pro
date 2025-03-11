

import React from 'react';
import HeroSections from '../components/ClientSide/contactPage/HeroSections';
import FooterSection from '../components/ClientSide/commonComponent/FooterSection';
import FormSection from '../components/ClientSide/contactPage/FormSection';
import ContactInfo from '../components/ClientSide/contactPage/ContactInfo';

import HeadTagSEO from '@/components/HeadTag';

const Contact = ({ data = {}, baseUrl }) => {
  const heroSection = data?.heroSection?.heroSectionContact?.[0] || {};
  const heroImage = data?.heroSection?.Images?.[0]?.filePath || '';

  return (
    <div>
      <HeadTagSEO data={data || {}} />
      <HeroSections
        heroSection={heroSection}
        image={heroImage}
        baseUrl={baseUrl}
      />
      <FormSection />
      <ContactInfo data={data?.getInTouchData || []} baseUrl={baseUrl} />
      
    </div>
  );
};

// Fetch data server-side
export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/contact`,{
      headers: {
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
      },
    });
    const data = response.ok ? await response.json() : null;

    return { props: { data, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch contact:", err);
    return { props: { data: null, baseUrl } };
  }
}

export default Contact;
