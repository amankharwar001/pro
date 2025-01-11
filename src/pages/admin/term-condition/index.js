import Layout from '@/components/Admin/common/Layout';
import React, { useState } from 'react'
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';
const Index = () => {
  const [activeBox, setActiveBox] = useState(2);

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
        <div className='flex justify-evenly pb-5 '>
          <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
          <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
          <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
        </div>
        {activeBox === 1 && <div><HeroSectionForm url={"term-condition-page/herosection"} referencetype={"herosection_term_condition_page"} /></div>}
        {activeBox === 2 && <div><ClientSideCommonEditor referenceType={"term_condition_policy"}  /></div>}
        {activeBox === 3 && <div><SeoPage page={"term-condition"}/></div>}
      </>
    </div>
  );
};

export default Index;
