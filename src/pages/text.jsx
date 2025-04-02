



// import { useState, useEffect } from "react";

// export default function Section6Admin() {
//   const [heading, setHeading] = useState("");
//   const [content, setContent] = useState("");
//   const [bottomText, setBottomText] = useState("");
//   const [cards, setCards] = useState([
//     { title: "", content: "", info: "", buttonName: "", buttonLink: "", image: "", imagealt: "" },
//   ]);

//   useEffect(() => {
//     const fetchSection = async () => {
//       try {
//         const response = await fetch("/api/admin/home/section6");
//         const data = await response.json();
//         if (data.success) {
//           setHeading(data.section.heading);
//           setContent(data.section.content);
//           setBottomText(data.section.bottomtext);
//           setCards(data.section.card || []);
//         }
//       } catch (error) {
//         console.error("Error fetching section data:", error);
//       }
//     };
//     fetchSection();
//   }, []);

//   const handleCardChange = (index, event) => {
//     const newCards = [...cards];
//     newCards[index][event.target.name] = event.target.value;
//     setCards(newCards);
//   };

//   const handleFileChange = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newCards = [...cards];
//       newCards[index].image = file;
//       setCards(newCards);
//     }
//   };

//   const addCard = () => {
//     setCards([...cards, { title: "", content: "", info: "", buttonName: "", buttonLink: "", image: "", imagealt: "" }]);
//   };

//   const removeCard = (index) => {
//     setCards(cards.filter((_, i) => i !== index));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("heading", heading);
//   //   formData.append("content", content);
//   //   formData.append("bottomText", bottomText);

//   //   cards.forEach((card, index) => {
//   //     formData.append(`cards[${index}][title]`, card.title);
//   //     formData.append(`cards[${index}][content]`, card.content);
//   //     formData.append(`cards[${index}][info]`, card.info);
//   //     formData.append(`cards[${index}][buttonName]`, card.buttonName);
//   //     formData.append(`cards[${index}][buttonLink]`, card.buttonLink);
//   //     formData.append(`cards[${index}][imagealt]`, card.imagealt);

//   //     if (card.image instanceof File) {
//   //       formData.append("images", card.image);
//   //     }
//   //   });

//   //   try {
//   //     const response = await fetch("/api/admin/home/section6", {
//   //       method: "POST",
//   //       body: formData,
//   //     });
//   //     const data = await response.json();
//   //     if (data.success) {
//   //       alert("Section saved successfully!");
//   //     } else {
//   //       alert("Failed to save section.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error saving section data:", error);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("heading", heading);
//     formData.append("content", content);
//     formData.append("bottomText", bottomText);
//     formData.append("cards", JSON.stringify(cards)); // 🔥 Send cards as JSON string

//     cards.forEach((card, index) => {
//         if (card.image instanceof File) {
//             formData.append("images", card.image); // 🔥 Correct field name as array
//         }
//     });

//     try {
//         const response = await fetch("/api/admin/home/section6", {
//             method: "POST",
//             body: formData,
//         });
//         const data = await response.json();
//         if (data.success) {
//             alert("Section saved successfully!");
//         } else {
//             alert("Failed to save section.");
//         }
//     } catch (error) {
//         console.error("Error saving section data:", error);
//     }
// };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border border-gray-300">
//       <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 6</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-gray-800 font-semibold">Heading</label>
//           <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         <div>
//           <label className="block text-gray-800 font-semibold">Content</label>
//           <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         {cards.map((card, index) => (
//           <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
//             <h2 className="text-lg font-semibold">Card {index + 1}</h2>
//             <label>Title</label>
//             <input type="text" name="title" value={card.title} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             <label>Content</label>
//             <input type="text" name="content" value={card.content} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             <label>Info</label>
//             <input type="text" name="info" value={card.info} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             <label>Button Name</label>
//             <input type="text" name="buttonName" value={card.buttonName} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             <label>Button Link</label>
//             <input type="text" name="buttonLink" value={card.buttonLink} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             <label>Image Alt Text</label>
//             <input type="text" name="imagealt" value={card.imagealt} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
//             {card.image && (
//               <img src={card.image instanceof File ? URL.createObjectURL(card.image) : card.image} alt={card.imagealt || "Preview"} className="w-24 h-24 object-cover mt-2 rounded" />
//             )}
//             <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
//             <button type="button" onClick={() => removeCard(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700">Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={addCard} className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Card</button>
//         <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">Save Section</button>
//       </form>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import Image from "next/image";

export default function Section6Admin() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [bottomText, setBottomText] = useState("");

  const [cards, setCards] = useState([
    { title: "", content: "", info: "", buttonName: "", buttonLink: "", image: "", imagealt: "" },
  ]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch("/api/admin/home/section6");
        const data = await response.json();
        if (data.success) {
          setHeading(data.section.heading);
          setContent(data.section.content);
          setBottomText(data.section.bottomtext);
          setCards(data.section.card || []);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };
    fetchSection();
  }, []);

  const handleCardChange = (index, event) => {
    const newCards = [...cards];
    newCards[index][event.target.name] = event.target.value;
    setCards(newCards);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newCards = [...cards];
      newCards[index].image = file;
      setCards(newCards);
    }
  };

  const addCard = () => {
    setCards([...cards, { title: "", content: "", info: "", buttonName: "", buttonLink: "", image: "", imagealt: "" }]);
  };

  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("content", content);
    formData.append("bottomText", bottomText);
    formData.append("cards", JSON.stringify(cards)); // 🔥 Send cards as JSON string

    cards.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append("images", card.image); // 🔥 Correct field name as array
      }
    });

    try {
      const response = await fetch("/api/admin/home/section6", {
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
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Manage Section 6</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-800 font-semibold">Heading</label>
          <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold">Bottom Text</label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {cards.map((card, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
            <h2 className="text-lg font-semibold">Card {index + 1}</h2>
            <label>Title</label>
            <input type="text" name="title" value={card.title} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Content</label>
            <input type="text" name="content" value={card.content} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Info</label>
            <input type="text" name="info" value={card.info} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Button Name</label>
            <input type="text" name="buttonName" value={card.buttonName} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Button Link</label>
            <input type="text" name="buttonLink" value={card.buttonLink} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Image Alt Text</label>
            <input type="text" name="imagealt" value={card.imagealt} onChange={(e) => handleCardChange(index, e)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            {card.image && (
              <Image width={100} height={100}  src={card.image instanceof File ? URL.createObjectURL(card.image) : card.image} alt={card.imagealt || "Preview"} className="w-24 h-24 object-cover mt-2 rounded" />
            )}
            <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
            <button type="button" onClick={() => removeCard(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700">Remove card {index+1}</button>
          </div>
        ))}
        <button type="button" onClick={addCard} className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Card</button>
        <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">Save Section</button>
      </form>
    </div>
  );
}


