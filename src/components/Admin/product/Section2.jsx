import { useState, useEffect } from "react";
import CommonImageUpload from "../CommonImageUpload";
import ImageUploader from "../ImageUploader";

const Section2Form = ({ productpage,setActiveBox,sectionsStatusHandle }) => {  // Add productpage?.id as a prop
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if data exists for editing

   const [apiStatus, setApiStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState(false)
    
  
   useEffect(() => {
      if (apiStatus && imageStatus) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatus]); 


  // Fetch existing data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing data from API using the productpage?.id
        const res = await fetch(`/api/product/sectionproduct2/${productpage?.id}`); // Use the dynamic productpage?.id in the API call
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setIsEditMode(true); // Enable edit mode if data exists
          setApiStatus(true)
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Only fetch if productpage?.id is provided
    if (productpage) {
      fetchData();
    }
  }, [productpage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = isEditMode ? "PUT" : "POST"; // Use PUT to update, POST to create
      const res = await fetch(`/api/product/sectionproduct2/${productpage?.id}`, {  // Use sectionId for dynamic URL
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        const response = await res.json();
        alert(`Data ${isEditMode ? "updated" : "created"} successfully!`);
        setActiveBox(3)
        setApiStatus(true)
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Section 2 Product" : "Create Section 2 Product"}
      </h1>
      <div className="flex flex-wrap gap-5">
        {[...Array(4)].map((_, index) => (
          <ImageUploader
            key={index}
            referenceType={productpage?.id}
            referenceId={index + 21}
            width={160} height={115}
            setImageStatus={setImageStatus}
          />
        ))}
      </div>
      {/* <ImageUploader referenceType={productpage?.id} referenceId={3} /> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2 text-xs mt-5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Section2Form;
