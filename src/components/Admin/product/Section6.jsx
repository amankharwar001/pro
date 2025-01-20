import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";

export default function Section6Product({ productpage, setActiveBox,sectionsStatusHandle }) {
  const [formData, setFormData] = useState({
    heading: "",
    text: "",
    info: [
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if data is fetched
  const [apiStatus, setApiStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState(false)
    
  
   useEffect(() => {
      if (apiStatus && imageStatus) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatus]); 
  // Fetch existing data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/product/sectionproduct6/${productpage?.id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const result = await response.json();
        setFormData(result);
        setIsEditing(true); // Data fetched, it's in edit mode
        setApiStatus(true)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productpage?.id]); // Re-fetch when productpage.id changes

  // Handle form input changes
  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      // Update specific info field
      setFormData((prevData) => {
        const updatedInfo = [...prevData.info];
        updatedInfo[index][field] = value;
        return { ...prevData, info: updatedInfo };
      });
    } else {
      // Update heading or text
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  // Submit form for creating/updating the entry
  const handleSubmit = async (method) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/product/sectionproduct6/${productpage?.id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      const result = await response.json();
      setSuccess("Data saved successfully!");
      setFormData(result);
      setActiveBox(7); // Navigate to the next box after successful save
      setApiStatus(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">Section 6 Product</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Heading:</label>
        <input
          type="text"
          value={formData.heading}
          onChange={(e) => handleChange("heading", e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Text:</label>
        <textarea
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      {formData.info.map((item, index) => (
        <div key={index} className="mb-4">
          <ImageUploader referenceType={productpage?.id} referenceId={index + 61}  width={80} height={80} setImageStatus={setImageStatus}/>
          <h3 className="font-medium">Info {index + 1}</h3>
          <div className="mb-2">
            <label className="block text-sm">Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleChange("title", e.target.value, index)}
              className="w-full border px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Content:</label>
            <input
              type="text"
              value={item.content}
              onChange={(e) => handleChange("content", e.target.value, index)}
              className="w-full border px-2 py-1"
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleSubmit(isEditing ? "PUT" : "POST")}
          className={`bg-${isEditing ? "green" : "blue"}-500 text-white px-4 py-2 rounded`}
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
