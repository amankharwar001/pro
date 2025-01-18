// import Layout from '@/components/Admin/common/Layout';
// import React, { useState } from 'react'
// import HeroSectionForm from '@/components/Admin/common/HeroSection';
// import SeoPage from '@/components/Admin/seo/SEO';
// import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';
// const Index = () => {
//   const [activeBox, setActiveBox] = useState(2);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   // Helper function to determine the classes for each tab
//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//      ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;


//   return (
//     <div>
//       <>
//       <div className='bg-white shadow-lg rounded-lg p-4'>
//           <div className='flex gap-3 pb-5 '>
//             <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
//             <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
//             <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
//           </div>
//           {activeBox === 1 && <div><HeroSectionForm url={"refund-policy-page/herosection"} referencetype={"herosection_refund_policy_page"} /></div>}
//           {activeBox === 2 && <div><ClientSideCommonEditor referenceType={"refund_policy"}  /></div>}
//           {activeBox === 3 && <div className=' border bg-gray-50 shadow-inner rounded'><SeoPage page={"refund-policy"}/></div>}
          
//       </div>
//       </>
//     </div>
//   );
// };

// export default Index;





import React, { useState, useEffect } from 'react';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';

const Index = () => {
  const [activeBox, setActiveBox] = useState(2);
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

  useEffect(() => {
    // Simulate API trigger for all tabs
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, []);

  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? 'bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white' : ''} 
            ${isActive ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}
            cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border`;
  };

  const tabs = [
    {
      label: 'Hero Banner Section',
      component: <HeroSectionForm url="refund-policy-page/herosection" referencetype="herosection_refund_policy_page"  sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}/>,
    },
    {
      label: 'Section2',
      component: <ClientSideCommonEditor referenceType="refund_policy"  sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}/>,
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
