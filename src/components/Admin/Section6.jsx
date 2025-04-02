

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import StatusManager from "./status";
import Image from "next/image";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

export default function Section6Component({ setActiveBox, sectionsStatusHandle }) {
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

  useEffect(() => {
    if (heading && content && bottomText) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [heading, content, bottomText]);


  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
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
    formData.append("cards", JSON.stringify(cards));

    cards.forEach((card, index) => {
      if (card.image instanceof File) {
        formData.append("images", card.image);
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
        setActiveBox(7)
      } else {
        alert("Failed to save section.");
      }
    } catch (error) {
      console.error("Error saving section data:", error);
    }
  };

  return (
    <div className="w-full p-6 rounded-lg mt-10">
      <div className='flex justify-end '>

        <StatusManager sectionName={"homepage_section6"} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-800 font-semibold">Heading</label>
          <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold">Content</label>
          <ReactQuill value={content} onChange={setContent} modules={modules} className="w-full" />
        </div>
        <div>
          <label className="block text-gray-800 font-semibold">Bottom Text</label>
          <ReactQuill value={bottomText} onChange={setBottomText} modules={modules} className="w-full" />
        </div>

        {cards.map((card, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow-md rounded-md border">
            <h2 className="text-lg font-semibold">Card {index + 1}</h2>
            <label>Title</label>
            <input type="text" name="title" value={card.title} onChange={(e) => handleCardChange(index, "title", e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Content</label>
            <ReactQuill value={card.content} onChange={(value) => handleCardChange(index, "content", value)} modules={modules} className="w-full" />
            <label>Info</label>
            <ReactQuill value={card.info} onChange={(value) => handleCardChange(index, "info", value)} modules={modules} className="w-full" />
            <label>Button Name</label>
            <input type="text" name="buttonName" value={card.buttonName} onChange={(e) => handleCardChange(index, "buttonName", e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Button Link</label>
            <input type="text" name="buttonLink" value={card.buttonLink} onChange={(e) => handleCardChange(index, "buttonLink", e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            <label>Image Alt Text</label>
            <input type="text" name="imagealt" value={card.imagealt} onChange={(e) => handleCardChange(index, "imagealt", e.target.value)} className="w-full px-4 py-2 border rounded-md shadow-sm" />
            {card.image && (
              <Image width={100} height={100} src={card.image instanceof File ? URL.createObjectURL(card.image) : card.image} alt={card.imagealt || "Preview"} className="w-24 h-24 object-cover mt-2 rounded" />
            )}
            <input type="file" onChange={(e) => handleFileChange(index, e)} className="mt-2" />
            <button type="button" onClick={() => removeCard(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700">Remove card {index + 1}</button>
          </div>
        ))}
        <button type="button" onClick={addCard} className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Card</button>
        <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">Save Section</button>
      </form>
    </div>
  );
}

