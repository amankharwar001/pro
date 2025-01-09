// import React, { useState, useEffect } from 'react';

// const SeoPage = ({page}) => {
//     const [isSEOField, setIsSEOField] = useState({
//         title: '',
//         description: '',
//         keyword: '',
//     });

//     const [validationErrors, setValidationErrors] = useState({
//         title: '',
//         description: '',
//     });
//     const API_URL =`/api/commonseo/seo?pageType=${page}`;


//     // Fetch existing SEO data on component mount
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch(API_URL, {
//                     method: 'GET',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data.');
//                 }
//                 const result = await response.json();
//                 setIsSEOField(result);
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         fetchData();
//     }, [API_URL]);

//     const handleMetaTag = (e) => {
//         const { name, value } = e.target;

//         if (name === 'keyword') {
//             let updatedValue = value
//                 .replace(/\s+/g, ',') // Replace spaces with commas
//                 .replace(/,+/g, ',')  // Remove multiple commas
//                 .replace(/^,+/, '');  // Remove leading commas

//             setIsSEOField((prevFields) => ({
//                 ...prevFields,
//                 [name]: updatedValue,
//             }));
//             return;
//         }

//         setIsSEOField((prevFields) => ({
//             ...prevFields,
//             [name]: value,
//         }));
//     };

//     const handleSubmitSeoField = async (e) => {
//         e.preventDefault();
//         const { title, description, keyword } = isSEOField;

//         const errors = {};
//         if (!title.trim()) errors.title = 'Title is required';
//         if (!description.trim()) errors.description = 'Description is required';
//         setValidationErrors(errors);

//         if (Object.keys(errors).length > 0) return;

//         const keywordsArray = keyword
//             .split(',')
//             .map((k) => k.trim())
//             .filter((k) => k);

//         const seoData = { ...isSEOField, keyword: keywordsArray };

//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(seoData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to save data.');
//             }

//             alert('SEO Data Submitted Successfully');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="p-4">
//             <form  onSubmit={handleSubmitSeoField}>
//                 {/* Title */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="title">
//                         Title:
//                     </label>
//                     <input
//                         id="title"
//                         name="title"
//                         value={isSEOField.title}
//                         onChange={handleMetaTag}
//                         className="h-8 px-2 rounded border text-para"
//                         type="text"
//                     />
//                     <span className="text-xs text-red-700">{validationErrors.title}</span>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="description">
//                         Description:
//                     </label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={isSEOField.description}
//                         onChange={handleMetaTag}
//                         className="px-2 rounded border text-para"
//                         rows={4}
//                     />
//                     <span className="text-xs text-red-700">{validationErrors.description}</span>
//                 </div>

//                 {/* Keyword */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="keyword">
//                         Keywords (comma-separated):
//                     </label>
//                     <input
//                         id="keyword"
//                         name="keyword"
//                         value={isSEOField.keyword}
//                         onChange={handleMetaTag}
//                         className="h-8 px-2 rounded border text-para"
//                         type="text"
//                     />
//                     <span className="text-xs text-gray-500">
//                         Enter keywords separated by spaces or commas.
//                     </span>
//                 </div>

//                 <button
//                     className="mt-2 w-full h-8 px-2 rounded bg-black text-white"
//                     type="submit"
//                 >
//                     Save Meta Tags
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SeoPage;










































import React, { useState, useEffect } from "react";

const SeoPage = ({ page }) => {
  const [isSEOField, setIsSEOField] = useState({
    title: "",
    description: "",
    keyword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    description: "",
  });

  const API_URL = `/api/commonseo/seo?pageType=${page}`;
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch existing SEO data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const result = await response.json();
        setIsSEOField(result);
        setIsUpdating(true); // Set to true if data exists, indicating update mode
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [API_URL]);

  const handleMetaTag = (e) => {
    const { name, value } = e.target;

    if (name === "keyword") {
      let updatedValue = value
        .replace(/\s+/g, ",") // Replace spaces with commas
        .replace(/,+/g, ",") // Remove multiple commas
        .replace(/^,+/, ""); // Remove leading commas

      setIsSEOField((prevFields) => ({
        ...prevFields,
        [name]: updatedValue,
      }));
      return;
    }

    setIsSEOField((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmitSeoField = async (e) => {
    e.preventDefault();
    const { title, description, keyword } = isSEOField;

    // Validation
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!description.trim()) errors.description = "Description is required";
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const keywordString = String(keyword || '').trim();
    const keywordsArray = keywordString
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);

    const seoData = { ...isSEOField, keyword: keywordsArray };

    try {
      const response = await fetch(API_URL, {
        method: isUpdating ? "PUT" : "POST", // Use PUT if updating, POST otherwise
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      alert("SEO Data Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmitSeoField}>
        {/* Title */}
        <div className="flex flex-col mb-2">
          <label className="text-para font-semibold" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            name="title"
            value={isSEOField.title}
            onChange={handleMetaTag}
            className="h-8 px-2 rounded border text-para"
            type="text"
          />
          <span className="text-xs text-red-700">{validationErrors.title}</span>
        </div>

        {/* Description */}
        <div className="flex flex-col mb-2">
          <label className="text-para font-semibold" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={isSEOField.description}
            onChange={handleMetaTag}
            className="px-2 rounded border text-para"
            rows={4}
          />
          <span className="text-xs text-red-700">
            {validationErrors.description}
          </span>
        </div>

        {/* Keyword */}
        <div className="flex flex-col mb-2">
          <label className="text-para font-semibold" htmlFor="keyword">
            Keywords (comma-separated):
          </label>
          <input
            id="keyword"
            name="keyword"
            value={isSEOField.keyword}
            onChange={handleMetaTag}
            className="h-8 px-2 rounded border text-para"
            type="text"
          />
          <span className="text-xs text-gray-500">
            Enter keywords separated by spaces or commas.
          </span>
        </div>

        <button
          className="mt-2 w-full h-8 px-2 rounded bg-black text-white"
          type="submit"
        >
          {isUpdating ? "Update Meta Tags" : "Save Meta Tags"}
        </button>
      </form>
    </div>
  );
};

export default SeoPage;
