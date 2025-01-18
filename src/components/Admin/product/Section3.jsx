
import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";

const Section3Form = ({ productpage,setActiveBox,sectionsStatusHandle }) => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState([
    { title: "", content: "" }, // Default empty entries
    { title: "", content: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch existing data based on productpage?.id
  useEffect(() => {
    const fetchData = async () => {
      if (!productpage?.id) return; // Exit if no productpage ID

      try {
        const res = await fetch(`/api/product/sectionproduct3/${productpage.id}`); // Fetch data with dynamic productpage.id
        if (res.ok) {
          const data = await res.json();
          setHeading(data.heading || "");
          setText(data.text || "");
          setInfo(data.info || info); // Use the existing data or defaults
          setIsEditMode(true); // Enable edit mode if data exists
        }
        sectionsStatusHandle(true)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productpage, info]); // Re-run on productpage change

  // Handle form submission for creating or updating data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = isEditMode ? "PUT" : "POST"; // Use PUT to update, POST to create
      const res = await fetch(`/api/product/sectionproduct3/${productpage?.id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, text, info }),
      });

      if (res.ok) {
        const response = await res.json();
        alert(`Data ${isEditMode ? "updated" : "created"} successfully!`);

        setActiveBox(4)
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

  // Handle changes in info fields (title and content)
  const handleInfoChange = (index, field, value) => {
    const updatedInfo = [...info];
    updatedInfo[index][field] = value;
    setInfo(updatedInfo);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Section 3 Product" : "Create Section 3 Product"}
      </h1>
      <ImageUploader referenceType={productpage?.id} referenceId={3} width={550} height={300} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
            required
          />
        </div>

        {info.map((item, index) => (
          <div key={index} className="mb-4">
            <ImageUploader
              key={index}
              referenceType={productpage?.id}
              referenceId={index + 31}
              width={25} height={25}
              
            />
            <label className="block font-medium mb-2">Info {index + 1}</label>
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleInfoChange(index, "title", e.target.value)}
              className="w-full border p-2 rounded mb-2"
              required
            />
            <textarea
              placeholder="Content"
              value={item.content}
              onChange={(e) => handleInfoChange(index, "content", e.target.value)}
              className="w-full border p-2 rounded"
              rows="2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Section3Form;
