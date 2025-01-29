import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";

export default function Section5Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [data, setData] = useState({
    heading: "",
    text: "",
    info: [
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To check if data exists for editing
  const [apiStatus, setApiStatus] = useState(false)
  const [imageStatuses, setImageStatuses] = useState({});
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
    } else {
      sectionsStatusHandle(false);

    }
  }, [apiStatus, imageStatuses]);
  // Fetch data on component mount using productpage.id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setIsEditing(true); // Data exists, switch to edit mode
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

  // Handle input changes for heading and text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for info array
  const handleInfoChange = (index, field, value) => {
    const updatedInfo = [...data.info];
    updatedInfo[index][field] = value;
    setData((prev) => ({ ...prev, info: updatedInfo }));
  };

  // Handle Save (PUT request)
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`, {
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
      setActiveBox(6); // Navigate to next box
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
      const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create data");
      }
      const newData = await response.json();
      setData(newData);
      alert("Data created successfully!");
      setApiStatus(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <h1 className="text-2xl font-bold mb-4">Section 5 Product</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section5${productpage?.id}`} />
      </div>
      <ImageUploader referenceType={productpage?.id} referenceId={5} width={450} height={610} setImageStatus={(status) => handleImageStatusChange(5, status)} />

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
          <div>
            <h2 className="text-lg font-medium">Info</h2>
            {data?.info?.map((item, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div>
                  <ImageUploader
                    referenceType={productpage?.id}
                    referenceId={index + 51} // Unique reference ID for each dynamic image
                    width={50}
                    height={50}
                    setImageStatus={(status) => handleImageStatusChange(index + 51, status)} // Track each image's status
                  />
                  <label className="block font-medium">Title {index + 1}</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleInfoChange(index, "title", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Content {index + 1}</label>
                  <textarea
                    value={item.content}
                    onChange={(e) => handleInfoChange(index, "content", e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={isEditing ? handleSave : handleCreate}
              className={`bg-${isEditing ? "blue" : "green"}-500 text-white px-4 py-2 rounded`}
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
