
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ImageUploader from "./ImageUploader";
import StatusManager from "./status";

export default function Section7Manager({ setActiveBox, sectionsStatusHandle }) {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [btn, setBtn] = useState("");
  const [btnLink, setBtnLink] = useState("");
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState({});

  useEffect(() => {
    const allImagesUploaded =
      imageStatus.homepage_section7_primary === true && imageStatus.homepage_section7_1 === true;
    if (apiStatus && allImagesUploaded) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, imageStatus]);
  
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
    async function fetchSection7() {
      try {
        const response = await fetch("/api/homepage/section7", {
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        const result = await response.json();

        if (result.success) {
          setHeading(result.data.heading);
          setContent(result.data.content);
          setBtn(result.data.btn);
          setBtnLink(result.data.btnLink);
          setIsEditMode(true);
          setApiStatus(true);
        } else {
          setMessage(result.message);
          setIsEditMode(false);
        }
      } catch (error) {
        console.error("Error fetching Section7 data:", error);
        setMessage("Failed to load Section7 data.");
      }
    }

    fetchSection7();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch("/api/homepage/section7", {
        method,
        headers: { "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
         },
        body: JSON.stringify({ heading, content: content, btn, btnLink }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Section updated successfully!');
        setMessage(result.message);
        setIsEditMode(true);
        setActiveBox(8);
        setApiStatus(true);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting Section7 data:", error);
      setMessage("Failed to update/create Section7 data.");
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-end'>
        <StatusManager sectionName={"homepage_section7"} />
      </div>
      {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      <div className="flex gap-5 items-center pb-5">
        <ImageUploader setImageStatus={(status) => setImageStatus(prevState => ({ ...prevState, homepage_section7_primary: status }))} referenceType={"homepage_section7_primary"} width={470} height={630} />
        <ImageUploader setImageStatus={(status) => setImageStatus(prevState => ({ ...prevState, homepage_section7_1: status }))} referenceType={"homepage_section7_1"} width={365} height={245} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block font-bold text-gray-700">Heading</label>
          <input type="text" id="heading" value={heading} onChange={(e) => setHeading(e.target.value)} className="border p-2 w-full rounded-md" required />
        </div>
        <div>
          <label htmlFor="content" className="block font-bold text-gray-700">Content</label>
          <ReactQuill value={content} onChange={setContent} modules={modules} className=" w-full rounded-md" />
        </div>
        <div>
          <label htmlFor="btn" className="block font-bold text-gray-700">Button Text</label>
          <input type="text" id="btn" value={btn} onChange={(e) => setBtn(e.target.value)} className="border p-2 w-full rounded-md" />
        </div>
        <div>
          <label htmlFor="btnLink" className="block font-bold text-gray-700">Button Link</label>
          <input type="text" id="btnLink" value={btnLink} onChange={(e) => setBtnLink(e.target.value)} className="border p-2 w-full rounded-md" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
          {isEditMode ? "Update Section" : "Create Section"}
        </button>
      </form>
    </div>
  );
}