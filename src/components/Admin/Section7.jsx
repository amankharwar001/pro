import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";

export default function Section7Manager({setActiveBox}) {
  const [form, setForm] = useState({
    heading: "",
    content: "",
    btn: "",
    btnLink: "",
  });
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between POST and PUT

  // Fetch Section7 data on component mount
  useEffect(() => {
    async function fetchSection7() {
      try {
        const response = await fetch("/api/homepage/section7");
        const result = await response.json();

        if (result.success) {
          setForm(result.data); // Populate the form with fetched data
          setIsEditMode(true); // Enable PUT mode if data exists
        } else {
          setMessage(result.message);
          setIsEditMode(false); // Enable POST mode if no data
        }
      } catch (error) {
        console.error("Error fetching Section7 data:", error);
        setMessage("Failed to load Section7 data.");
      }
    }

    fetchSection7();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission for POST/PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch("/api/homepage/section7", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        setMessage(result.message);
        setIsEditMode(true); // Switch to PUT mode after a successful POST
        setActiveBox(8)
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
      {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      <div className="flex gap-5 items-center pb-5">
        <ImageUploader referenceType={"homepage_section7_primary"} />
        <ImageUploader referenceType={"homepage_section7_1"} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Heading */}
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

        {/* Content */}
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

        {/* Button Text */}
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

        {/* Button Link */}
        <div>
          <label htmlFor="btnLink" className="block font-medium">Button Link</label>
          <input
            type="url"
            id="btnLink"
            name="btnLink"
            value={form.btnLink}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditMode ? "Update Section" : "Create Section"}
        </button>
      </form>
    </div>
  );
}
