import React, { useState, useEffect } from 'react';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import AboutSectionForm from '@/components/Admin/about/Section2';
import AboutSection3Form from '@/components/Admin/about/Section3';
import AboutSection4Form from '@/components/Admin/about/Section4';
import AboutSection5Form from '@/components/Admin/about/Section5';
import SeoPage from '@/components/Admin/seo/SEO';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  const [sectionsStatus, setSectionsStatus] = useState(Array(6).fill(false));

  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  const tabs = [
    {
      id: 1,
      label: 'Hero Banner Section',
      component: <HeroSectionForm sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} url={"aboutpage/herosection"} referencetype={"aboutpage_herosection"} setActiveBox={setActiveBox}/>
    },
    {
      id: 2,
      label: 'Section2',
      component: <AboutSectionForm sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} setActiveBox={setActiveBox}/>
    },
    {
      id: 3,
      label: 'Section3',
      component: <AboutSection3Form sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} setActiveBox={setActiveBox}/>
    },
    {
      id: 4,
      label: 'Section4',
      component: <AboutSection4Form sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)} setActiveBox={setActiveBox}/>
    },
    {
      id: 5,
      label: 'Section5',
      component: <AboutSection5Form sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)} setActiveBox={setActiveBox}/>
    },
    {
      id: 6,
      label: 'SEO',
      component: <SeoPage page={"about"} sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)} />
    }
  ];

  useEffect(() => {
    // Simulate API trigger for all sections
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, []);

  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? "bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white" : ""} 
            ${isActive ? "bg-gradient-to-r from-black to-gray-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"}`;
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg pb-4 ${activeBox === 5 || activeBox === 6 ? "" : "mb-20"}`}>
      {/* Tab Components */}
      <div>
        {tabs.map((tab, index) => (
          <div key={index} className="hidden">
            {tab.component}
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
        {tabs.map((tab, index) => {
          const isActive = activeBox === tab.id;
          const isCompleted = sectionsStatus[index];
          return (
            <div
              key={tab.id}
              className={`cursor-pointer text-admin_btn_tab px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(
                isActive,
                isCompleted
              )}`}
              onClick={() => setActiveBox(tab.id)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* Active Tab Component */}
      <div className="px-4">
        <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner">
          {/* Render the active tab's component */}
          {tabs.find((tab) => tab.id === activeBox)?.component}
        </div>
      </div>
    </div>
  );
};

export default Index;
