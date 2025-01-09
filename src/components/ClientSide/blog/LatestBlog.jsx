// import Image from 'next/image';
// import React from 'react'

// const posts = [
//     {
//         title: "Unsecured Business Loans in Delhi - Get Risk-Free sdfsfas asdfsdfasf sadfsadfsdf sdfasdfsadf",
//         date: "01 Apr, 2023",
//         imgSrc: "/blog/blog-1.jpg",
//         // imgSrc: "https://placehold.co/64x64",
//         altText: "Unsecured Business Loans in Delhi",
//     },
//     {
//         title: "Grow Your Business Fast, Apply For Online Business...",
//         date: "27 Mar, 2023",
//         imgSrc: "/blog/blog-1.jpg",
//         // imgSrc: "https://placehold.co/64x64",
//         altText: "Grow Your Business Fast",
//     },
//     {
//         title: "Unsecured Small Business Loans in Delhi - Financial...",
//         date: "24 Mar, 2023",
//         imgSrc: "/blog/blog-1.jpg",
//         // imgSrc: "https://placehold.co/64x64",
//         altText: "Unsecured Small Business Loans",
//     },
//     {
//         title: "How to File a Correction for Income Tax Return or ...",
//         date: "24 Mar, 2023",
//         imgSrc: "/blog/blog-1.jpg",
//         // imgSrc: "https://placehold.co/64x64",
//         altText: "How to File a Correction for Income Tax Return",
//     },
// ];

// const LatestBlog = ({baseUrl}) => {
//     return (
//         <div className='pb-10'>
//             <div className="p-4  bg-[#F5F5F5] border rounded-lg shadow-lg">
//                 <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-foreground"> <span className="mr-2 text-primary">—</span>Latest Blog Posts</h2>
//                 <div className="space-y-8">
//                 {posts.map((post, index) => (
//                     <div key={index} className="flex items-start">
//                         <Image className="w-20 h-20 rounded-lg mr-4" width={100} height={100} src={post.imgSrc} alt={post.altText} />
//                         <div>
//                             <h3 className="text-lg text-md mt-0 font-medium text-primary line-clamp-2">{post.title}</h3>
//                             <span className="text-muted-foreground text-sm">{post.date}</span>
//                         </div>
//                     </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LatestBlog



import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const LatestBlog = ({ baseUrl }) => {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    // Fetch latest posts from API
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch("/api/public/blog/latestpost");
        const result = await response.json();
        setPosts(result || []); // Update posts state
      } catch (err) {
        console.error("Error fetching latest posts:", err);
        setPosts([]); // Ensure posts state is an empty array on error
      }
    };

    fetchLatestPosts();
  }, []);

  const handlePostClick = (seoSlug) => {
    // Navigate to the specific blog page using its SEO slug
    router.push(`/blog/${seoSlug}`);
  };

  return (
    <div className="pb-10">
      <div className="p-4 bg-[#F5F5F5] border rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-foreground">
          <span className="mr-2 text-primary">—</span>Latest Blog Posts
        </h2>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div>No latest blogs available.</div>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className="flex items-start cursor-pointer"
                onClick={() => handlePostClick(post.seoSlug)} // Navigate on click
              >
                <Image
                  className="w-20 h-20 rounded-lg mr-4 object-cover"
                  width={100}
                  height={100}
                  src={`${baseUrl}${post.featureImage?.filePath}`}
                  alt={post.featureImage?.altText || "Blog image"}
                />
                <div>
                <h3 className="text-lg text-md mt-0 font-medium text-primary line-clamp-2">{post.heading}</h3>
                  {/* <h3 className="text-md mt-0 font-medium text-primary line-clamp-2">
                    {post.heading}
                  </h3> */}
                  <span className="text-muted-foreground text-sm">
                    {post.createAt}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
