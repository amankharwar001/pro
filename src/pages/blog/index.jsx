import React, { useEffect, useState } from 'react'
import Header from '../../components/ClientSide/commonComponent/Header'
import FooterSection from '../../components/ClientSide/commonComponent/FooterSection'
import Image from 'next/image'
import BlogSection from '../../components/ClientSide/blog/BlogSection'
import HeroSection from '../../components/ClientSide/blog/HeroSection'

const Blog = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        // Fetch blog data from the API endpoint
        const fetchBlogData = async () => {
            try {
                const res = await fetch('api/blog/idgenerate');
                const data = await res.json();
                setBlogData(data); // Set the data into the state
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData(); // Call the function when the component mounts
    }, []);
    return (
        <div className='scroll-smooth'>
            <div className='container py-5'>
                <Header />
            </div>
            <HeroSection/>
            <BlogSection data={blogData} baseUrl={baseUrl}/>
            <FooterSection />
        </div>
    )
}

export default Blog