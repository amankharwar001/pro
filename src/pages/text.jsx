
// -------------------------------------------- section5 -------------------------------------------------------

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Section5Admin() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [heroSectionId, setHeroSectionId] = useState("12dd792e-ca7c-476e-986e-e2f95d02600e"); // Example ID, replace it dynamically
  const [info, setInfo] = useState([{ title: "", content: "", image: "" }]);

  useEffect(() => {
    if (!heroSectionId) return;

    const fetchSection = async () => {
      try {
        const response = await fetch(`/api/admin/product/section5/${heroSectionId}`);
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
  }, [heroSectionId]);

  const handleInfoChange = (index, event) => {
    const newInfo = [...info];
    newInfo[index][event.target.name] = event.target.value;
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
    setInfo([...info, { title: "", content: "", image: "" }]);
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

    info.forEach((item, index) => {
      if (item.image instanceof File) {
        formData.append("images", item.image);
      }
    });

    try {
      const response = await fetch(`/api/admin/product/section5/${heroSectionId}`, {
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border border-gray-300">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 5</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-gray-800 font-semibold">Heading</label>
        <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
        <label className="block text-gray-800 font-semibold">Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-2 border rounded-md" />

        {info.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
            <h2 className="text-lg font-semibold">Info {index + 1}</h2>
            <label>Title</label>
            <input type="text" name="title" value={item.title} onChange={(e) => handleInfoChange(index, e)} className="w-full px-4 py-2 border rounded-md" />
            <label>Content</label>
            <input type="text" name="content" value={item.content} onChange={(e) => handleInfoChange(index, e)} className="w-full px-4 py-2 border rounded-md" />
            {item.image && (
              <Image width={100} height={100} src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />
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























// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function Section4Admin() {
//   const [heroSectionId, setHeroSectionId] = useState("12dd792e-ca7c-476e-986e-e2f95d02600e"); // Replace dynamically
//   const [section4, setSection4] = useState([]);

//   console.log("section4 data shwi is here",section4)

//   useEffect(() => {
//     if (!heroSectionId) return;

//     const fetchSection = async () => {
//       try {
//         const response = await fetch(`/api/admin/product/section4/${heroSectionId}`);
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
//   }, [heroSectionId]);

//   const handleSectionChange = (index, event) => {
//     const newSection = [...section4];
//     newSection[index][event.target.name] = event.target.value;
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
//       const response = await fetch(`/api/admin/product/section4/${heroSectionId}`, {
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
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border border-gray-300">
//       <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 4</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {section4.length > 0 && section4.map((item, index) => (
//           <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
//             <h2 className="text-lg font-semibold">Section {index + 1}</h2>
//             <label>Heading</label>
//             <input type="text" name="heading" value={item.heading} onChange={(e) => handleSectionChange(index, e)} className="w-full px-4 py-2 border rounded-md" />
//             <label>Text</label>
//             <input type="text" name="text" value={item.text} onChange={(e) => handleSectionChange(index, e)} className="w-full px-4 py-2 border rounded-md" />
//             {item.image && (
//               <Image width={100} height={100} src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />
//             )}
//             <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
//             <button type="button" onClick={() => removeSection(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Remove Section {index + 1}</button>
//           </div>
//         ))}

//         <button type="button" onClick={addSection} className="px-6 py-3 bg-indigo-600 text-white rounded-md">Add Section</button>
//         <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md">Save Section</button>
//       </form>
//     </div>
//   );
// }
