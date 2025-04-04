



// import { useState, useEffect } from "react";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import StatusManager from "../status";

// // Dynamically import React Quill
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline"],
//     [{ color: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["clean"],
//   ],
// };

// export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [section4, setSection4] = useState([]);

//   useEffect(() => {
//     const fetchSection = async () => {
//       try {
//         const response = await fetch(`/api/admin/product/section4/${productpage?.id}`);
//         const data = await response.json();
//         if (data.success) {
//           setSection4(data.section.section4);
//         } else {
//           setSection4([{ heading: "", text: "", image: "" }]);
//         }
//       } catch (error) {
//         console.error("Error fetching section data:", error);
//         setSection4([{ heading: "", text: "", image: "" }]);
//       }
//     };
//     fetchSection();
//   }, [productpage]);

//   const handleSectionChange = (index, event) => {
//     const newSection = [...section4];
//     newSection[index][event.target.name] = event.target.value;
//     setSection4(newSection);
//   };

//   // Separate handler for ReactQuill
//   const handleQuillChange = (index, value) => {
//     const newSection = [...section4];
//     newSection[index].text = value;
//     setSection4(newSection);
//   };

//   const handleFileChange = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newSection = [...section4];
//       newSection[index].image = file;
//       setSection4(newSection);
//     }
//   };

//   const addSection = () => {
//     setSection4([...section4, { heading: "", text: "", image: "" }]);
//   };

//   const removeSection = (index) => {
//     setSection4(section4.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("section4", JSON.stringify(section4));

//     section4.forEach((item) => {
//       if (item.image instanceof File) {
//         formData.append("images", item.image);
//       }
//     });

//     try {
//       const response = await fetch(`/api/admin/product/section4/${productpage?.id}`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       if (data.success) {
//         alert("Section saved successfully!");
//       } else {
//         alert("Failed to save section.");
//       }
//     } catch (error) {
//       console.error("Error saving section data:", error);
//     }
//   };

//   return (
//     <div className=" p-6 bg-white   ">
//       <div className="flex justify-end pb-5">
//         <StatusManager sectionName={`product_section4${productpage?.id}`} />
//       </div>
//       {/* <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 4</h1> */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {section4.length > 0 && section4.map((item, index) => (
//           <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
//             <h2 className="text-lg font-semibold">Field {index + 1}</h2>
//             <label>Heading</label>
//             <input
//               type="text"
//               name="heading"
//               value={item.heading}
//               onChange={(e) => handleSectionChange(index, e)}
//               className="w-full px-4 py-2 border rounded-md"
//             />
//             <label>Text</label>
//             {/* ReactQuill for Text Field */}
//             <ReactQuill
//               value={item.text}
//               onChange={(value) => handleQuillChange(index, value)}
//               modules={modules}
//               placeholder="Write something..."
//               className="editor overflow-hidden overflow-y-auto"
//             />
//             {item.image && (
//               <Image
//                 width={100}
//                 height={100}
//                 src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image}
//                 alt="Preview"
//                 className="w-24 h-24 object-cover mt-2 rounded"
//               />
//             )}
//             <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
//             <button type="button" onClick={() => removeSection(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
//               Remove Section {index + 1}
//             </button>
//           </div>
//         ))}

//         <button type="button" onClick={addSection} className="px-6 py-3 bg-indigo-600 text-white rounded-md">
//           Add Section
//         </button>
//         <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md">
//           Save Section
//         </button>
//       </form>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import StatusManager from "../status";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

export default function Section4Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [section4, setSection4] = useState([]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch(`/api/admin/product/section4/${productpage?.id}`);
        const data = await response.json();
        if (data.success) {
          setSection4(data.section.section4);
        } else {
          setSection4([{ heading: "", text: "", image: "", imageAltText: "" }]);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
        setSection4([{ heading: "", text: "", image: "", imageAltText: "" }]);
      }
    };
    fetchSection();
  }, [productpage]);

  const handleSectionChange = (index, event) => {
    const newSection = [...section4];
    newSection[index][event.target.name] = event.target.value;
    setSection4(newSection);
  };

  const handleQuillChange = (index, value) => {
    const newSection = [...section4];
    newSection[index].text = value;
    setSection4(newSection);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newSection = [...section4];
      newSection[index].image = file;
      setSection4(newSection);
    }
  };

  const addSection = () => {
    setSection4([...section4, { heading: "", text: "", image: "", imageAltText: "" }]);
  };

  const removeSection = (index) => {
    setSection4(section4.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("section4", JSON.stringify(section4));

    section4.forEach((item) => {
      if (item.image instanceof File) {
        formData.append("images", item.image);
      }
    });

    try {
      const response = await fetch(`/api/admin/product/section4/${productpage?.id}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Section saved successfully!");
      } else {
        alert("Failed to save section.");
      }
    } catch (error) {
      console.error("Error saving section data:", error);
    }
  };

  return (
    <div className=" p-6 bg-white   ">
      <div className="flex justify-end pb-5">
        <StatusManager sectionName={`product_section4${productpage?.id}`} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {section4.length > 0 && section4.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
            <h2 className="text-lg font-semibold">Field {index + 1}</h2>
            <label>Heading</label>
            <input
              type="text"
              name="heading"
              value={item.heading}
              onChange={(e) => handleSectionChange(index, e)}
              className="w-full px-4 py-2 border rounded-md"
            />
            <label>Text</label>
            <ReactQuill
              value={item.text}
              onChange={(value) => handleQuillChange(index, value)}
              modules={modules}
              placeholder="Write something..."
              className="editor overflow-hidden overflow-y-auto"
            />
            <label>Image Alt Text</label>
            <input
              type="text"
              name="imageAltText"
              value={item.imageAltText}
              onChange={(e) => handleSectionChange(index, e)}
              className="w-full px-4 py-2 border rounded-md"
            />
            {item.image && (
              <Image
                width={100}
                height={100}
                src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image}
                alt={item.imageAltText || "Preview"}
                className="w-24 h-24 object-cover mt-2 rounded"
              />
            )}
            <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
            <button type="button" onClick={() => removeSection(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
              Remove Section {index + 1}
            </button>
          </div>
        ))}

        <button type="button" onClick={addSection} className="px-6 py-3 bg-indigo-600 text-white rounded-md">
          Add Section
        </button>
        <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md">
          Save Section
        </button>
      </form>
    </div>
  );
}