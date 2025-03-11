// import React, { useState, useEffect } from "react";
// import ImageUploader from "../ImageUploader";
// import StatusManager from "../status";

// export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [forms, setForms] = useState([{ heading: "", text: "" }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [imageStatus, setImageStatus] = useState(false);

//   useEffect(() => {
//     if (apiStatus && imageStatus) {
//       sectionsStatusHandle(true);
//     } else {
//       sectionsStatusHandle(false);
//     }
//   }, [apiStatus, imageStatus]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`,{
//           headers: {
//            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
//           },
//         }
// );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setForms(result.section4?.length ? result.section4 : [{ heading: "", text: "" }]);
//         setApiStatus(true);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productpage?.id) {
//       fetchData();
//     }
//   }, [productpage?.id]);

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     setForms((prev) => {
//       const newForms = [...prev];
//       newForms[index][name] = value;
//       return newForms;
//     });
//   };

//   const handleAddForm = () => {
//     setForms([...forms, { heading: "", text: "" }]);
//   };

//   const handleDeleteForm = (index) => {
//     setForms((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSave = async () => {
//     if (!productpage?.id) {
//       alert("Invalid Section ID!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const method = apiStatus ? "PUT" : "POST";
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method,
//         headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, },
//         body: JSON.stringify({ section4: forms }),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.error || "Failed to save data");
//       }

//       alert(`Data ${method === "POST" ? "created" : "updated"} successfully!`);
//       setActiveBox(5);
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
//         <StatusManager sectionName={`product_section4${productpage?.id}`} />
//       </div>
//       {forms.map((item, index) => (
//         <div key={index} className="mb-6">
//           <ImageUploader referenceType={productpage?.id} referenceId={41+index} width={550} height={300} setImageStatus={setImageStatus} />
//           <form className="space-y-4 mt-4">
//             <div>
//               <label className="block text-sm text-gray-700 font-semibold">Heading</label>
//               <input
//                 type="text"
//                 name="heading"
//                 value={item.heading}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-700 font-semibold">Text</label>
//               <textarea
//                 name="text"
//                 value={item.text}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border rounded"
//                 rows="4"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => handleDeleteForm(index)}
//               className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </form>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={handleAddForm}
//         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
//       >
//         Add Section
//       </button>

//       <button
//         type="button"
//         onClick={handleSave}
//         className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
//       >
//         Save All
//       </button>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [forms, setForms] = useState([{ heading: "", text: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);

  useEffect(() => {
    if (apiStatus && imageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, imageStatus]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setForms(result.section4?.length ? result.section4 : [{ heading: "", text: "" }]);
        setApiStatus(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (productpage?.id) {
      fetchData();
    }
  }, [productpage?.id]);

  const handleChange = (index, name, value) => {
    setForms((prev) => {
      const newForms = [...prev];
      newForms[index][name] = value;
      return newForms;
    });
  };

  const handleAddForm = () => {
    setForms([...forms, { heading: "", text: "" }]);
  };

  const handleDeleteForm = (index) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!productpage?.id) {
      alert("Invalid Section ID!");
      return;
    }

    setLoading(true);
    try {
      const method = apiStatus ? "PUT" : "POST";
      const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
        method,
        headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        body: JSON.stringify({ section4: forms }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save data");
      }

      alert(`Data ${method === "POST" ? "created" : "updated"} successfully!`);
      setActiveBox(5);
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
        <StatusManager sectionName={`product_section4${productpage?.id}`} />
      </div>
      {forms.map((item, index) => (
        <div key={index} className="mb-6">
          <ImageUploader referenceType={productpage?.id} referenceId={41 + index} width={550} height={300} setImageStatus={setImageStatus} />
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-700 font-semibold">Heading</label>
              <input
                type="text"
                name="heading"
                value={item.heading}
                onChange={(e) => handleChange(index, "heading", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-semibold">Text</label>
              <ReactQuill
                value={item.text}
                onChange={(value) => handleChange(index, "text", value)}
                className="bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteForm(index)}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddForm}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
      >
        Add Section
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
      >
        Save All
      </button>
    </div>
  );
}
