
import { useState, useEffect } from "react";
import ImageUploader from './ImageUploader';

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
        const response = await fetch("/api/homepage/section11");
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
        headers: { "Content-Type": "application/json" },
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
      <h1 className="text-2xl font-bold mb-4">Section 11 Manager</h1>

      {/* ImageUploader will be shown only if sectionData is loaded */}

      <ImageUploader referenceType={"homepage_section_11_primary"} width={62} height={52} setImageStatus={setImageStatus} />


      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block font-medium">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={form.heading}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="btn" className="block font-medium">Button Text</label>
          <input
            type="text"
            id="btn"
            name="btn"
            value={form.btn}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="btnLink" className="block font-medium">Button Link</label>
          <input
            type="text"
            id="btnLink"
            name="btnLink"
            value={form.btnLink}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update Section" : "Create Section"}
        </button>
      </form>
    </div>
  );
}
