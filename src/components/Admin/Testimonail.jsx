import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import CommonImageUpload from "./CommonImageUpload";
import StatusManager from "./status";
import ImageUploader from "./ImageUploader";
// jkh

const TestimonialManager = ({ setActiveBox, sectionsStatusHandle }) => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [info, setInfo] = useState([]);
  const [message, setMessage] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false)

  useEffect(() => {
    if (apiStatus && multiImageStatus && imageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, multiImageStatus]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch("/api/homepage/testimonial", {
        headers: {
         'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
        },
      });
      const data = await response.json();
      if (data.success) {
        setHeading(data.data.heading || "");
        setContent(data.data.content || "");
        setInfo(Array.isArray(data.data.info) ? data.data.info : []); // Ensure `info` is always an array
        setApiStatus(true);
      } else {
        setHeading("");
        setContent("");
        setInfo([]);
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        heading,
        content,
        info: Array.isArray(info) ? info : [], // Ensure `info` is an array
      };

      const method = apiStatus ? "PUT" : "POST"; // Use PUT if data exists, else POST

      const response = await fetch("/api/homepage/testimonial", {
        method,
        headers: { "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
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

  const handleQuillChange = (value, index) => {
    setInfo((prevInfo) => {
      const newInfo = [...prevInfo];
      newInfo[index] = value;
      return newInfo;
    });
  };

  const addQuill = () => setInfo([...info, ""]);
  const removeQuill = (index) => setInfo(info.filter((_, i) => i !== index));

  return (
    <div className="p-4 mx-auto">
      <div className="flex justify-end pb-5">
        <StatusManager sectionName={"homepage_section10"} />
      </div>
      <div className="flex justify-between">
      <ImageUploader referenceType={"homepage_testimonial_primary"} width={1920} height={750} setImageStatus={setImageStatus}/>
      <CommonImageUpload referenceType={"homepage_testimonial"} imageCount={8} setMultiImageStatus={setMultiImageStatus} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700 font-semibold">Heading:</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {info.map((item, index) => (
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
          {apiStatus ? "Update" : "Add"} Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialManager;
