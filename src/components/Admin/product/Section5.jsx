

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import ImageUploader from "../ImageUploader";
// import StatusManager from "../status";
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

// export default function Section5Product({ productpage, setActiveBox, sectionsStatusHandle }) {
//   const [heading, setHeading] = useState("");
//   const [text, setText] = useState("");
//   const [info, setInfo] = useState([{ title: "", content: "", image: "" }]);

//   useEffect(() => {
//     const fetchSection = async () => {
//       try {
//         const response = await fetch(`/api/admin/product/section5/${productpage?.id}`);
//         const data = await response.json();
//         if (data.success) {
//           setHeading(data.section.heading);
//           setText(data.section.text);
//           setInfo(data.section.info || []);
//         }
//       } catch (error) {
//         console.error("Error fetching section data:", error);
//       }
//     };
//     fetchSection();
//   }, [productpage]);

//   const handleInfoChange = (index, value) => {
//     const newInfo = [...info];
//     newInfo[index].content = value;
//     setInfo(newInfo);
//   };

//   const handleFileChange = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newInfo = [...info];
//       newInfo[index].image = file;
//       setInfo(newInfo);
//     }
//   };

//   const addInfo = () => {
//     setInfo([...info, { title: "", content: "", image: "" }]);
//   };

//   const removeInfo = (index) => {
//     setInfo(info.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("heading", heading);
//     formData.append("text", text);
//     formData.append("info", JSON.stringify(info));

//     info.forEach((item) => {
//       if (item.image instanceof File) {
//         formData.append("images", item.image);
//       }
//     });

//     try {
//       const response = await fetch(`/api/admin/product/section5/${productpage?.id}`, {
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
//     <div className=" p-6 bg-white  ">
//       {/* <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 5</h1> */}
//       <div className="flex justify-end">
//         <StatusManager sectionName={`product_section5${productpage?.id}`} />
//       </div>
//       <ImageUploader referenceType={productpage?.id} referenceId={5} width={450} height={610} setImageStatus={(status) => handleImageStatusChange(5, status)} />


//       <form onSubmit={handleSubmit} className="space-y-6">
//         <label className="block text-gray-800 font-semibold">Heading</label>
//         <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md" />

//         <label className="block text-gray-800 font-semibold">Text</label>
//         <ReactQuill value={text} onChange={setText} modules={modules} className="bg-white" />

//         {info.map((item, index) => (
//           <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
//             <h2 className="text-lg font-semibold">Info {index + 1}</h2>
//             <label>Title</label>
//             <input type="text" name="title" value={item.title} onChange={(e) => {
//               const newInfo = [...info];
//               newInfo[index].title = e.target.value;
//               setInfo(newInfo);
//             }} className="w-full px-4 py-2 border rounded-md" />

//             <label>Content</label>
//             <ReactQuill value={item.content} onChange={(value) => handleInfoChange(index, value)} modules={modules} className="bg-white" />

//             {item.image && (
//               <Image width={100} height={100} src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />
//             )}
//             <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
//             <button type="button" onClick={() => removeInfo(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Remove Info {index + 1}</button>
//           </div>
//         ))}

//         <button type="button" onClick={addInfo} className="px-6 py-3 bg-indigo-600 text-white rounded-md">Add Info</button>
//         <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md">Save Section</button>
//       </form>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ImageUploader from "../ImageUploader";
import StatusManager from "../status";
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

export default function Section5Product({ productpage, setActiveBox, sectionsStatusHandle }) {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState([{ title: "", content: "", image: "", imageAltText: "" }]);


  useEffect(() => {
    const isValid =
      Boolean(heading) &&
      Boolean(text) &&
      info.length > 0 &&
      info.some(item => item.title || item.content || item.image || item.imageAltText);

    sectionsStatusHandle(isValid);
  }, [heading, text, info]);



  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch(`/api/admin/product/section5/${productpage?.id}`);
        const data = await response.json();
        if (data.success) {
          setHeading(data.section.heading);
          setText(data.section.text);
          setInfo(data.section.info || []);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };
    fetchSection();
  }, [productpage]);

  const handleInfoChange = (index, value) => {
    const newInfo = [...info];
    newInfo[index].content = value;
    setInfo(newInfo);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newInfo = [...info];
      newInfo[index].image = file;
      setInfo(newInfo);
    }
  };

  const addInfo = () => {
    setInfo([...info, { title: "", content: "", image: "", imageAltText: "" }]);
  };

  const removeInfo = (index) => {
    setInfo(info.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("text", text);
    formData.append("info", JSON.stringify(info));

    info.forEach((item) => {
      if (item.image instanceof File) {
        formData.append("images", item.image);
      }
    });

    try {
      const response = await fetch(`/api/admin/product/section5/${productpage?.id}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Section saved successfully!");
        setActiveBox(7);
      } else {
        alert("Failed to save section.");
      }
    } catch (error) {
      console.error("Error saving section data:", error);
    }
  };

  return (
    <div className=" p-6 bg-white  ">
      <div className="flex justify-end">
        <StatusManager sectionName={`product_section5${productpage?.id}`} />
      </div>
      <ImageUploader referenceType={productpage?.id} referenceId={5} width={450} height={610} setImageStatus={(status) => handleImageStatusChange(5, status)} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-gray-800 font-semibold">Heading</label>
        <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md" />

        <label className="block text-gray-800 font-semibold">Text</label>
        <ReactQuill value={text} onChange={setText} modules={modules} className="bg-white" />

        {info.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
            <h2 className="text-lg font-semibold">Info {index + 1}</h2>
            <label>Title</label>
            <input type="text" name="title" value={item.title} onChange={(e) => {
              const newInfo = [...info];
              newInfo[index].title = e.target.value;
              setInfo(newInfo);
            }} className="w-full px-4 py-2 border rounded-md" />

            <label>Content</label>
            <ReactQuill value={item.content} onChange={(value) => handleInfoChange(index, value)} modules={modules} className="bg-white" />

            <label>Image Alt Text</label>
            <input type="text" name="imageAltText" value={item.imageAltText} onChange={(e) => {
              const newInfo = [...info];
              newInfo[index].imageAltText = e.target.value;
              setInfo(newInfo);
            }} className="w-full px-4 py-2 border rounded-md" />

            {item.image && (
              <Image width={100} height={100} src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} alt={item.imageAltText || "Preview"} className="w-24 h-24 object-cover mt-2 rounded" />
            )}
            <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
            <button type="button" onClick={() => removeInfo(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Remove Info {index + 1}</button>
          </div>
        ))}

        <button type="button" onClick={addInfo} className="px-6 py-3 bg-indigo-600 text-white rounded-md">Add Info</button>
        <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md">Save Section</button>
      </form>
    </div>
  );
}
