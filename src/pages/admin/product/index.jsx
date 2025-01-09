import React, { useEffect, useState } from 'react'
import Layout from '@/components/Admin/common/Layout';
import HeroSectionForm from '../../../components/Admin/product/HeroSection';
import { useRouter } from 'next/router';
import ImageUploader from '@/components/Admin/ImageUploader';


const AddProduct = () => {
  const [activeBox, setActiveBox] = useState(1);
  
  const handleClick = (box) => {
    setActiveBox(box);
  };

  const [data, setData] = useState(null); // State to hold fetched data
  const router = useRouter(); // Initialize the useRouter hook
  const { index } = router.query; // Capture 'index' from query parameters

  
  // Fetch data when index is available and changes
  useEffect(() => {
    if (index) {
      const fetchData = async () => {
        try {
          const endpoint = `/api/productpage/${index}`; // Use the index in your API request
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            setData(data); // Store fetched data in state
            
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [index]); // Re-fetch when the index changes

  const handleHeroSectionSubmit = (id) => {
    router.push(`/admin/product/${id}`); // Update the URL with the new ID
  };

  // Helper function to determine the classes for each tab
  const getTabClass = (id) =>
    `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

  return (
    <div>
      <Layout>
        <div className='sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto'>
          <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
          <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
          <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
          <span className={getTabClass(4)} onClick={() => handleClick(4)}>Section4</span>
          <span className={getTabClass(5)} onClick={() => handleClick(5)}>Section5</span>
          <span className={getTabClass(6)} onClick={() => handleClick(6)}>Section6</span>
          <span className={getTabClass(7)} onClick={() => handleClick(7)}>Section7</span>
        </div>
        
        {activeBox === 1 && <div><HeroSectionForm productpage={data} onSubmitId={handleHeroSectionSubmit} /></div>}
      </Layout>
    </div>
  );
};

export default AddProduct;
