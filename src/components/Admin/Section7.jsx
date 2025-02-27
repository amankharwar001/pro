import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import StatusManager from "./status";

export default function Section7Manager({setActiveBox,sectionsStatusHandle}) {
  const [form, setForm] = useState({
    heading: "",
    content: "",
    btn: "",
    btnLink: "",
  });
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between POST and PUT
    const [apiStatus, setApiStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState({}); 
    
  
   useEffect(() => {
    const allImagesUploaded =
            imageStatus.homepage_section7_primary === true && imageStatus.homepage_section7_1 === true;
      if (apiStatus && allImagesUploaded) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatus]); 

  // Fetch Section7 data on component mount
  useEffect(() => {
    async function fetchSection7() {
      try {
        const response = await fetch("/api/homepage/section7");
        const result = await response.json();

        if (result.success) {
          setForm(result.data); // Populate the form with fetched data
          setIsEditMode(true); // Enable PUT mode if data exists
          setApiStatus(true)
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
        setApiStatus(true)
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
      <div className='flex justify-end '>
        <StatusManager sectionName={"homepage_section7"}/>
      </div>
      {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      <div className="flex gap-5 items-center pb-5">
        <ImageUploader setImageStatus={(status) => setImageStatus(prevState => ({ ...prevState, homepage_section7_primary: status }))} referenceType={"homepage_section7_primary"} width={470} height={630} />
        <ImageUploader setImageStatus={(status) => setImageStatus(prevState => ({ ...prevState, homepage_section7_1: status }))} referenceType={"homepage_section7_1"} width={365} height={245} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Heading */}
        <div>
          <label htmlFor="heading" className="block font-bold text-gray-700">Heading</label>
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

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-bold text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>

        {/* Button Text */}
        <div>
          <label htmlFor="btn" className="block font-bold text-gray-700">Button Text</label>
          <input
            type="text"
            id="btn"
            name="btn"
            value={form.btn}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            
          />
        </div>

        {/* Button Link */}
        <div>
          <label htmlFor="btnLink" className="block font-bold text-gray-700">Button Link</label>
          <input
            type="url"
            id="btnLink"
            name="btnLink"
            value={form.btnLink}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
           className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {isEditMode ? "Update Section" : "Create Section"}
        </button>
      </form>
    </div>
  );
}
