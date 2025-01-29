// import React, { useState } from 'react';
// import Layout from '../../../components/Admin/common/Layout';
// import Test from '@/components/Admin/test';
// import Section2 from '@/components/Admin/Section2';
// import Section3Form from '@/components/Admin/Section3';
// import Section4Page from '@/components/Admin/Section4';
// import Section5Form from '@/components/Admin/Section5';
// import Section6Component from '@/components/Admin/Section6';
// import Section8Page from '@/components/Admin/Section8';
// import Section7AdminPanel from '@/components/Admin/Section7';
// import TestimonialManager from '@/components/Admin/Testimonail';
// import Section11AdminPanel from '@/components/Admin/Section11';
// import FAQManager from '@/components/Admin/HomeFaq';
// import Section9Manager from '@/components/Admin/Section9';
// import SeoPage from '@/components/Admin/seo/SEO';

// const Index = () => {
//   const [activeBox, setActiveBox] = useState(1);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   const tabs = [
//     { id: 1, label: 'Hero Section', component: <Test setActiveBox={setActiveBox}/> },
//     { id: 2, label: 'Section2', component: <Section2 setActiveBox={setActiveBox}/> },
//     { id: 3, label: 'Section3', component: <Section3Form setActiveBox={setActiveBox}/> },
//     { id: 4, label: 'Section4', component: <Section4Page setActiveBox={setActiveBox}/> },
//     { id: 5, label: 'Section5', component: <Section5Form setActiveBox={setActiveBox}/> },
//     { id: 6, label: 'Card Product', component: <Section6Component setActiveBox={setActiveBox}/> },
//     { id: 7, label: 'Section7', component: <Section7AdminPanel setActiveBox={setActiveBox}/> },
//     { id: 8, label: 'Section8', component: <Section8Page setActiveBox={setActiveBox}/> },
//     { id: 9, label: 'Section9', component: <Section9Manager setActiveBox={setActiveBox}/> },
//     { id: 10, label: 'Testimonial', component: <TestimonialManager setActiveBox={setActiveBox}/> },
//     { id: 11, label: 'Section11', component: <Section11AdminPanel setActiveBox={setActiveBox}/> },
//     { id: 12, label: 'FAQ', component: <FAQManager setActiveBox={setActiveBox}/> },
//     { id: 13, label: 'SEO', component: <SeoPage page={"home"} /> },
//   ];

//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

//   return (
//     <>
//       <div className="bg-white shadow-lg rounded-lg  pb-4">
//         <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
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

//         {/* Tooltips */}
//         {/* {tabs.map((tab) => (
//           <Tooltip key={tab.id} id={`tooltip-${tab.id}`} place="top" effect="solid" />
//         ))} */}
//         <div className='px-4'>
//           <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner ">
//             {/* Render the selected component */}
//             {tabs.find((tab) => tab.id === activeBox)?.component}
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Index;



// import React, { useState, useEffect } from 'react';
// import Layout from '../../../components/Admin/common/Layout';
// import Test from '@/components/Admin/test';
// import Section2 from '@/components/Admin/Section2';
// import Section3Form from '@/components/Admin/Section3';
// import Section4Page from '@/components/Admin/Section4';
// import Section5Form from '@/components/Admin/Section5';
// import Section6Component from '@/components/Admin/Section6';
// import Section8Page from '@/components/Admin/Section8';
// import Section7AdminPanel from '@/components/Admin/Section7';
// import TestimonialManager from '@/components/Admin/Testimonail';
// import Section11AdminPanel from '@/components/Admin/Section11';
// import FAQManager from '@/components/Admin/HomeFaq';
// import SeoPage from '@/components/Admin/seo/SEO';

// const Index = () => {
//   const [activeBox, setActiveBox] = useState(1);
//   const [sectionsStatus, setSectionsStatus] = useState(Array(13).fill(false)); 
//   console.log("section status",sectionsStatus)


//   const sectionsStatusHandle = (index, status) => {
//     setSectionsStatus((prevStatus) => {
//       const updatedStatus = [...prevStatus];
//       updatedStatus[index] = status; 
//       return updatedStatus;
//     });
//   };

//   // Function to trigger API call for each section
//   const triggerApiForSections = () => {
//     // Loop through all sections and trigger the API for each
//     tabs.forEach((tab, index) => {

//       // console.log(`API call for tab: ${tab.label}`);
//       // Update status to true after API call
//       sectionsStatusHandle(index, true);
//     });
//   };

