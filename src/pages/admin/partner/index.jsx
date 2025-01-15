import Layout from '@/components/Admin/common/Layout';
import React, { useState } from 'react'
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
const Index = () => {
  const [activeBox, setActiveBox] = useState(1);

  const handleClick = (box) => {
    setActiveBox(box);
  };

  // Helper function to determine the classes for each tab
  const getTabClass = (id) =>
    `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
    ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

  return (
    <div>
      <>
      <div className='bg-white shadow-lg rounded-lg p-4'>
          <div className='flex gap-3 pb-5 '>
            <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
            <span className={getTabClass(2)} onClick={() => handleClick(2)}>SEO</span>
          </div>
          {activeBox === 1 && <div><HeroSectionForm setActiveBox={setActiveBox} url={"partnerpage/herosection"} referencetype={"herosection_partner_page"} /></div>}
          {activeBox === 2 && <div className=' border bg-gray-50 shadow-inner rounded'><SeoPage page={"partner-page"}/></div>}
      </div>
      </>
    </div>
  );
};

export default Index;
