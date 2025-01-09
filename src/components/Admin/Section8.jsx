import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import CommonImageUpload from "./CommonImageUpload";

const Section8Page = ({setActiveBox}) => {
  const [sectionData, setSectionData] = useState({
    heading: "",
    content: "",
    btn: "",
    btnLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the current data for Section8 (GET request)
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const res = await fetch("/api/homepage/section8");
        const data = await res.json();

        if (data.success) {
          setSectionData(data.data);
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

  // Handle the form submission for creating or updating a section (POST or PUT request)
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { heading, content, btn, btnLink } = sectionData;

    if (!heading || !content || !btn || !btnLink) {
      setMessage("All fields (heading, content, btn, btnLink) are required.");
      setLoading(false);
      return;
    }

    try {
      const res = sectionData.id
        ? await fetch("/api/homepage/section8", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sectionData),
        })
        : await fetch("/api/homepage/section8", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sectionData),
        });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setSectionData(data.data); // Update state with the new/updated data
        setActiveBox(9)
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error updating/creating data:", error);
      setMessage("An error occurred while saving the data.");
    }

    setLoading(false);
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Manage Section 8</h1> */}
      <div className="flex gap-5 items-center">
        <ImageUploader referenceType={"homepage_section_8_primary"} />
        <div className="grow">

        <CommonImageUpload referenceType={"homepage_section_8"} imageCount={2} />
        </div>
      </div>

      {message && (
        <div
          className={`p-4 mb-4 text-white rounded-md ${message.includes("error") ? "bg-red-600" : "bg-green-600"
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
            Heading
          </label>
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
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={sectionData.content}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full"
            rows="4"
            placeholder="Enter content for this section"
          />
        </div>

        <div>
          <label htmlFor="btn" className="block text-sm font-medium text-gray-700">
            Button Text
          </label>
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
          <label htmlFor="btnLink" className="block text-sm font-medium text-gray-700">
            Button Link
          </label>
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
            className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Saving..." : sectionData.id ? "Update Section" : "Create Section"}
          </button>
        </div>
      </form>


    </div>
  );
};

export default Section8Page;
