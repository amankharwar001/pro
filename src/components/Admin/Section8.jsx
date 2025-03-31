import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ImageUploader from "./ImageUploader";
import CommonImageUpload from "./CommonImageUpload";
import StatusManager from "./status";

const Section8Page = ({ setActiveBox, sectionsStatusHandle }) => {
  const [sectionData, setSectionData] = useState({
    heading: "",
    content: "",
    btn: "",
    btnLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (apiStatus && imageStatus && multiImageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, imageStatus, multiImageStatus]);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const res = await fetch("/api/homepage/section8", {
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        const data = await res.json();

        if (data.success) {
          setSectionData(data.data);
          setApiStatus(true);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data.");
      }
    };
    fetchSectionData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const res = sectionData.id
        ? await fetch("/api/homepage/section8", {
            method: "PUT",
            headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
            body: JSON.stringify(sectionData),
          })
        : await fetch("/api/homepage/section8", {
            method: "POST",
            headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
            body: JSON.stringify(sectionData),
          });

      const data = await res.json();
      if (data.success) {
        alert('Section updated successfully!');
        setMessage(data.message);
        setSectionData(data.data);
        setActiveBox(9);
        setApiStatus(true);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error updating/creating data:", error);
      setMessage("An error occurred while saving the data.");
    }

    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setSectionData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  return (
    <div className="p-4">
      <div className='flex justify-end pb-5'>
        <StatusManager sectionName={"homepage_section8"} />
      </div>
      <div className="flex flex-wrap gap-5 items-center">
        <ImageUploader referenceType={"homepage_section_8_primary"} width={497} height={642} setImageStatus={setImageStatus} />
        <div className="grow">
          <CommonImageUpload referenceType={"homepage_section_8"} imageCount={2} setMultiImageStatus={setMultiImageStatus} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heading" className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            id="heading"
            type="text"
            name="heading"
            value={sectionData.heading}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter section heading"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Content</label>
          <ReactQuill
            value={sectionData.content}
            onChange={handleContentChange}
            modules={modules}
            className="mt-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="btn" className="block text-sm font-semibold text-gray-700">Button Text</label>
          <input
            id="btn"
            type="text"
            name="btn"
            value={sectionData.btn}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter button text"
          />
        </div>

        <div>
          <label htmlFor="btnLink" className="block text-sm font-semibold text-gray-700">Button Link</label>
          <input
            id="btnLink"
            type="text"
            name="btnLink"
            value={sectionData.btnLink}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            placeholder="Enter button link"
          />
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
          >
            {loading ? "Saving..." : sectionData.id ? "Update Section" : "Create Section"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Section8Page;
