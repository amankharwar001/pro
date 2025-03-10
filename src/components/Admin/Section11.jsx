
import { useState, useEffect } from "react";
import ImageUploader from './ImageUploader';
import StatusManager from "./status";

export default function Section11Manager({ setActiveBox, sectionsStatusHandle }) {
  const [sectionData, setSectionData] = useState(null);
  const [form, setForm] = useState({
    heading: "",
    content: "",
    btn: "",
    btnLink: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
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
    async function fetchSectionData() {
      try {
        const response = await fetch("/api/homepage/section11", {
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        const result = await response.json();

        if (result.success) {
          setSectionData(result.data);
          setForm(result.data); // Prefill form with fetched data for editing
          setIsEditing(true); // Mark as editing if data exists
          setApiStatus(true)
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
        setMessage("Failed to load section data.");
      }
    }

    fetchSectionData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch("/api/homepage/section11", {
        method,
        headers: { "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
         },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        setSectionData(result.data);
        setMessage(result.message);
        setIsEditing(true); // Switch to editing mode
        setActiveBox(12); // Move to next box
        setApiStatus(true)
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to submit form.");
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-end '>
        <StatusManager sectionName={"homepage_section11"}/>
      </div>

      {/* ImageUploader will be shown only if sectionData is loaded */}

      <ImageUploader referenceType={"homepage_section_11_primary"} width={62} height={52} setImageStatus={setImageStatus} />


      {/* {message && <p className="text-red-500 mb-4">{message}</p>} */}

      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div>
          <label htmlFor="heading" className="block font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={form.heading}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="btn" className="block font-semibold text-gray-700">Button Text</label>
          <input
            type="text"
            id="btn"
            name="btn"
            value={form.btn}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            
          />
        </div>
        <div>
          <label htmlFor="btnLink" className="block font-semibold text-gray-700">Button Link</label>
          <input
            type="text"
            id="btnLink"
            name="btnLink"
            value={form.btnLink}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            
          />
        </div>
        <button
          type="submit"
           className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {isEditing ? "Update Section" : "Create Section"}
        </button>
      </form>
    </div>
  );
}
