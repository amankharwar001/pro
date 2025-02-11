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
    { id: 1, label: "Hero Section", component: <Test sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)} setActiveBox={setActiveBox}/> },
    { id: 2, label: "Section2", component: <Section2 sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} setActiveBox={setActiveBox}/> },
    { id: 3, label: "Section3", component: <Section3Form sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} setActiveBox={setActiveBox}/> },
    { id: 4, label: "Section4", component: <Section4Page sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)} setActiveBox={setActiveBox}/> },
    { id: 5, label: "Section5", component: <Section5Form sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)} setActiveBox={setActiveBox}/> },
    { id: 6, label: "Card Product", component: <Section6Component sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)} setActiveBox={setActiveBox}/> },
    { id: 7, label: "Section7", component: <Section7AdminPanel sectionsStatusHandle={(status) => sectionsStatusHandle(6, status)} setActiveBox={setActiveBox}/> },
    { id: 8, label: "Section8", component: <Section8Page sectionsStatusHandle={(status) => sectionsStatusHandle(7, status)} setActiveBox={setActiveBox}/> },
    { id: 9, label: "Section9", component: <Section9Manager sectionsStatusHandle={(status) => sectionsStatusHandle(8, status)} setActiveBox={setActiveBox}/> },
    { id: 10, label: "Testimonial", component: <TestimonialManager sectionsStatusHandle={(status) => sectionsStatusHandle(9, status)} setActiveBox={setActiveBox}/> },
    { id: 11, label: "Section11", component: <Section11AdminPanel sectionsStatusHandle={(status) => sectionsStatusHandle(10, status)} setActiveBox={setActiveBox}/> },
    { id: 12, label: "FAQ", component: <FAQManager sectionsStatusHandle={(status) => sectionsStatusHandle(11, status)} setActiveBox={setActiveBox}/> },
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
              className={`cursor-pointer text-admin_btn_tab  px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(
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
