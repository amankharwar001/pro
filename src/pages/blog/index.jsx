
import React from 'react';
import Header from '../../components/ClientSide/commonComponent/Header';
import FooterSection from '../../components/ClientSide/commonComponent/FooterSection';
import BlogSection from '../../components/ClientSide/blog/BlogSection';
import HeroSection from '../../components/ClientSide/blog/HeroSection';

const Blog = ({ blogData }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  return (
    <div className='scroll-smooth'>
      <HeroSection />
      <BlogSection data={blogData} baseUrl={baseUrl} />
    </div>
  );
};

// Fetch blog data server-side
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/blog/idgenerate`,{
      headers: {
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
       },
    });
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
