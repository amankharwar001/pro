
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CommonImageUpload from "../CommonImageUpload";
import StatusManager from "../status";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const Section2Optional = ({ productpage, setActiveBox, sectionsStatusHandle }) => {
  const [editorContent, setEditorContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);

  useEffect(() => {
    if (apiStatus && multiImageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, multiImageStatus]);

  // Fetch existing data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product/sectionproduct2optional/${productpage?.id}`, {
          headers: {
            "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEditorContent(data.title || "");
          setIsEditMode(true);
          setApiStatus(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productpage) {
      fetchData();
    }
  }, [productpage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(`/api/product/sectionproduct2optional/${productpage?.id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
        },
        body: JSON.stringify({ title: editorContent }),
      });

      if (res.ok) {
        const response = await res.json();
        alert(`Data ${isEditMode ? "updated" : "created"} successfully!`);
        setActiveBox(4);
        setApiStatus(true);
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
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section2_optional${productpage?.id}`} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-2 text-gray-700 mt-5">
            Title
          </label>
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            placeholder="Write something..."
            className="editor overflow-hidden overflow-y-auto"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
      <CommonImageUpload referenceType={`${productpage?.id}section2_top`} imageCount={8} setMultiImageStatus={setMultiImageStatus} />
      <CommonImageUpload referenceType={`${productpage?.id}section2_bottom`} imageCount={8} setMultiImageStatus={setMultiImageStatus} />
    </div>
  );
};

export default Section2Optional;