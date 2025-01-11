import Layout from "@/components/Admin/common/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const BlogList = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  // State for sorting
  const [sortBy, setSortBy] = useState(null); // Title, Status, Image
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending or Descending

  // Fetch the blog data when the component mounts
  useEffect(() => {
    fetch("/api/blog/idgenerate")
      .then((response) => response.json())
      .then((data) => setBlogList(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle adding a new blog
  const handleAddBlogClick = () => {
    fetch(`/api/blog/idgenerate`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to create blog');
        }
      })
      .then((data) => {
        router.push(`/admin/blog/create/${data.id}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

const handleDeleteBlog = async (blogId) => {
  // Show prompt for confirmation
  const userConfirmation = prompt("Type 'yes' to confirm deletion:");

  if (userConfirmation === null || userConfirmation.trim().toLowerCase() !== "yes") {
      // If user cancels or doesn't type 'yes', cancel the delete action
      alert("Blog deletion canceled.");
      return;
  }

  try {
      // Proceed with DELETE request if 'yes' is typed
      const response = await fetch(`/api/blog/deleteblog-id?id=${blogId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          const errorData = await response.json();
          alert('Failed to delete blog.');
      } else {
          // If deletion is successful, update the blog list state
          setBlogList((prevBlogs) => prevBlogs.filter(blog => blog.id !== blogId));
          alert("Blog successfully deleted!");
      }
  } catch (error) {
      alert('An error occurred while deleting the blog.');
  }
};



  // Sorting function
  const handleSort = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  // Sort blogList based on column and order
  
  const sortedBlogs = [...blogList].sort((a, b) => {
    if (sortBy === "title") {
      const aHeading = (a.heading || "").toLowerCase();
      const bHeading = (b.heading || "").toLowerCase();
  
      return sortOrder === "asc"
        ? aHeading.localeCompare(bHeading)   // Ascending (A to Z)
        : bHeading.localeCompare(aHeading);  // Descending (Z to A)
    } else if (sortBy === "status") {
      const statusOrder = ["draft", "active"];
      return sortOrder === "asc"
        ? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        : statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
    } else if (sortBy === "image") {
      const aHasImage = a.image?.length > 0;
      const bHasImage = b.image?.length > 0;
      return sortOrder === "asc"
        ? aHasImage - bHasImage
        : bHasImage - aHasImage;
    }
    return 0;
  });
  
  // Filter blogs by search term
  const filteredBlogs = sortedBlogs.filter(blog =>
    (blog.heading?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search term change
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Blog List</h2>
          <button
            onClick={handleAddBlogClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
          >
            + Add Blog
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-blue-50 text-gray-700 uppercase">
              <tr>
                <th onClick={() => handleSort('image')} className="cursor-pointer px-6 py-4">Image</th>
                <th onClick={() => handleSort('title')} className="cursor-pointer px-6 py-4">Title</th>
                <th onClick={() => handleSort('status')} className="cursor-pointer px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
                <th className="px-6 py-4 text-center">Link</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    <Image
                      className="w-32 h-20 object-cover border rounded-lg"
                      src={`${basePath}${blog?.image[0]?.filePath}`}
                      alt={blog?.image[0]?.altText}
                      width={100}
                      height={100}
                      onError={(e) => e.target.src = '/fallback/image.webp'}
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <div className="text-gray-800 font-medium uppercase">
                      {blog.heading || "Untitled"}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    <span
                      className={`${blog.status === "active" ? "bg-green-500" : "bg-red-500"
                        } text-white text-xs px-3 py-1 rounded-full shadow`}
                    >
                      {blog.status || "draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    <button
                      onClick={() => router.push(`/admin/blog/create/${blog.id}`)}
                      className="text-blue-500 hover:text-blue-600 mx-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="text-red-500 hover:text-red-600 mx-2"
                    >
                      🗑️
                    </button>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {blog.status === "active" ? (
                      <a
                        href={`${basePath}blog/${blog.seo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500"
                      >
                        Link
                      </a>
                    ) : (
                      <span className="text-gray-500">Not Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {currentBlogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blogs found. Add a new blog to get started!
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
