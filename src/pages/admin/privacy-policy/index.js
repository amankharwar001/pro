import Layout from '@/components/Admin/common/Layout';
import React, { useEffect, useState } from 'react'
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';

const Index = () => {
  const [activeBox, setActiveBox] = useState(2);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    heading: "",
    text: "",
    btn: "",
    btnLink: "",
  });
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/${url}`);
          if (res.ok) {
            const response = await res.json();
            if (response.data) {
              setFormData({ ...response.data, id: response.data._id });
            }
          } else {
            console.error("Failed to fetch data", await res.text());
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

  const handleClick = (box) => {
    setActiveBox(box);
  };

  // Helper function to determine the classes for each tab
  const getTabClass = (box) => {
    return activeBox === box
      ? 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black bg-black  text-white '
      : 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black  opacity-55';
  };

  return (
    <div>
      <Layout>
        <div className='flex justify-evenly pb-5 '>
          <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
          <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
          <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
        </div>
        {activeBox === 1 && <div><HeroSectionForm url={"privacypage/herosection"} referencetype={"herosection_privacy_policy_page"} /></div>}
        {activeBox === 2 && <div> <ClientSideCommonEditor referenceType={"privacy_policy"}  /></div>}
        {activeBox === 3 && <div><SeoPage page={"privacy-policy"}/></div>}
      </Layout>
    </div>
  );
};

export default Index;