//   useEffect(() => {
//     triggerApiForSections();
//   }, []);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   const tabs = [
//     { id: 1, label: 'Hero Section', component: <Test setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} /> },
//     { id: 2, label: 'Section2', component: <Section2 setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} /> },
//     { id: 3, label: 'Section3', component: <Section3Form setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} /> },
//     { id: 4, label: 'Section4', component: <Section4Page setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)} /> },
//     { id: 5, label: 'Section5', component: <Section5Form setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)} /> },
//     { id: 6, label: 'Card Product', component: <Section6Component setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)} /> },
//     { id: 7, label: 'Section7', component: <Section7AdminPanel setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(6, status)} /> },
//     { id: 8, label: 'Section8', component: <Section8Page setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(7, status)} /> },
//     { id: 9, label: 'Section9', component: <Section9Manager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(8, status)} /> },
//     { id: 10, label: 'Testimonial', component: <TestimonialManager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(9, status)} /> },
//     { id: 11, label: 'Section11', component: <Section11AdminPanel setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(10, status)} /> },
//     { id: 12, label: 'FAQ', component: <FAQManager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(11, status)} /> },
//     { id: 13, label: 'SEO', component: <SeoPage page={"home"} /> },
//   ];

//   // Function to get the tab class based on the active state and section status
//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

//   return (
//     <>
//       <div className="bg-white shadow-lg rounded-lg pb-4">
//         <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
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

//         {/* Tooltips */}
//         {/* {tabs.map((tab) => (
//           <Tooltip key={tab.id} id={`tooltip-${tab.id}`} place="top" effect="solid" />
//         ))} */}
//         <div className='px-4'>
//           <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner ">
//             {/* Render the selected component */}
//             {tabs.find((tab) => tab.id === activeBox)?.component}
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Index;








// import React, { useState, useEffect } from 'react';
// import Layout from '../../../components/Admin/common/Layout';
// import Test from '@/components/Admin/test';
// import Section2 from '@/components/Admin/Section2';
// import Section3Form from '@/components/Admin/Section3';
// import Section4Page from '@/components/Admin/Section4';
// import Section5Form from '@/components/Admin/Section5';
// import Section6Component from '@/components/Admin/Section6';
// import Section8Page from '@/components/Admin/Section8';
// import Section7AdminPanel from '@/components/Admin/Section7';
// import TestimonialManager from '@/components/Admin/Testimonail';
// import Section9Manager from '@/components/Admin/Section9';
// import Section11AdminPanel from '@/components/Admin/Section11';
// import FAQManager from '@/components/Admin/HomeFaq';
// import SeoPage from '@/components/Admin/seo/SEO';

// const Index = () => {
//   const [activeBox, setActiveBox] = useState(1);
//   const [sectionsStatus, setSectionsStatus] = useState(Array(13).fill(false));
//   console.log("sectionsStatus--------",sectionsStatus)

//   const sectionsStatusHandle = (index, status) => {
//     setSectionsStatus((prevStatus) => {
//       const updatedStatus = [...prevStatus];
//       updatedStatus[index] = status;
//       return updatedStatus;
//     });
//   };


//   // Function to trigger API call for each section
//   const triggerApiForSections = () => {
//     tabs.forEach((tab, index) => {
//       console.log(`API call for tab: ${tab.label}`);
//       // We assume each tab's component will trigger sectionsStatusHandle once it's done
//     });
//   };

//   useEffect(() => {
//     triggerApiForSections(); // API call trigger once
//   }, []);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   const tabs = [
//     { id: 1, label: 'Hero Section', component: <Test setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} /> },
//     { id: 2, label: 'Section2', component: <Section2 setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} /> },
//     { id: 3, label: 'Section3', component: <Section3Form setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} /> },
//     { id: 4, label: 'Section4', component: <Section4Page setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)} /> },
//     { id: 5, label: 'Section5', component: <Section5Form setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)} /> },
//     { id: 6, label: 'Card Product', component: <Section6Component setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)} /> },
//     { id: 7, label: 'Section7', component: <Section7AdminPanel setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(6, status)} /> },
//     { id: 8, label: 'Section8', component: <Section8Page setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(7, status)} /> },
//     { id: 9, label: 'Section9', component: <Section9Manager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(8, status)} /> },
//     { id: 10, label: 'Testimonial', component: <TestimonialManager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(9, status)} /> },
//     { id: 11, label: 'Section11', component: <Section11AdminPanel setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(10, status)} /> },
//     { id: 12, label: 'FAQ', component: <FAQManager setActiveBox={setActiveBox} sectionsStatusHandle={(status) => sectionsStatusHandle(11, status)} /> },
//     { id: 13, label: 'SEO', component: <SeoPage page={"home"} /> },
//   ];
//   const getTabClass = (id) =>
//     `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
//         ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;


