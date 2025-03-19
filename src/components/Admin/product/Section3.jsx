
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const Section3Form = ({ productpage, setActiveBox, sectionsStatusHandle }) => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState([
    { title: "", content: "" },
    { title: "", content: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatuses, setImageStatuses] = useState({});

  const handleImageStatusChange = (id, status) => {
    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: status,
    }));
  };

  useEffect(() => {
    const allUploaded = Object.values(imageStatuses).every((status) => status === true);
    sectionsStatusHandle(apiStatus && allUploaded);
  }, [apiStatus, imageStatuses]);

  useEffect(() => {
    const fetchData = async () => {
      if (!productpage?.id) return;
      try {
        const res = await fetch(`/api/product/sectionproduct3/${productpage.id}`, {
          headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        });
        if (res.ok) {
          const data = await res.json();
          setHeading(data.heading || "");
          setText(data.text || "");
          setInfo(data.info || info);
          setIsEditMode(true);
          setApiStatus(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productpage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(`/api/product/sectionproduct3/${productpage?.id}`, {
        method,
        headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        body: JSON.stringify({ heading, text, info }),
      });
      if (res.ok) {
        alert(`Data ${isEditMode ? "updated" : "created"} successfully!`);
        setApiStatus(true);
        setActiveBox(5);
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

  const handleInfoChange = (index, field, value) => {
    const updatedInfo = [...info];
    updatedInfo[index][field] = value;
    setInfo(updatedInfo);
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section3${productpage?.id}`} />
      </div>
      <ImageUploader referenceType={productpage?.id} referenceId={3} width={550} height={300} setImageStatus={(status) => handleImageStatusChange(3, status)} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-4">
          <label className="block font-semibold text-sm text-gray-700 mb-2">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-sm text-gray-700 mb-2">Text</label>
          <ReactQuill value={text} onChange={setText} modules={modules} className="bg-white" />
        </div>

        {info.map((item, index) => (
          <div key={index} className="mb-4">
            <ImageUploader
              referenceType={productpage?.id}
              referenceId={index + 31}
              width={25}
              height={25}
              setImageStatus={(status) => handleImageStatusChange(index + 31, status)}
            />
            <label className="block font-semibold text-sm text-gray-700 mb-2">Info {index + 1}</label>
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleInfoChange(index, "title", e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              placeholder="Content"
              value={item.content}
              onChange={(e) => handleInfoChange(index, "content", e.target.value)}
              className="w-full border p-2 rounded"
              rows="2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Section3Form;
