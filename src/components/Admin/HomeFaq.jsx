import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import StatusManager from "./status";
import { MdDelete } from "react-icons/md";

// Dynamically import React-Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FAQManager({setActiveBox,sectionsStatusHandle}) {
  const [faqData, setFaqData] = useState(null);
  const [form, setForm] = useState({
    heading: "",
    
    questions: [],
  });
  const [message, setMessage] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  useEffect(() => {
    async function fetchFaqData() {
      try {
        const response = await fetch("/api/homepage/homefaq", {
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        const result = await response.json();

        if (result.success) {
          setFaqData(result.data);
          setForm(result.data); // Prefill form with fetched data
          sectionsStatusHandle(true)
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        setMessage("Failed to load FAQ data.");
      }
    }

    fetchFaqData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEditorChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index][field] = value;
    setForm((prevForm) => ({
      ...prevForm,
      questions: updatedQuestions,
    }));
  };

  const addQuestion = () => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: [...prevForm.questions, { id: prevForm.questions.length + 1, question: "", answer: "" }],
    }));
  };

  const removeQuestion = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/homepage/homefaq", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
         },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        setFaqData(result.data);
        setMessage(result.message);
        setActiveBox(13)
        setApiStatus(true)
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting FAQ data:", error);
      setMessage("Failed to update FAQ data.");
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-end '>
        <StatusManager sectionName={"homepage_section12"}/>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block text-gray-700 font-semibold">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={form.heading}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold">Questions</label>
          {form.questions.map((q, index) => (
            <div key={index} className=" space-y-2 mb-4 rounded-lg shadow-md p-4 border bg-white">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                className="border p-2 w-full rounded-md"
                required
              />
              <ReactQuill
                value={q.answer}
                onChange={(value) => handleQuestionChange(index, "answer", value)}
                className=" w-full"
                modules={modules}
              />
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="hover:text-red-500 text-black"
              >
                <span className="flex items-center gap-2"><MdDelete size={20}/> Remove</span>
                
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-500 hover:bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
           className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Update FAQ
        </button>
      </form>
    </div>
  );
}