//   return (
//     <div className="bg-white shadow-lg rounded-lg pb-4">
//       <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
//         {tabs.map((tab) => (
//           <div
//             key={tab.id}
//             className={`${getTabClass(tab.id)} ${sectionsStatus.map((status, index) => status ? 'bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white' : '').join(' ')} `}  // Apply dynamic tab class based on section status
//             onClick={() => handleClick(tab.id)}  // Handle click to set active tab
//             data-tooltip-id={`tooltip - ${tab.id} `}
//             data-tooltip-content={tab.label}
//           >
//             {tab.label}
//           </div>
//         ))}
//       </div>
//       <div className='px-4'>
//         <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner">
//           {/* Render the selected component based on the active tab */}
//           {tabs.find((tab) => tab.id === activeBox)?.component}
//         </div>
//       </div>
//     </div>
//   );

// };

// export default Index;



















import React, { useState, useEffect } from "react";
import Test from "@/components/Admin/test";
import Section2 from "@/components/Admin/Section2";
import Section3Form from "@/components/Admin/Section3";
import Section4Page from "@/components/Admin/Section4";
import Section5Form from "@/components/Admin/Section5";
import Section6Component from "@/components/Admin/Section6";
import Section7AdminPanel from "@/components/Admin/Section7";
import Section8Page from "@/components/Admin/Section8";
import Section9Manager from "@/components/Admin/Section9";
import TestimonialManager from "@/components/Admin/Testimonail";
import Section11AdminPanel from "@/components/Admin/Section11";
import FAQManager from "@/components/Admin/HomeFaq";
import SeoPage from "@/components/Admin/seo/SEO";

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  const [sectionsStatus, setSectionsStatus] = useState(Array(13).fill(false));
  console.log("section satatus show is here",sectionsStatus)
  
  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  // Simulate API trigger for all sections
  
  
  const tabs = [
    { id: 1, label: "Hero Section", component: <Test sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} /> },
    { id: 2, label: "Section2", component: <Section2 sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} /> },
    { id: 3, label: "Section3", component: <Section3Form sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} /> },
    { id: 4, label: "Section4", component: <Section4Page sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)} /> },
    { id: 5, label: "Section5", component: <Section5Form sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)} /> },
    { id: 6, label: "Card Product", component: <Section6Component sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)} /> },
    { id: 7, label: "Section7", component: <Section7AdminPanel sectionsStatusHandle={(status) => sectionsStatusHandle(6, status)} /> },
    { id: 8, label: "Section8", component: <Section8Page sectionsStatusHandle={(status) => sectionsStatusHandle(7, status)} /> },
    { id: 9, label: "Section9", component: <Section9Manager sectionsStatusHandle={(status) => sectionsStatusHandle(8, status)} /> },
    { id: 10, label: "Testimonial", component: <TestimonialManager sectionsStatusHandle={(status) => sectionsStatusHandle(9, status)} /> },
    { id: 11, label: "Section11", component: <Section11AdminPanel sectionsStatusHandle={(status) => sectionsStatusHandle(10, status)} /> },
    { id: 12, label: "FAQ", component: <FAQManager sectionsStatusHandle={(status) => sectionsStatusHandle(11, status)} /> },
    { id: 13, label: "SEO", component: <SeoPage page="home" sectionsStatusHandle={(status) => sectionsStatusHandle(12, status)}/> },
  ];
  useEffect(() => {
    // Trigger all tabs' APIs invisibly
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, [activeBox]);

  console.log("value show is here",sectionsStatus)


  
  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? "bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white" : ""} 
            ${isActive ? "bg-gradient-to-r from-black to-gray-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"}`;
  };
  

  return (
    <div className={`bg-white shadow-lg rounded-lg pb-4 ${activeBox === 2 || activeBox === 12 ? "" : "mb-20"}`}>
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
              className={`cursor-pointer  px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(
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
      <div className="px-4 ">
        <div className={`mt-5 border bg-gray-50 rounded-lg shadow-inner `}>
          {/* Render the active tab's component */}
          {tabs.find((tab) => tab.id === activeBox)?.component}
        </div>
      </div>
    </div>
  );
};

export default Index;
