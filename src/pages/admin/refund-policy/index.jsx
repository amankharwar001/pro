import React, { useState, useEffect } from 'react';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false)); // Initialize for 3 sections

  const handleClick = (box) => {
    setActiveBox(box);
  };

  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  

  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? 'bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white' : ''} 
            ${isActive ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}
            cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border`;
  };

  const tabs = [
    {
      label: 'Hero Banner Section',
      component: <HeroSectionForm setActiveBox={setActiveBox}  url="refund-policy-page/herosection" referencetype="herosection_refund_policy_page"  sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}/>,
    },
    {
      label: 'Section2',
      component: <ClientSideCommonEditor sectionsStatus={sectionsStatus} setActiveBox={setActiveBox} referenceType="refund_policy"  sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}/>,
    },
    {
      label: 'Section3',
      component: <SeoPage page="refund-policy"  sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)}/>,
    },
  ];

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-4">
      <div>
        {tabs.map((tab, index) => (
          <div key={index} className="hidden">
            {tab.component}
          </div>
        ))
        }
      </div>
        <div className="flex gap-3 pb-5">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={getTabClass(activeBox === index + 1, sectionsStatus[index])}
              onClick={() => handleClick(index + 1)}
            >
              {tab.label}
            </span>
          ))}
        </div>
        <div>
          {tabs.map((tab, index) => (
            <div key={index} className={activeBox === index + 1 ? '' : 'hidden'}>
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
