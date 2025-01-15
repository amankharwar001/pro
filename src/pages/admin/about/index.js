
import Layout from '@/components/Admin/common/Layout';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import AboutSectionForm from '@/components/Admin/about/Section2';
import AboutSection3Form from '@/components/Admin/about/Section3';
import AboutSection4Form from '@/components/Admin/about/Section4';
import AboutSection5Form from '@/components/Admin/about/Section5';
import SeoPage from '@/components/Admin/seo/SEO';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';

const Index = () => {
  const [activeBox, setActiveBox] = useState(2);

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
        <div className='bg-white rounded-lg md:p-4'>
          <div className=' sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto  '>
            {/** Tab Navigation */}
            <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
            <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
            <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
            <span className={getTabClass(4)} onClick={() => handleClick(4)}>Section4</span>
            <span className={getTabClass(5)} onClick={() => handleClick(5)}>Section5</span>
            <span className={getTabClass(6)} onClick={() => handleClick(6)}>SEO</span>
          </div>

          {/** Tooltips */}
          {['Hero Banner Section', 'Section2', 'Section3', 'Section4', 'Section5', 'SEO'].map((label, index) => (
            <Tooltip
              key={index}
              id={`tooltip-${index + 1}`}
              place="top"
              effect="solid"
              content={label}
            />
          ))}

          {/** Render Active Component */}
          <div className="mt-5 ">
            {activeBox === 1 && <div><HeroSectionForm setActiveBox={setActiveBox} url={"aboutpage/herosection"} referencetype={"aboutpage_herosection"} /></div> }
            {activeBox === 2 && <div className='p-4  border bg-gray-50 shadow-inner rounded'> <AboutSectionForm setActiveBox={setActiveBox}/></div>}
            {activeBox === 3 && <div className='p-4  border bg-gray-50 shadow-inner rounded'><AboutSection3Form setActiveBox={setActiveBox}/></div> }
            {activeBox === 4 && <div className='p-4  border bg-gray-50 shadow-inner rounded'> <AboutSection4Form setActiveBox={setActiveBox}/></div>}
            {activeBox === 5 && <div className='p-4  border bg-gray-50 shadow-inner rounded'> <AboutSection5Form setActiveBox={setActiveBox}/></div>}
            {activeBox === 6 && <div className=' border bg-gray-50 shadow-inner rounded'> <SeoPage page={"about"} /></div>}
          </div>
        </div>

      </>
    </div>
  );
};

export default Index;
