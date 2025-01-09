import React, { useState } from 'react';
import Layout from '../../../components/Admin/common/Layout';
import Test from '@/components/Admin/test';
import Section2 from '@/components/Admin/Section2';
import Section3Form from '@/components/Admin/Section3';
import Section4Page from '@/components/Admin/Section4';
import Section5Form from '@/components/Admin/Section5';
import Section6Component from '@/components/Admin/Section6';
import Section8Page from '@/components/Admin/Section8';
import Section7AdminPanel from '@/components/Admin/Section7';
import TestimonialManager from '@/components/Admin/Testimonail';
import Section11AdminPanel from '@/components/Admin/Section11';
import FAQManager from '@/components/Admin/HomeFaq';
import Section9Manager from '@/components/Admin/Section9';
import SeoPage from '@/components/Admin/seo/SEO';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);

  const handleClick = (box) => {
    setActiveBox(box);
  };

  const tabs = [
    { id: 1, label: 'Hero Section', component: <Test setActiveBox={setActiveBox}/> },
    { id: 2, label: 'Section2', component: <Section2 setActiveBox={setActiveBox}/> },
    { id: 3, label: 'Section3', component: <Section3Form setActiveBox={setActiveBox}/> },
    { id: 4, label: 'Section4', component: <Section4Page setActiveBox={setActiveBox}/> },
    { id: 5, label: 'Section5', component: <Section5Form setActiveBox={setActiveBox}/> },
    { id: 6, label: 'Card Product', component: <Section6Component setActiveBox={setActiveBox}/> },
    { id: 7, label: 'Section7', component: <Section7AdminPanel setActiveBox={setActiveBox}/> },
    { id: 8, label: 'Section8', component: <Section8Page setActiveBox={setActiveBox}/> },
    { id: 9, label: 'Section9', component: <Section9Manager setActiveBox={setActiveBox}/> },
    { id: 10, label: 'Testimonial', component: <TestimonialManager setActiveBox={setActiveBox}/> },
    { id: 11, label: 'Section11', component: <Section11AdminPanel setActiveBox={setActiveBox}/> },
    { id: 12, label: 'FAQ', component: <FAQManager setActiveBox={setActiveBox}/> },
    { id: 13, label: 'SEO', component: <SeoPage page={"home"} /> },
  ];

  const getTabClass = (id) =>
    `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
    ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

  return (
    <Layout>
      <div className="bg-white shadow-lg rounded-lg  pb-4">
        <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={getTabClass(tab.id)}
              onClick={() => handleClick(tab.id)}
              data-tooltip-id={`tooltip-${tab.id}`}
              data-tooltip-content={tab.label}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tooltips */}
        {/* {tabs.map((tab) => (
          <Tooltip key={tab.id} id={`tooltip-${tab.id}`} place="top" effect="solid" />
        ))} */}
        <div className='px-4'>
          <div className="mt-5 border bg-gray-50 rounded-lg shadow-inner ">
            {/* Render the selected component */}
            {tabs.find((tab) => tab.id === activeBox)?.component}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Index;
