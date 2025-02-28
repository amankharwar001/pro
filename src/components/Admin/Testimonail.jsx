
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import CommonImageUpload from "./CommonImageUpload";
import StatusManager from "./status";

const TestimonialManager = ({ setActiveBox, sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    info: [],
  });


  console.log("form data show is here testimonial data",formData)
  const [message, setMessage] = useState(null); // Success/error message
  const [apiStatus, setApiStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);

  useEffect(() => {
    if (apiStatus && multiImageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, multiImageStatus]);

  // Fetch Testimonial Data
  const fetchTestimonial = async () => {
    try {
      const response = await fetch("/api/homepage/testimonial");
      const data = await response.json();
      if (data.success) {
        setFormData({
          heading: data.data.heading,
          content: data.data.content,
          info: data.data.info ? JSON.parse(data.data.info) : [],
        });
        setApiStatus(true);
      } else {
        setFormData({ heading: "", content: "", info: [] });
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value, index) => {
    setFormData((prevData) => {
      const newInfo = [...prevData.info];
      newInfo[index] = value;
      return { ...prevData, info: newInfo };
    });
  };

  const addQuill = () => {
    setFormData((prevData) => ({
      ...prevData,
      info: [...prevData.info, ""],
    }));
  };

  const removeQuill = (index) => {
    setFormData((prevData) => {
      const newInfo = prevData.info.filter((_, i) => i !== index);
      return { ...prevData, info: newInfo };
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? "PUT" : "POST";
      const response = await fetch("/api/homepage/testimonial", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        fetchTestimonial();
        setActiveBox(11);
        setApiStatus(true);
      } else {
        setMessage(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="p-4 mx-auto">
      <div className='flex justify-end pb-5'>
        <StatusManager sectionName={"homepage_section10"} />
      </div>
      <CommonImageUpload referenceType={"homepage_testimonial"} imageCount={9} setMultiImageStatus={setMultiImageStatus} />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700 font-semibold">Heading:</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {formData.info.map((item, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-semibold">Info {index + 1}:</label>
            <ReactQuill
              value={item}
              onChange={(value) => handleQuillChange(value, index)}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ color: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
              className="bg-white"
            />
            <button type="button" onClick={() => removeQuill(index)} className="bg-red-500 text-white p-2 rounded mt-2">
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuill} className="bg-green-500 text-white p-2 rounded">
          Add Info
        </button>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
          {formData.id ? "Update" : "Add"} Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialManager;























