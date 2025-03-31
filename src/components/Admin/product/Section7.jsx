import { useState, useEffect } from "react";
import StatusManager from "../status";

export default function Section7Product({ productpage, setActiveBox,sectionsStatusHandle }) {
  const [formData, setFormData] = useState({
    heading: "",
    text: "",
    btn: "",
    btnLink: "",
    info: [
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if data is fetched

  // Fetch existing data on component mount using product.id
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/product/sectionproduct7/${productpage?.id}`, {
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
        setIsEditing(true); // Data exists, switch to edit mode
        sectionsStatusHandle(true)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // Only fetch data if product.id is available
    if (productpage?.id) {
      fetchData();
    }
  }, [productpage?.id]);

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
      // Update heading, text, btn, or btnLink
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  // Submit form for creating/updating the entry
  const handleSubmit = async (method) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/product/sectionproduct7/${productpage?.id}`, {
        method: method,
        headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      const result = await response.json();
      alert('Section updated successfully!');
      setSuccess("Data saved successfully!");
      setFormData(result);
      setActiveBox(9); // Navigate to the next section after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section7${productpage?.id}`}/>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Heading:</label>
        <input
          type="text"
          value={formData.heading}
          onChange={(e) => handleChange("heading", e.target.value)}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Text:</label>
        <textarea
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Button Text:</label>
        <input
          type="text"
          value={formData.btn}
          onChange={(e) => handleChange("btn", e.target.value)}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Button Link:</label>
        <input
          type="text"
          value={formData.btnLink}
          onChange={(e) => handleChange("btnLink", e.target.value)}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>

      {formData.info.map((item, index) => (
        <div key={index} className="mb-4 rounded bg-white border shadow-md p-4">
          <h3 className="text-sm underline  font-semibold">Info {index + 1}</h3>
          <div className="mb-2">
            <label className="block text-sm">Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleChange("title", e.target.value, index)}
              className="w-full border px-2 py-1 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">Content:</label>
            <input
              type="text"
              value={item.content}
              onChange={(e) => handleChange("content", e.target.value, index)}
              className="w-full border px-2 py-1 rounded-md"
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
