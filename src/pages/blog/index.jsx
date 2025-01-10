// import React, { useEffect, useState } from 'react'
// import Header from '../../components/ClientSide/commonComponent/Header'
// import FooterSection from '../../components/ClientSide/commonComponent/FooterSection'

// import BlogSection from '../../components/ClientSide/blog/BlogSection'
// import HeroSection from '../../components/ClientSide/blog/HeroSection'

// const Blog = () => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
//     const [blogData, setBlogData] = useState(null);

//     useEffect(() => {
//         // Fetch blog data from the API endpoint
//         const fetchBlogData = async () => {
//             try {
//                 const res = await fetch('api/blog/idgenerate');
//                 const data = await res.json();
//                 setBlogData(data); // Set the data into the state
//             } catch (error) {
//                 console.error("Error fetching blog data:", error);
//             }
//         };

//         fetchBlogData(); // Call the function when the component mounts
//     }, []);
//     return (
//         <div className='scroll-smooth'>
//             <div className='container py-5'>
//                 <Header />
//             </div>
//             <HeroSection/>
//             <BlogSection data={blogData} baseUrl={baseUrl}/>
//             <FooterSection />
//         </div>
//     )
// }

// export default Blog








import React from 'react';
import Header from '../../components/ClientSide/commonComponent/Header';
import FooterSection from '../../components/ClientSide/commonComponent/FooterSection';
import BlogSection from '../../components/ClientSide/blog/BlogSection';
import HeroSection from '../../components/ClientSide/blog/HeroSection';

const Blog = ({ blogData }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  return (
    <div className='scroll-smooth'>
      <div className='container py-5'>
        <Header />
      </div>
      <HeroSection />
      <BlogSection data={blogData} baseUrl={baseUrl} />
      <FooterSection />
    </div>
  );
};

// Fetch blog data server-side
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/blog/idgenerate`);
    const data = await res.json();

    // Return the fetched data as props
    return { props: { blogData: data } };
  } catch (error) {
    console.error('Error fetching blog data:', error);

    // Return an empty object or a fallback message
    return { props: { blogData: null } };
  }
}

export default Blog;
