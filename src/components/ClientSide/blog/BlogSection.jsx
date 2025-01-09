


import React, { useEffect, useState } from "react";
import Card1 from "./Card-1";
import LatestBlog from "./LatestBlog";
import { FaSearch } from "react-icons/fa";

const BlogSection = ({ data, baseUrl }) => {
  const [categories, setCategories] = useState([]); // Categories list
  const [blogs, setBlogs] = useState(data ); // All blogs from props
  const [filteredBlogs, setFilteredBlogs] = useState(data); // Displayed blogs (initialized with all blogs)
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [notFound, setNotFound] = useState(false); // "Not Found" state

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "/api/public/blog/category"
        );
        const result = await response.json();
        setCategories(result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const categoryBlogs = category.blogs ; // All blogs in the category
    setBlogs(categoryBlogs); // Update blogs state
    setFilteredBlogs(categoryBlogs); // Update displayed blogs
    setSearchTerm(""); // Clear search input
    setNotFound(categoryBlogs.length === 0); // Show "Not Found" if no blogs
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search input
    setFilteredBlogs(data); // Reset to all blogs for live filtering
  };

  const handleSearch = () => {
    const searchedBlogs = (data ).filter((blog) =>
      blog.heading?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBlogs(searchedBlogs); // Update displayed blogs with search results
    setNotFound(searchedBlogs.length === 0); // Show "Not Found" if no results
  };

  return (
    <div className="container px-4 py-10 mx-auto grid-flow-row-dense grid lg:gap-5 mt-10 lg:grid-cols-3">
      {/* Left Column (Search, Categories, Latest Blog) */}
      <div className="order-2 lg:order-1 flex flex-col gap-8 md:col-span-1 w-full md:max-w-96 md:m-auto">
        {/* Search Bar */}
        <div className="p-6 bg-[#F5F5F5] rounded-lg shadow-md">
          <h2 className="flex items-center text-xl font-bold text-foreground">
            <span className="mr-2 text-primary">—</span> Search Blog
          </h2>
          <div className="flex mt-4 gap-5">
            <input
              type="text"
              placeholder="Search Blog..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 border border-border rounded-l-md bg-input text-muted-foreground placeholder:text-muted focus:outline-none focus:ring focus:ring-ring transform"
            />
            <button onClick={handleSearch}>
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-[#F5F5F5] border p-6 rounded-lg shadow-xl overflow-hidden">
          <h2 className="flex items-center text-xl font-bold text-foreground">
            <span className="mr-2 text-primary">—</span> Categories
          </h2>
          <div className="flex flex-col space-y-4 mt-5">
            {categories
              .filter((category) => category.blogCount > 0)
              .map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between hover:bg-[#003167] items-center overflow-hidden text-white rounded-lg shadow-md bg-[#295a92] cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <span className="font-semibold p-4">{category.category}</span>
                  <div className="bg-[#03274f] h-[100%] p-4">
                    <span className="font-bold text-lg">{category.blogCount}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Latest Blog */}
        <LatestBlog baseUrl={baseUrl}/>
      </div>

      {/* Right Column (Card1 - Blog Section) */}
      <div className="order-1 lg:order-2 md:col-span-2">
        {notFound ? (
          <div className="text-center text-gray-500 mt-10">
            <h2 className="text-2xl font-bold">No blogs found</h2>
            <p className="text-lg">Try searching for a different title or select another category.</p>
          </div>
        ) : (
          <Card1 blogData={filteredBlogs||data} baseUrl={baseUrl} />
        )}
      </div>
    </div>
  );
};

export default BlogSection;
