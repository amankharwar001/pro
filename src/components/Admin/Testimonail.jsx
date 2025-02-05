// import React, { useEffect, useState } from "react";
// import CommonImageUpload from "./CommonImageUpload";
// import StatusManager from "./status";

// const TestimonialManager = ({setActiveBox,sectionsStatusHandle}) => {
//   const [formData, setFormData] = useState({
//     heading: "",
//     content: "",
//     info: "",
//   }); // Form input data
//   const [message, setMessage] = useState(null); // Success/error message
//   const [apiStatus, setApiStatus] = useState(false)
//     const [multiImageStatus, setMultiImageStatus] = useState(false)
//     useEffect(() => {
//       if (apiStatus && multiImageStatus) {
//         sectionsStatusHandle(true);
//         console.log("api status in if ")
//       } else {
//         sectionsStatusHandle(false);
//         console.log("api status in else ")
  
//       }
//     }, [apiStatus,multiImageStatus]);
  

//   // Fetch Testimonial Data
//   const fetchTestimonial = async () => {
//     try {
//       const response = await fetch("/api/homepage/testimonial");
//       const data = await response.json();
//       if (data.success) {
//         setFormData(data.data); // Prepopulate form if data exists
//         setApiStatus(true)
//       } else {
//         setFormData({
//           heading: "",
//           content: "",
//           info: "",
//         }); // Reset form if no data exists
//       }
//     } catch (error) {
//       console.error("Error fetching testimonial:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonial();
//   }, []);

//   // Handle Form Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const method = formData.id ? "PUT" : "POST"; // Use PUT if data exists, otherwise POST
//       const response = await fetch("/api/homepage/testimonial", {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();

//       if (result.success) {
//         setMessage(result.message);
//         fetchTestimonial(); // Refresh data after success
//         setActiveBox(11)
//         setApiStatus(true)
//       } else {
//         setMessage(result.message || "An error occurred");
//       }
//     } catch (error) {
//       console.error("Error submitting testimonial:", error);
//       setMessage("An error occurred");
//     }
//   };

//   return (
//     <div className="p-4  mx-auto">
//       <div className='flex justify-end pb-5'>
//         <StatusManager sectionName={"homepage_section10"}/>
//       </div>
//       <CommonImageUpload referenceType={"homepage_testimonial"} imageCount={9} setMultiImageStatus={setMultiImageStatus}/>
//       {/* {message && (
//         <div className="mb-4 p-2 bg-gray-100 border rounded">
//           {message}
//         </div>
//       )} */}

//       {/* Form for Adding/Updating Testimonial */}
//       <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//         <div>
//           <label className="block text-gray-700 font-semibold">Heading:</label>
//           <input
//             type="text"
//             name="heading"
//             value={formData.heading}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-semibold">Content:</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-semibold">Info:</label>
//           <input
//             type="text"
//             name="info"
//             value={formData.info}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
//         >
//           {formData.id ? "Update" : "Add"} Testimonial
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TestimonialManager;
















































import React, { useEffect, useState } from "react";
import CommonImageUpload from "./CommonImageUpload";
import StatusManager from "./status";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TestimonialManager = ({ setActiveBox, sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    info: "",
  });
  const [message, setMessage] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);

  useEffect(() => {
    console.log("API Status:", apiStatus, "Multi Image Status:", multiImageStatus);
    sectionsStatusHandle(apiStatus && multiImageStatus);
  }, [apiStatus, multiImageStatus]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch("/api/homepage/testimonial");
      if (!response.ok) throw new Error("Failed to fetch testimonial");
      const data = await response.json();
      if (data?.success && data?.data) {
        setFormData(data.data);
        setApiStatus(true);
      } else {
        setFormData({ heading: "", content: "", info: "" });
        setApiStatus(false);
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({ ...prevData, info: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? "PUT" : "POST";
      const response = await fetch("/api/homepage/testimonial", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit testimonial");
      const result = await response.json();
      if (result.success) {
        setMessage(result.message);
        fetchTestimonial();
        setActiveBox(11);
        setApiStatus(true);
      } else {
        setMessage(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage("An error occurred");
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ color: [] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <div className="p-4 mx-auto">
      <div className="flex justify-end pb-5">
        <StatusManager sectionName={"homepage_section10"} />
      </div>
      <CommonImageUpload referenceType={"homepage_testimonial"} imageCount={9} setMultiImageStatus={setMultiImageStatus} />
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700 font-semibold">Heading:</label>
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
          <label className="block text-gray-700 font-semibold">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Info:</label>
          <ReactQuill 
            value={formData.info || ""} 
            onChange={handleQuillChange} 
            modules={quillModules} 
            className="bg-white border rounded" 
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {formData.id ? "Update" : "Add"} Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialManager;
