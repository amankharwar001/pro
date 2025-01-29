import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";

export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [data, setData] = useState({ heading: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To check if data exists for editing
  const [apiStatus, setApiStatus] = useState(false)
  const [imageStatus, setImageStatus] = useState(false)


  useEffect(() => {
    if (apiStatus && imageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);

    }
  }, [apiStatus, imageStatus]);
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setIsEditing(true); // Data exists, so switch to editing mode
        setApiStatus(true)
      } catch (err) {
        setError(err.message);
        setIsEditing(false); // No data, switch to create mode
      } finally {
        setLoading(false);
      }
    };
    if (productpage?.id) {
      fetchData();
    }
  }, [productpage?.id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save (PUT request)
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      const updatedData = await response.json();
      setData(updatedData);
      alert("Data updated successfully!");
      setActiveBox(5);
      setApiStatus(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Create (POST request)
  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create data");
      }
      const newData = await response.json();
      setActiveBox(5);
      setData(newData);
      setApiStatus(true)
      alert("Data created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <h1 className="text-2xl font-bold mb-4">Section 4 Product</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section4${productpage?.id}`}/>
      </div>
      <ImageUploader referenceType={productpage?.id} referenceId={4} width={550} height={300} setImageStatus={setImageStatus}/>

      {!loading && (
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Heading</label>
            <input
              type="text"
              name="heading"
              value={data.heading}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Text</label>
            <textarea
              name="text"
              value={data.text}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={isEditing ? handleSave : handleCreate}
              className={`px-4 py-2 rounded ${isEditing ? "bg-blue-500" : "bg-green-500"
                } text-white`}
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
