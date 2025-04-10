import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Admin/common/Layout";
import { useRouter } from "next/router";
import SeoPage from "@/components/Admin/blog/SEO";
import StatusSelector from "@/components/Admin/blog/StatusSelector";
import CommonEditor from '@/components/Admin/blog/CommonEditor';
import ImageUploader from "@/components/Admin/ImageUploader";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Index = () => {
  const router = useRouter();
  const { index } = router.query; // Assuming `index` is the blogId in the query
  const [isBlogExist, setBlogExist] = useState(null); // State to store the existing blog data
  const [heading, setHeading] = useState(""); // State to store the heading
  const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected category IDs
  const [categories, setCategories] = useState([]); // State to store categories from API
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state
  const [visible, setVisible] = useState(false)
  const [showSeo, setShowSeo] = useState(false);

  const childRef = useRef();

  // Fetch categories from the API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/blog/category",{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        const data = await response.json();
        setCategories(data); // Store the category data in the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  // Fetch existing blog content from API when blogId is available
  useEffect(() => {
    if (!index) return; // Don't fetch if no blogId is available

    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`/api/blog/common-content/${index}`,{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (!response.ok) throw new Error("Failed to fetch blog content");
        const data = await response.json();
        setHeading(data.heading);
        setShowSeo(true)
        setSelectedCategories(data.selectedCategories);
        setBlogExist(data); // Set blog content if it exists
      } catch (error) {
        console.error("Error fetching blog content:", error);
        setError("Failed to load blog content.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [index]);

  // Handle checkbox selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId) // Remove from selection
        : [...prevSelected, categoryId] // Add to selection
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Determine whether to use POST or PUT based on the presence of `isBlogExist`
      const method = isBlogExist ? "PUT" : "POST"; // Use PUT if blog exists, else POST
     
      // Prepare the request body
      const body = {
        heading,
        selectedCategories,
      };

      const response = await fetch(`/api/blog/common-content/${index}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save blog content");

      const result = await response.json();

      // Handle response and UI updates
      if (childRef.current) {
        childRef.current.handleSubmit(); // Save editor content
      }

      alert(index ? "Blog content updated successfully!" : "New blog created successfully!");

      if (!index) {
        // If a new blog was created, navigate to its edit page
        router.push(`/admin/blog/edit/${result.id}`);
      }
      setShowSeo(true)
      router.reload();
    } catch (error) {
      console.error("Error saving blog content:", error);
      alert("Failed to save blog content.");
    }
  };

  // Show loading message or error if data is not loaded
  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-xl">Loading...</div>
    );
  }

  const vissibleHandle = () => {
   
    setVisible(!visible)
  }

  return (
    <>
      <div className="relative">
        <div className={`${visible ? "hidden" : "flex"} items-center justify-between bg-slate-100 sticky top-[72.2px] z-[100] px-2 py-2  shadow-lg border-b-2 border-red-800`}>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 pl-5">Edit Blog</h2>
          </div>
          <div className="flex justify-end items-center gap-5">
            <StatusSelector blogId={index} />
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Icon and Button */}
        <div className="flex items-center sticky top-[86.2px] z-[101] -left-5">
          {!visible?
          <FaEye className="cursor-pointer text-green-500" size={25} onClick={vissibleHandle} />
          :
          <IoEyeOff className="cursor-pointer text-red-500" size={25} onClick={vissibleHandle} />

          }
          
        </div>

        <div className="md:flex gap-8">
          <div className="w-full md:grow bg-gray-50 border p-6 rounded-lg shadow-inner">
            <div className="pb-5">
              <label className="block font-medium text-gray-600 mb-2">Heading</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)} // Update heading on input change
                required
                className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <CommonEditor blogId={index} ref={childRef} />
          </div>

          <div className="mt-5 md:mt-0 md:w-64">
            <div className="border shadow-inner rounded-lg p-4 flex md:block items-center flex-col bg-gray-50">
              <label className="block font-medium text-gray-600 mb-1">Feature Image</label>
              <ImageUploader referenceType={index} width={1320} height={420}/>
            </div>
            <div className="mt-5 px-4 pb-4 border border-gray-200 bg-white rounded-lg shadow-lg">
              <label className="block font-medium text-gray-600 pt-2 pb-1">Categories</label>
              <hr />
              <div className="space-y-4 mt-5">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)} // Check if the category is selected
                      onChange={() => handleCategoryChange(category.id)} // Handle checkbox change
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-3 text-gray-600 text-sm">
                      {category.category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl px-3 font-semibold text-gray-700 mb-6">SEO Management</h2>
          {showSeo && <SeoPage blogpageId={index} /> }
          
        </div>
      </div>
    </>
  );
};

export default Index;
