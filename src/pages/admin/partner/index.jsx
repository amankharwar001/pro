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
  const getTabClass = (box) => {
    return activeBox === box
      ? 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black bg-black  text-white '
      : 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black  opacity-55';
  };

  return (
    <div>
      <>
        <div className='flex justify-evenly pb-5 fgdfg '>
          <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
          <span className={getTabClass(2)} onClick={() => handleClick(2)}>SEO</span>
        </div>
        {activeBox === 1 && <div><HeroSectionForm setActiveBox={setActiveBox} url={"partnerpage/herosection"} referencetype={"herosection_partner_page"} /></div>}
        {activeBox === 2 && <div><SeoPage page={"partner-page"}/></div>}
      </>
    </div>
  );
};

export default Index;
