// import React, { useState, useEffect } from "react";
// import ImageUploader from "../ImageUploader";
// import StatusManager from "../status";
// // gjh
// export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [data, setData] = useState({ heading: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false); // To check if data exists for editing
//   const [apiStatus, setApiStatus] = useState(false)
//   const [imageStatus, setImageStatus] = useState(false)


//   useEffect(() => {
//     if (apiStatus && imageStatus) {
//       sectionsStatusHandle(true);
//     } else {
//       sectionsStatusHandle(false);

//     }
//   }, [apiStatus, imageStatus]);
//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result);
//         setIsEditing(true); // Data exists, so switch to editing mode
//         setApiStatus(true)
//       } catch (err) {
//         setError(err.message);
//         setIsEditing(false); // No data, switch to create mode
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productpage?.id) {
//       fetchData();
//     }
//   }, [productpage?.id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle Save (PUT request)
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update data");
//       }
//       const updatedData = await response.json();
//       setData(updatedData);
//       alert("Data updated successfully!");
//       setActiveBox(5);
//       setApiStatus(true)
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Create (POST request)
//   const handleCreate = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to create data");
//       }
//       const newData = await response.json();
//       setActiveBox(5);
//       setData(newData);
//       setApiStatus(true)
//       alert("Data created successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border bg-gray-50 shadow-inner rounded">
//       {/* <h1 className="text-2xl font-bold mb-4">Section 4 Product</h1> */}
//       {/* {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>} */}
//       <div className="flex justify-end">
//         <StatusManager sectionName={`product_section4${productpage?.id}`}/>
//       </div>
//       <ImageUploader referenceType={productpage?.id} referenceId={4} width={550} height={300} setImageStatus={setImageStatus}/>

//       {!loading && (
//         <form className="space-y-4 mt-4">
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Heading</label>
//             <input
//               type="text"
//               name="heading"
//               value={data.heading}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Text</label>
//             <textarea
//               name="text"
//               value={data.text}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               rows="4"
//             />
//           </div>
//           <div className="space-x-4">
//             <button
//               type="button"
//               onClick={isEditing ? handleSave : handleCreate}
//                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"

//             >
//               {isEditing ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }











































// import React, { useState, useEffect } from "react";
// import ImageUploader from "../ImageUploader";
// import StatusManager from "../status";
// // gjh
// export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [data, setData] = useState({ heading: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false); // To check if data exists for editing
//   const [apiStatus, setApiStatus] = useState(false)
//   const [imageStatus, setImageStatus] = useState(false)


//   useEffect(() => {
//     if (apiStatus && imageStatus) {
//       sectionsStatusHandle(true);
//     } else {
//       sectionsStatusHandle(false);

//     }
//   }, [apiStatus, imageStatus]);
//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result);
//         setIsEditing(true); // Data exists, so switch to editing mode
//         setApiStatus(true)
//       } catch (err) {
//         setError(err.message);
//         setIsEditing(false); // No data, switch to create mode
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productpage?.id) {
//       fetchData();
//     }
//   }, [productpage?.id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle Save (PUT request)
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update data");
//       }
//       const updatedData = await response.json();
//       setData(updatedData);
//       alert("Data updated successfully!");
//       setActiveBox(5);
//       setApiStatus(true)
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Create (POST request)
//   const handleCreate = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to create data");
//       }
//       const newData = await response.json();
//       setActiveBox(5);
//       setData(newData);
//       setApiStatus(true)
//       alert("Data created successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border bg-gray-50 shadow-inner rounded">
//       {/* yaha se dynamic krna ha  */}
//       {map((item,index)=>
//       <div className="flex justify-end">
//         <StatusManager sectionName={`product_section4_${index+1}${productpage?.id}`}/>
//       </div>
//       <ImageUploader referenceType={`product_section4_${index+1}${productpage?.id}`} referenceId={4} width={550} height={300} setImageStatus={setImageStatus}/>

//       {!loading && (
//         <form className="space-y-4 mt-4">
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Heading</label>
//             <input
//               type="text"
//               name="heading"
//               value={data.heading}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 font-semibold">Text</label>
//             <textarea
//               name="text"
//               value={data.text}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               rows="4"
//             />
//           </div>
//           <div className="space-x-4">
//             <button
//               type="button"
//               onClick={isEditing ? handleSave : handleCreate}
//                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"

//             >
//               {isEditing ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }





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
//         const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setForms(result.sections || [{ heading: "", text: "" }]);
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
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sections: forms }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update data");
//       }
//       alert("Data updated successfully!");
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
//       {forms.map((item, index) => (
//         <div key={index} className="mb-6">
//           <div className="flex justify-end">
//             <StatusManager sectionName={`product_section4_${index + 1}${productpage?.id}`} />
//           </div>
//           <ImageUploader referenceType={`product_section4_${index + 1}${productpage?.id}`} referenceId={4} width={550} height={300} setImageStatus={setImageStatus} />
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

export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [forms, setForms] = useState([{ heading: "", text: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  console.log("product id show is here", productpage?.id)

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
        const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`);
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

  const handleChange = (index, e) => {
    const { name, value } = e.target;
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

  // const handleSave = async () => {
  //   console.log("form data product show is here",forms)
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`/api/product/sectionproduct4/${productpage?.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ section4: forms }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update data");
  //     }
  //     alert("Data updated successfully!");
  //     setActiveBox(5);
  //     setApiStatus(true);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        headers: { "Content-Type": "application/json" },
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
          <ImageUploader referenceType={productpage?.id} referenceId={41+index} width={550} height={300} setImageStatus={setImageStatus} />
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-700 font-semibold">Heading</label>
              <input
                type="text"
                name="heading"
                value={item.heading}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-semibold">Text</label>
              <textarea
                name="text"
                value={item.text}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded"
                rows="4"
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
