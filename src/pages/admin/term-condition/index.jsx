// import  from '@/components/Admin/common/';
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
//         <div className='flex gap-3 pb-5 '>
//           <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
//           <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
//           <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
//         </div>
//         {activeBox === 1 && <div><HeroSectionForm url={"term-condition-page/herosection"} referencetype={"herosection_term_condition_page"} /></div>}
//         {activeBox === 2 && <div><ClientSideCommonEditor referenceType={"term_condition_policy"}  /></div>}
//         {activeBox === 3 && <div className=' border bg-gray-50 shadow-inner rounded'><SeoPage page={"term-condition"}/></div>}
//       </div>
//       </>
//     </div>
//   );
// };

// export default Index;




import React, { useState } from 'react';
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
      component: (
        <HeroSectionForm
          url="term-condition-page/herosection"
          referencetype="herosection_term_condition_page"
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}
        />
      ),
    },
    {
      label: 'Content Section',
      component: (
        <ClientSideCommonEditor
          referenceType="term_condition_policy"
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}
        />
      ),
    },
    {
      label: 'SEO Settings',
      component: (
        <SeoPage
          page="term-condition"
          sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Tabs */}
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

        {/* Tab Content */}
        <div>
          {tabs.map((tab, index) => (
            <div key={index} className={activeBox === index + 1 ? '' : 'hidden'}>
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
