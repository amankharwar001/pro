import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const HeroSection = () => {
    const [blogData, setBlogData] = useState(null); // State to store blog data
    console.log("blog data show is here",blogData)

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the public blog API
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/blog/blog`);
                const data = await res.json();
                setBlogData(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setBlogData(null); // Handle errors and set a fallback value
            }
        };
        fetchData(); // Call fetchData on component mount
    }, []);
    return (
        <div><div className=' relative' >
            <div className='h-56 md:h-72 overflow-hidden'>
                <Image
                    src={blogData?.image?.filePath}
                    alt={blogData?.image?.altText}
                    fill
                    objectFit='cover'
                />
                <div className='absolute top-2/4 -translate-y-2/4 right-2/4 translate-x-2/4 '>
                    <h1 className='uppercase text-h1 font-bold m-auto  text-center'>{blogData?.headingName}</h1>
                    <div className='flex gap-3 items-center justify-center'>
                        <span>Home</span>
                        <span>|</span>
                        <span>blog</span>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default HeroSection