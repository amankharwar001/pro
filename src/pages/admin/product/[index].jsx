import React, { useEffect, useState } from 'react'
import Layout from '@/components/Admin/common/Layout';
import HeroSectionForm from '../../../components/Admin/product/HeroSection';
import Section2Form from '../../../components/Admin/product/Section2';
import Section3Form from '../../../components/Admin/product/Section3';
import Section4Product from '../../../components/Admin/product/Section4';
import Section5Product from '../../../components/Admin/product/Section5';
import Section6Product from '../../../components/Admin/product/Section6';
import Section7Product from '../../../components/Admin/product/Section7';
import { useRouter } from 'next/router';
import SeoPage from '@/components/Admin/product/SEO';
import ProductStatusDropdown from '@/components/Admin/common/Status';
import StatusSelector from '@/components/Admin/product/StatusSelector';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  
  const handleClick = (box) => {
    setActiveBox(box);
  };

  const [data, setData] = useState(null); // State to hold fetched data
  const router = useRouter(); // Initialize the useRouter hook
  const { index , edit:queryActiveBox} = router.query; // Capture 'index' from query parameters
  
  useEffect(() => {
    if (queryActiveBox) {
      setActiveBox(Number(queryActiveBox)); // Convert to a number if needed
    }
  }, [queryActiveBox]);

  // Fetch data when index is available and changes
  useEffect(() => {
    if (index) {
      const fetchData = async () => {
        try {
          const endpoint = `/api/product/productpage/${index}`; // Use the index in your API request
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
  }, [index,queryActiveBox]); // Re-fetch when the index changes

  // Helper function to determine the classes for each tab
  const getTabClass = (id) =>
    `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;



  return (
    <div>
      <>
        <div className=' pt-4  md:p-4 bg-white rounded-lg'>
          <div className='flex justify-end px-2'>
            <StatusSelector productId={index} />
          </div>
          {/* <ProductStatusDropdown productStatusId={data?.id}/> */}
          <div className='sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto '>
            <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
            <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
            <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
            <span className={getTabClass(4)} onClick={() => handleClick(4)}>Section4</span>
            <span className={getTabClass(5)} onClick={() => handleClick(5)}>Section5</span>
            <span className={getTabClass(6)} onClick={() => handleClick(6)}>Section6</span>
            <span className={getTabClass(7)} onClick={() => handleClick(7)}>Section7</span>
            <span className={getTabClass(8)} onClick={() => handleClick(8)}>SEO</span>

          </div>
          <div className='mt-5 '>
          
          {activeBox === 1 && <div><HeroSectionForm productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 2 && <div><Section2Form productpage={data}  setActiveBox={setActiveBox}/></div>}
          {activeBox === 3 && <div><Section3Form productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 4 && <div><Section4Product productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 5 && <div><Section5Product productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 6 && <div><Section6Product productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 7 && <div><Section7Product productpage={data} setActiveBox={setActiveBox}/></div>}
          {activeBox === 8 && <div><SeoPage productpage={data}/></div>}
          </div>
        </div>

      </>
    </div>
  );
};

export default Index;








// import React, { useState } from 'react'
// import Layout from '../../components/Admin/common/Layout'

// const Index = () => {
//   const [activeBox, setActiveBox] = useState(2);

//   const handleClick = (box) => {
//     setActiveBox(box);
//   };

//   // Helper function to determine the classes for each tab
//   const getTabClass = (box) => {
//     return activeBox === box
//       ? 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black bg-black  text-white '
//       : 'border-B border-black px-4 hover:text-white cursor-pointer hover:bg-black  opacity-55';
//   };

//   return (
//     <div>
//       <Layout>
//         <div className='flex justify-evenly pb-5 '>
//           <span className={getTabClass(1)} onClick={() => handleClick(1)}>Hero Banner Section</span>
//           <span className={getTabClass(2)} onClick={() => handleClick(2)}>Section2</span>
//           <span className={getTabClass(3)} onClick={() => handleClick(3)}>Section3</span>
//           <span className={getTabClass(4)} onClick={() => handleClick(4)}>Section4</span>
//           <span className={getTabClass(5)} onClick={() => handleClick(5)}>Section5</span>
//           <span className={getTabClass(6)} onClick={() => handleClick(6)}>Card Product</span>
//           <span className={getTabClass(7)} onClick={() => handleClick(7)}>Section7</span>
//           <span className={getTabClass(8)} onClick={() => handleClick(8)}>Section8</span>
//           <span className={getTabClass(9)} onClick={() => handleClick(9)}>Section9</span>
//           <span className={getTabClass(10)} onClick={() => handleClick(10)}>Testimonial</span>
//           <span className={getTabClass(11)} onClick={() => handleClick(11)}>section11</span>
//           <span className={getTabClass(12)} onClick={() => handleClick(12)}>section12</span>
//         </div>
//         {activeBox === 1 && <div></div>}
//         {activeBox === 2 && <div></div>}
//         {activeBox === 3 && <div></div>}
//         {activeBox === 4 && <div></div>}
//         {activeBox === 5 && <div></div>}
//         {activeBox === 6 && <div></div>}
//         {activeBox === 7 && <div></div>}
//         {activeBox === 8 && <div></div>}
//         {activeBox === 9 && <div></div>}
//         {activeBox === 10 && <div></div>}
//         {activeBox === 11 && <div></div>}
//         {activeBox === 12 && <div></div>}
//       </Layout>
//     </div>
//   );
// };

// export default Index;
