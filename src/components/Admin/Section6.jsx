import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "./ImageUploader";
import StatusManager from "./status";
import { IoMdAdd } from "react-icons/io";


const AdminSection6Panel = ({ setActiveBox, sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    bottomtext: "",
    card: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState({});

  const updateImageStatus = (index, status) => {
    setImageStatus((prevStatus) => ({
      ...prevStatus,
      [`card_${index}`]: status,
    }));
  };
  useEffect(() => {
    const allImagesUploaded = Object.values(imageStatus).every(status => status === true);
    if (apiStatus && allImagesUploaded) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, imageStatus]);

  useEffect(() => {
    const fetchSectionData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/homepage/section6");
        const result = await response.json();
        if (result.success && result.data) {
          setFormData({
            ...result.data,
            card: result.data.card || [], // Allow dynamic number of cards
          });
          setApiStatus(true);
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
    const updatedCards = [...formData.card];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData({ ...formData, card: updatedCards });
  };

  const handleTabClick = (index) => {
    setActiveCardIndex(index); // Set active card index on tab click
  };

  const handleDeleteCard = (index) => {
    const updatedCards = formData.card.filter((_, idx) => idx !== index);
    setFormData({ ...formData, card: updatedCards });
    if (activeCardIndex >= updatedCards.length) {
      setActiveCardIndex(updatedCards.length - 1); // Ensure the active card index is within bounds
    }
  };

  const hasCardData = (card) => {
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
        setActiveBox(7);
        setApiStatus(true);
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

  // Function to add a new card
  const handleAddCard = () => {
    const newCard = { title: "", content: "", info: "", btnname: "", btnlink: "" };
    setFormData((prevData) => ({
      ...prevData,
      card: [...prevData.card, newCard],
    }));
    setActiveCardIndex(formData.card.length); // Set active card to the newly added card
  };

  return (
    <div className="p-4 shadow-inner bg-gray-50 rounded-lg space-y-6">
      <div className='flex justify-end '>
        <StatusManager sectionName={"homepage_section6"} />
      </div>
      {/* {isLoading && <p className="text-blue-600">Loading...</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>} */}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Section Heading */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">
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
          <div className="relative">

            <div className="flex space-x-4 items-center sticky top-[130px] bg-gray-50 z-20 pl-5 py-2">
              {formData.card.map((card, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={`py-2 px-4 rounded-md font-semibold flex items-center border border-gray-500  ${activeCardIndex === index
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  <span className="text-xs">Card {index + 1}</span>
                  <span
                    className={`ml-2 w-2.5 h-2.5 rounded-full ${hasCardData(card) ? "bg-green-500" : "bg-red-500"
                      }`}
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={handleAddCard}
                className="py-2 px-4 rounded-md bg-gray-500 hover:bg-red-700 text-white font-semibold"
              >
                <span className="text-xs flex items-center gap-1 "><IoMdAdd/> Card</span>
                
              </button>
            </div>

            {/* Card Content */}
            <div className="mt-6 px-5">
              {formData.card.map((card, index) =>
                activeCardIndex === index ? (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4"
                  >
                    <h4 className="text-md font-medium text-gray-700 mb-2">
                      Card {index + 1}
                    </h4>
                    <ImageUploader setImageStatus={(status) => updateImageStatus(index, status)} referenceType={`homepage_section6_${index + 1}`} width={421} height={260} />
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => handleCardChange(index, "title", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={`Enter title for Card ${index + 1}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Content
                        </label>
                        <ReactQuill
                          value={card.content}
                          onChange={(value) => handleCardChange(index, "content", value)}
                          className="bg-white rounded-md shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Info
                        </label>
                        <ReactQuill
                          value={card.info}
                          onChange={(value) => handleCardChange(index, "info", value)}
                          className="bg-white rounded-md shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Button Name
                        </label>
                        <input
                          type="text"
                          value={card.btnname}
                          onChange={(e) => handleCardChange(index, "btnname", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={`Enter button name for Card ${index + 1}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={card.btnlink}
                          onChange={(e) => handleCardChange(index, "btnlink", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={`Enter button link for Card ${index + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(index)}
                        className="mt-2 text-red-500"
                      >
                        Delete Card {index+1}
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
             className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
          >
            {isLoading ? "Saving..." : "Save Section"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSection6Panel;
