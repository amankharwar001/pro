import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
const HeroSectionForm = ({ productpage, onSubmitId,setActiveBox,sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    nickname:"",
    title: "",
    heading: "",
    text: "",
    btn: "",
    btnLink: "",
  });
  const router = useRouter();
  const { edit } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if data already exists
  const [apiStatus, setApiStatus] = useState(false)
  const [imageStatus, setImageStatus] = useState(false)

    
  
   useEffect(() => {
      if (apiStatus && imageStatus) {
        sectionsStatusHandle(true);
      }
    }, [apiStatus, imageStatus]); 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = productpage ? `/api/product/productpage/${productpage?.id}` : '';
        const res = await fetch(endpoint,{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        }); 
        if (res.ok) {
          const data = await res.json();
          setFormData(data); 
          setIsEditMode(true);
          setApiStatus(true)
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (productpage?.id) { 
      fetchData();
    }
  }, [productpage]); 
  

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
      const endpoint = productpage ? `/api/product/productpage/${productpage?.id}` : '/api/product/productpage/addsection';
      const method = isEditMode ? "PUT" : "POST"; // Use PUT if data exists, otherwise POST
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const response = await res.json();
        onSubmitId(response?.id)
        setActiveBox(2)
        setApiStatus(true)
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
    <div className=" mx-auto p-4 border bg-gray-50 shadow-inner rounded  md:flex flex-row-reverse gap-10 items-center">
      {/* <h1 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Hero Section" : "Create Hero Section"}
      </h1> */}
      {isEditMode ?
        <div>
          <span className="font-bold text-xs">Hero Section Image</span>
          <div className="bg-slate-100 p-4 rounded-md mt-2">
            <ImageUploader referenceType={productpage?.id} width={1920} height={750} setImageStatus={setImageStatus} setActiveProductBox={setActiveBox}/>
          </div>
        </div>
        : ""
      }
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Product Name</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            
          />
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Heading</label>
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
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            rows="3"
            
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Button Text</label>
          <input
            type="text"
            name="btn"
            value={formData.btn}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
           
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm ">Button Link</label>
          <input
            type="text"
            name="btnLink"
            value={formData.btnLink}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            
          />
        </div>
        <button
          type="submit"
          className="w-full bg-adminbtn text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default HeroSectionForm;
