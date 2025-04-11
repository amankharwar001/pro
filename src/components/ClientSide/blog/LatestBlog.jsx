


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
        const response = await fetch("/api/public/blog/latestpost", {
          headers: {
              'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
      });
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
        <h5 className="text-h5 font-semibold border-b pb-2 mb-4 text-foreground">
          <span className="mr-2 text-primary">—</span>Latest Blog Posts
        </h5>
        <div className="space-y-8">
          {posts?.length > 0 &&
            posts?.map((post, index) => (
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
                <h5 className="text-h5 blogsidebar_head text-md mt-0 font-medium text-primary line-clamp-2">{post.heading}</h5>
                  {/* <h3 className="text-md mt-0 font-medium text-primary line-clamp-2">
                    {post.heading}
                  </h3> */}
                  <span className=" text-xs">
                    {post.createAt}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
