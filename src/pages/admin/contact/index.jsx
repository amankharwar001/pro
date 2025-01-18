// import React, { useState } from 'react';
// import Layout from '@/components/Admin/common/Layout';
// import ContactFormList from '@/components/Admin/contact/ContactFormList';
// import HeroSectionForm from '@/components/Admin/common/HeroSection';
// import GetInTouchForm from '@/components/Admin/getintouch/Index';
// import SeoPage from '@/components/Admin/seo/SEO';

// const Index = () => {
//   const [activeBox, setActiveBox] = useState(1);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   // Tab definitions
//   const tabs = [
//     { id: 1, label: 'Hero Banner Section', component: <HeroSectionForm setActiveBox={setActiveBox} url={"contactpage/herosection"} referencetype={"herosection_contact_page"} /> },
//     { id: 2, label: 'Get In Touch', component: <GetInTouchForm setActiveBox={setActiveBox}/> },
//     { id: 3, label: 'SEO', component: <SeoPage page={"contact"} /> },
//   ];

//   // Determine dynamic tab class
//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//      ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

//   return (
//     <>
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         {/* Tabs Navigation */}
//         <div className="sticky top-16 z-10 flex gap-2 overflow-x-auto">
//           {tabs.map((tab) => (
//             <div
//               key={tab.id}
//               className={getTabClass(tab.id)}
//               onClick={() => handleClick(tab.id)}
//               data-tooltip-id={`tooltip-${tab.id}`}
//               data-tooltip-content={tab.label}
//             >
//               {tab.label}
//             </div>
//           ))}
//         </div>

        

//         {/* Render Active Component */}
//         <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner">
//           {tabs.find((tab) => tab.id === activeBox)?.component}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;






import React, { useEffect, useState } from 'react';
import Layout from '@/components/Admin/common/Layout';
import ContactFormList from '@/components/Admin/contact/ContactFormList';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import GetInTouchForm from '@/components/Admin/getintouch/Index';
import SeoPage from '@/components/Admin/seo/SEO';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  
  // ye template ha
  const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false)); // 3 sections, default 'false' meaning incomplete
  
  // ye template ha
  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  const handleClick = (box) => {
    setActiveBox(box);
  };

  // Tab definitions
  const tabs = [
    {
      id: 1,
      label: 'Hero Banner Section',
      component: (
        <HeroSectionForm
          setActiveBox={setActiveBox}
          url={"contactpage/herosection"}
          referencetype={"herosection_contact_page"}
          sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} // Updated index
        />
      )
    },
    {
      id: 2,
      label: 'Get In Touch',
      component: (
        <GetInTouchForm
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} // Updated index
        />
      )
    },
    {
      id: 3,
      label: 'SEO',
      component: (
        <SeoPage
          page={"contact"}
          sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} // Updated index
        />
      )
    }
  ];

  useEffect(() => {
    // Simulate API trigger for all sections
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, []);

  // Determine dynamic tab class
  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? "bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white" : ""} 
            ${isActive ? "bg-gradient-to-r from-black to-gray-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"}`;
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div>
          {tabs.map((tab, index) => (
            <div key={index} className="hidden">
              {tab.component}
            </div>
          ))}
        </div>
        
        {/* Tabs Navigation */}
        <div className="sticky top-16 z-10 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeBox === tab.id;
            const isCompleted = sectionsStatus[tab.id - 1]; // Access correct index based on tab.id

            return (
              <div
                key={tab.id}
                className={`cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(isActive, isCompleted)}`}
                onClick={() => handleClick(tab.id)}
                data-tooltip-id={`tooltip-${tab.id}`}
                data-tooltip-content={tab.label}
              >
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* Render Active Component */}
        <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner">
          {tabs.find((tab) => tab.id === activeBox)?.component}
        </div>
      </div>
    </>
  );
};

export default Index;
