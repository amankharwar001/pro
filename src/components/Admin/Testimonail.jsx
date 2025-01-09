import React, { useEffect, useState } from "react";
import CommonImageUpload from "./CommonImageUpload";

const TestimonialManager = ({setActiveBox}) => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    info: "",
  }); // Form input data
  const [message, setMessage] = useState(null); // Success/error message

  // Fetch Testimonial Data
  const fetchTestimonial = async () => {
    try {
      const response = await fetch("/api/homepage/testimonial");
      const data = await response.json();
      if (data.success) {
        setFormData(data.data); // Prepopulate form if data exists
      } else {
        setFormData({
          heading: "",
          content: "",
          info: "",
        }); // Reset form if no data exists
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

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? "PUT" : "POST"; // Use PUT if data exists, otherwise POST
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
        fetchTestimonial(); // Refresh data after success
        setActiveBox(11)
      } else {
        setMessage(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Testimonial Manager</h1>
      <CommonImageUpload referenceType={"homepage_testimonial"} imageCount={9} />
      {message && (
        <div className="mb-4 p-2 bg-gray-100 border rounded">
          {message}
        </div>
      )}

      {/* Form for Adding/Updating Testimonial */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Heading:</label>
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
          <label className="block text-gray-700 font-medium">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Info:</label>
          <input
            type="text"
            name="info"
            value={formData.info}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {formData.id ? "Update" : "Add"} Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialManager;
