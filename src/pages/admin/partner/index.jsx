// import  from '@/components/Admin/common/';
// import React, { useState } from 'react'
// import HeroSectionForm from '@/components/Admin/common/HeroSection';
// import SeoPage from '@/components/Admin/seo/SEO';
// const Index = () => {
//   const [activeBox, setActiveBox] = useState(1);
//   const [sectionsStatus, setSectionsStatus] = useState(Array(2).fill(false));

//   const sectionsStatusHandle = (index, status) => {
//     setSectionsStatus((prevStatus) => {
//       const updatedStatus = [...prevStatus];
//       updatedStatus[index] = status;
//       return updatedStatus;
//     });
//   };

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   // Helper function to determine the classes for each tab
//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

//   return (
//     <div>
//       <>
//         <div className='bg-white shadow-lg rounded-lg p-4'>
//           <div className='flex gap-3 pb-5 '>
//             <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
//             <span className={getTabClass(2)} onClick={() => handleClick(2)}>SEO</span>
//           </div>
//           {activeBox === 1 && <div><HeroSectionForm setActiveBox={setActiveBox} url={"partnerpage/herosection"} referencetype={"herosection_partner_page"} /></div>}
//           {activeBox === 2 && <div className=' border bg-gray-50 shadow-inner rounded'><SeoPage page={"partner-page"} /></div>}
//         </div>
//       </>
//     </div>
//   );
// };

// export default Index;






import React, { useState, useEffect } from 'react';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  // ye template ha
  const [sectionsStatus, setSectionsStatus] = useState(Array(2).fill(false));
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
      component: <HeroSectionForm sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} url={"partnerpage/herosection"} referencetype={"herosection_partner_page"} setActiveBox={setActiveBox}/>
    },
    {
      id: 2,
      label: 'SEO',
      component: <SeoPage page={"partner-page"} sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} />
    }
  ];
  // ye template ha
  useEffect(() => {
    // Simulate API trigger for all sections
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, []);
  // ye template ha

  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? "bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white" : ""} 
            ${isActive ? "bg-gradient-to-r from-black to-gray-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"}`;
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg pb-4 ${activeBox === 1 ? "mb-20" : ""}`}>
      {/* // ye template ha */}

      <div>
        {tabs.map((tab, index) => (
          <div key={index} className="hidden">
            {tab.component}
          </div>
        ))
        }
      </div>
      <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
        {tabs.map((tab, index) => {
          const isActive = activeBox === tab.id;
          const isCompleted = sectionsStatus[index];
          return (
            <div
              key={tab.id}
              className={`cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(
                isActive,
                isCompleted
              )}`}
              onClick={() => setActiveBox(tab.id)}
              data-tooltip-id={`tooltip-${tab.id}`}
              data-tooltip-content={tab.label}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

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
