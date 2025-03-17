import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";

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
  const [imageStatuses, setImageStatuses] = useState({}); // Track statuses for all images

  // Function to handle status changes
  const handleImageStatusChange = (id, status) => {
    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: status,
    }));
  };
  
   useEffect(() => {
    const allUploaded = Object.values(imageStatuses).every((status) => status === true);

      if (apiStatus && allUploaded) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatuses]); 
  // Fetch existing data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/product/sectionproduct6/${productpage?.id}`, {
          method: "GET",
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
           },
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
        headers: { "Content-Type": "application/json",  'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      const result = await response.json();
      setSuccess("Data saved successfully!");
      setFormData(result);
      setActiveBox(8); // Navigate to the next box after successful save
      setApiStatus(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      {/* <h1 className="text-xl font-bold mb-4">Section 6 Product</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>} */}
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section6${productpage?.id}`}/>
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-gray-700 text-sm mb-1">Heading:</label>
        <input
          type="text"
          value={formData.heading}
          onChange={(e) => handleChange("heading", e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-gray-700 text-sm mb-1">Text:</label>
        <textarea
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      

      {formData.info.map((item, index) => (
        <div key={index} className="mb-4 rounded shadow-md bg-white  border p-4">
          <ImageUploader
            referenceType={productpage?.id}
            referenceId={index + 61} // Unique referenceId for each ImageUploader
            width={80}
            height={80}
            setImageStatus={(status) => handleImageStatusChange(index + 61, status)} // Track status dynamically
          />

          <div className="mb-2">
            <label className="block text-sm">Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleChange("title", e.target.value, index)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Content:</label>
            <input
              type="text"
              value={item.content}
              onChange={(e) => handleChange("content", e.target.value, index)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleSubmit(isEditing ? "PUT" : "POST")}
           className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
