import React from 'react';
import HeroSections from '../components/ClientSide/homePage/HeroSections';
import BrandSection from '../components/ClientSide/homePage/BrandSection';
import Section4 from '../components/ClientSide/homePage/Section4';
import OverviewSection3 from '../components/ClientSide/homePage/OverviewSection3';
import FooterSection from '../components/ClientSide/commonComponent/FooterSection';
import PersonSection2 from '../components/ClientSide/homePage/PersonSection2';
import PersonSection1 from '../components/ClientSide/homePage/PersonSection1';
import Homecard from '../components/ClientSide/card/Homecard';
import FaqSection from '../components/ClientSide/commonComponent/FaqSection';
import SectionSecurity from '../components/ClientSide/homePage/SectionSecurity';
import Testomonial from '../components/ClientSide/homePage/Testomonial';
import About from '../components/ClientSide/homePage/About';
import HeadTagSEO from '@/components/HeadTag';

const Index = ({ data, error }) => {
  
  if (error) {
    return (
      <div className="text-center mt-20 py-">
        <h1 className="text-4xl font-bold text-red-500">Error Loading Page</h1>
        <p className="text-gray-600 mt-4">An error occurred while fetching data.</p>
      </div>
    );
  }

  return (
    <div>
      <HeadTagSEO data={data} />
      {data?.heroSection ? <HeroSections apidata={data.heroSection} /> : null}
      {data?.section2 ? <BrandSection apidata={data.section2} /> : null}
      {data?.section3 || data?.section4 ? (
        <OverviewSection3 apidata1={data?.section3} apidata2={data?.section4} />
      ) : null}
      {data?.section6 ? <Homecard apidata={data.section6} /> : null}
      <div className='mt-20'></div>
      {data?.section5 ? <Section4 apidata={data.section5} /> : null}
      {data?.section7 ? <PersonSection1 apidata={data.section7} /> : null}
      {data?.section8 ? <PersonSection2 apidata={data.section8} /> : null}
      {data?.section9 ? <About apidata={data.section9} /> : null}
      {data?.testimonials ? <Testomonial apidata={data.testimonials} /> : null}
      {data?.section11 ? <SectionSecurity apidata={data.section11} /> : null}
      {data?.faq ? <FaqSection apidata={data.faq} /> : null}
      
    </div>
  );
};

// Fetch data server-side
export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/home`,{
      headers: {
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const result = await response.json();
    return { props: { data: result.data, error: null } };
  } catch (err) {
    console.error("Failed to fetch home data:", err);
    return { props: { data: null, error: err.message } };
  }
}

export default Index;
