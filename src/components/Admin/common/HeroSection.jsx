// HeroSectionForm.js
import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";

const HeroSectionForm = ({ onSubmitId, url,referencetype,setActiveBox }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    heading: "",
    text: "",
    btn: "",
    btnLink: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/${url}`);
        if (res.ok) {
          const response = await res.json();
          if (response.data) {
            setFormData({ ...response.data, id: response.data._id });
          }
        } else {
          console.error("Failed to fetch data", await res.text());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]); // Fetch when the `url` prop changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const response = await res.json();
        alert(`Data ${formData.id ? "updated" : "created"} successfully!`);
        setActiveBox(2)
        onSubmitId(response?.data?._id);
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded flex flex-row-reverse gap-10 items-center">
      <div>
        <span className="font-bold text-xs">Hero Section Image</span>
        <div className="bg-slate-100 p-4 rounded-md mt-2">
          <ImageUploader referenceType={referencetype} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-medium mb-1 text-xs">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Button Text</label>
          <input
            type="text"
            name="btn"
            value={formData.btn}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Button Link</label>
          <input
            type="text"
            name="btnLink"
            value={formData.btnLink}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-adminbtn text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : formData.title ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default HeroSectionForm;
