// import React, { useState, useEffect } from "react";
// import ImageUploader from "../ImageUploader";
// import StatusManager from "../status";

// export default function Section5Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [data, setData] = useState({
//     heading: "",
//     text: "",
//     info: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [imageStatuses, setImageStatuses] = useState({});

//   const handleImageStatusChange = (id, status) => {
//     setImageStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [id]: status,
//     }));
//   };

//   useEffect(() => {
//     const allUploaded = Object.values(imageStatuses).every((status) => status === true);
//     sectionsStatusHandle(apiStatus && allUploaded);
//   }, [apiStatus, imageStatuses]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`,{
//           headers: {
//            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result);
//         setIsEditing(true);
//         setApiStatus(true);
//       } catch (err) {
//         setError(err.message);
//         setIsEditing(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productpage?.id) {
//       fetchData();
//     }
//   }, [productpage?.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInfoChange = (index, field, value) => {
//     setData((prev) => {
//       const updatedInfo = [...prev.info];
//       updatedInfo[index][field] = value;
//       return { ...prev, info: updatedInfo };
//     });
//   };

//   const handleAddInfo = () => {
//     setData((prev) => ({
//       ...prev,
//       info: [...prev.info, { title: "", content: "" }],
//     }));
//   };

//   const handleDeleteInfo = (index) => {
//     setData((prev) => ({
//       ...prev,
//       info: prev.info.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const method = isEditing ? "PUT" : "POST";
//       const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`, {
//         method,
//         headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save data");
//       }

//       const result = await response.json();
//       setData(result);
//       alert(`Data ${isEditing ? "updated" : "created"} successfully!`);
//       setActiveBox(6);
//       setApiStatus(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border bg-gray-50 shadow-inner rounded">
//       <div className="flex justify-end">
//         <StatusManager sectionName={`product_section5${productpage?.id}`} />
//       </div>
//       <ImageUploader referenceType={productpage?.id} referenceId={5} width={450} height={610} setImageStatus={(status) => handleImageStatusChange(5, status)} />

//       {!loading && (
//         <form className="space-y-4 mt-4">
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Heading</label>
//             <input type="text" name="heading" value={data.heading} onChange={handleChange} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Text</label>
//             <textarea name="text" value={data.text} onChange={handleChange} className="w-full p-2 border rounded" rows="4" />
//           </div>
//           <div>
//             <h2 className="text-sm font-semibold text-gray-700">Info</h2>
//             {data.info.map((item, index) => (
//               <div key={index} className="border p-4 rounded mb-4 shadow-md bg-white">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold">Info {index + 1}</h3>
//                   <button type="button" onClick={() => handleDeleteInfo(index)} className="text-red-500 text-sm hover:underline">
//                     Delete
//                   </button>
//                 </div>
//                 <ImageUploader referenceType={productpage?.id} referenceId={index + 51} width={50} height={50} setImageStatus={(status) => handleImageStatusChange(index + 51, status)} />
//                 <label className="block font-medium">Title</label>
//                 <input type="text" value={item.title} onChange={(e) => handleInfoChange(index, "title", e.target.value)} className="w-full p-2 border rounded" />
//                 <label className="block font-medium">Content</label>
//                 <textarea value={item.content} onChange={(e) => handleInfoChange(index, "content", e.target.value)} className="w-full p-2 border rounded" rows="2" />
//               </div>
//             ))}
//             <button type="button" onClick={handleAddInfo} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2">
//               Add Info
//             </button>
//           </div>
//           <button type="button" onClick={handleSave} className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
//             {isEditing ? "Update" : "Create"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Section5Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [data, setData] = useState({
    heading: "",
    text: "",
    info: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatuses, setImageStatuses] = useState({});

  const handleImageStatusChange = (id, status) => {
    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: status,
    }));
  };

  useEffect(() => {
    const allUploaded = Object.values(imageStatuses).every((status) => status === true);
    sectionsStatusHandle(apiStatus && allUploaded);
  }, [apiStatus, imageStatuses]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`, {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setIsEditing(true);
        setApiStatus(true);
      } catch (err) {
        setError(err.message);
        setIsEditing(false);
      } finally {
        setLoading(false);
      }
    };
    if (productpage?.id) {
      fetchData();
    }
  }, [productpage?.id]);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoChange = (index, field, value) => {
    setData((prev) => {
      const updatedInfo = [...prev.info];
      updatedInfo[index][field] = value;
      return { ...prev, info: updatedInfo };
    });
  };

  const handleAddInfo = () => {
    setData((prev) => ({
      ...prev,
      info: [...prev.info, { title: "", content: "" }],
    }));
  };

  const handleDeleteInfo = (index) => {
    setData((prev) => ({
      ...prev,
      info: prev.info.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(`/api/product/sectionproduct5/${productpage?.id}`, {
        method,
        headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      setData(result);
      alert(`Data ${isEditing ? "updated" : "created"} successfully!`);
      setActiveBox(6);
      setApiStatus(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border bg-gray-50 shadow-inner rounded">
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section5${productpage?.id}`} />
      </div>
      <ImageUploader referenceType={productpage?.id} referenceId={5} width={450} height={610} setImageStatus={(status) => handleImageStatusChange(5, status)} />

      {!loading && (
        <form className="space-y-4 mt-4">
          <div>
            <label className="block text-sm text-gray-700 font-semibold">Heading</label>
            <input type="text" name="heading" value={data.heading} onChange={(e) => handleChange("heading", e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-semibold">Text</label>
            <ReactQuill theme="snow" value={data.text} onChange={(value) => handleChange("text", value)} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Info</h2>
            {data.info.map((item, index) => (
              <div key={index} className="border p-4 rounded mb-4 shadow-md bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Info {index + 1}</h3>
                  <button type="button" onClick={() => handleDeleteInfo(index)} className="text-red-500 text-sm hover:underline">
                    Delete
                  </button>
                </div>
                <ImageUploader referenceType={productpage?.id} referenceId={index + 51} width={50} height={50} setImageStatus={(status) => handleImageStatusChange(index + 51, status)} />
                <label className="block font-medium">Title</label>
                <input type="text" value={item.title} onChange={(e) => handleInfoChange(index, "title", e.target.value)} className="w-full p-2 border rounded" />
                <label className="block font-medium">Content</label>
                <ReactQuill theme="snow" value={item.content} onChange={(value) => handleInfoChange(index, "content", value)} />
              </div>
            ))}
            <button type="button" onClick={handleAddInfo} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2">
              Add Info
            </button>
          </div>
          <button type="button" onClick={handleSave} className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>
      )}
    </div>
  );
}
