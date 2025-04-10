


import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";

const CreatePageHeroSectionForm = ({ page, onSubmitId, setActiveBox, sectionsStatusHandle }) => {
  const router = useRouter();
  const { edit } = router.query;

  const [formData, setFormData] = useState({
    sectionType: "",
    nickname: "",
    title: "",
    heading: "",
    text: "",
    btn: "",
    btnLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);

  useEffect(() => {
    if (apiStatus) {
      sectionsStatusHandle(true);
    }
  }, [apiStatus, imageStatus]);

  useEffect(() => {
    if (!page) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/create-page/herosection/${page}`, {
          headers: {
            "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
          setIsEditMode(true);
          setApiStatus(true);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const endpoint = `/api/create-page/herosection/${page}`;
  //     const method = isEditMode ? "PUT" : "POST";

  //     const res = await fetch(endpoint, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
  //       },
  //       body: JSON.stringify({ ...formData, id: page }),
  //     });

  //     if (res.ok) {
  //       const response = await res.json();
  //       alert(`handle submit show is here`);
  //       onSubmitId(response?.id);
  //       setActiveBox(2);
  //       setApiStatus(true);
  //       router.reload();
  //     } else {
  //       const error = await res.json();
  //       alert(`Error: ${error.error}`);
  //     }
  //   } catch (error) {
  //     console.warn("Failed to submit data. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = `/api/create-page/herosection/${page}`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
        },
        body: JSON.stringify({ ...formData, id: page }),
      });

      if (res.ok) {
        const response = await res.json();
        alert(`saved successfully!`);
        onSubmitId(response?.id);
        setActiveBox(2);
        setApiStatus(true);

        // 👇 Reload the page
        router.reload();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.warn("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 border bg-gray-50 shadow-inner rounded md:flex flex-row-reverse gap-10 items-center">
      <div>
        <span className="font-bold text-xs">Hero Section Image</span>
        <div className="bg-slate-100 p-4 rounded-md mt-2">
          <ImageUploader
            referenceType={page}
            width={1920}
            height={750}
            setImageStatus={setImageStatus}
            setActiveProductBox={setActiveBox}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Select Box */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm">Section Type</label>
          <select
            name="sectionType"
            value={formData.sectionType}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          >
            <option value="">Select Section</option>
            <option value="footer">Footer</option>
            <option value="page">Page</option>
          </select>
        </div>

        {/* Input Fields */}
        {/* {["nickname", "title", "heading", "btn", "btnLink"].map((field) => (
          <div key={field}>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-1 px-2 rounded"
            />
          </div>
        ))} */}
        {["nickname", "title", "heading", "btn", "btnLink"].map((field) => (
          <div key={field}>
            <label className="block font-semibold text-gray-700 mb-1 text-sm">
              {field === "nickname" ? "Layout Name" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-1 px-2 rounded"
            />
          </div>
        ))}


        {/* Text Area */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-adminbtn text-white py-2 rounded" disabled={isLoading}>
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePageHeroSectionForm;
