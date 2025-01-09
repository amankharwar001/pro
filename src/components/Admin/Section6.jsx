import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "./ImageUploader";

const AdminSection6Panel = ({setActiveBox}) => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    bottomtext: "",
    card: [
      { title: "", content: "", info: "", btnname: "", btnlink: "" },
      { title: "", content: "", info: "", btnname: "", btnlink: "" },
      { title: "", content: "", info: "", btnname: "", btnlink: "" },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Track active tab index

  useEffect(() => {
    const fetchSectionData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/homepage/section6");
        const result = await response.json();
        if (result.success && result.data) {
          setFormData({
            ...result.data,
            card: result.data.card.slice(0, 3), // Ensure exactly 3 cards
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCardChange = (index, field, value) => {
    // Create a copy of the current cards
    const updatedCards = [...formData.card];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
  
    // Only update the state if the new value differs from the previous one
    if (JSON.stringify(updatedCards) !== JSON.stringify(formData.card)) {
      setFormData({ ...formData, card: updatedCards });
    }
  };
  
  

  const handleTabClick = (index) => {
    setActiveCardIndex(index); // Set active card index on tab click
  };

  const hasCardData = (card) => {
    // Check if the card has any data
    return card.title || card.content || card.info || card.btnname || card.btnlink;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/homepage/section6", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Section updated successfully!");
        setActiveBox(7)
      } else {
        setErrorMessage(result.message || "Failed to save Section6 data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setErrorMessage("An error occurred while saving the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 shadow-inner bg-gray-50 rounded-lg  space-y-6">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel - Section 6</h2> */}

      {isLoading && <p className="text-blue-600">Loading...</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Section Heading */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Heading
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={(e) => handleInputChange("heading", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter section heading"
          />
        </div>

        {/* Section Content (Text Area) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter section content"
            rows="6"
          />
        </div>

        {/* Bottom Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bottom Text
          </label>
          <ReactQuill
            value={formData.bottomtext}
            onChange={(value) => handleInputChange("bottomtext", value)}
            className="bg-white rounded-md shadow-sm"
          />
        </div>

        {/* Cards Tabs */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cards</h3>
          <div className="flex space-x-4">
            {formData.card.map((card, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTabClick(index)}
                className={`py-2 px-4 rounded-md font-semibold flex items-center ${
                  activeCardIndex === index
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span>Card {index + 1}</span>
                <span
                  className={`ml-2 w-2.5 h-2.5 rounded-full ${
                    hasCardData(card) ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Card Content */}
          <div className="mt-6">
            {formData.card.map((card, index) =>
              activeCardIndex === index ? (
                <div
                  key={index}
                  className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4"
                >
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Card {index + 1}
                  </h4>
                  <ImageUploader referenceType={`homepage_section${index+1}`} />
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          handleCardChange(index, "title", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Enter title for Card ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <ReactQuill
                        value={card.content}
                        onChange={(value) =>
                          handleCardChange(index, "content", value)
                        }
                        className="bg-white rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Info
                      </label>
                      <ReactQuill
                        value={card.info}
                        onChange={(value) =>
                          handleCardChange(index, "info", value)
                        }
                        className="bg-white rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Name
                      </label>
                      <input
                        type="text"
                        value={card.btnname}
                        onChange={(e) =>
                          handleCardChange(index, "btnname", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Enter button name for Card ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={card.btnlink}
                        onChange={(e) =>
                          handleCardChange(index, "btnlink", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Enter button link for Card ${index + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-6 rounded-md disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Section"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSection6Panel;
