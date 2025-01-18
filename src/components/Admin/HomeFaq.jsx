import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React-Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FAQManager({setActiveBox,sectionsStatusHandle}) {
  const [faqData, setFaqData] = useState(null);
  const [form, setForm] = useState({
    heading: "",
    bottomtext: "",
    questions: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchFaqData() {
      try {
        const response = await fetch("/api/homepage/homefaq");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        setFaqData(result.data);
        setMessage(result.message);
        setActiveBox(13)
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
      <h1 className="text-2xl font-bold mb-4">FAQ Manager</h1>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block font-medium">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={form.heading}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="bottomtext" className="block font-medium">Bottom Text</label>
          <ReactQuill
            value={form.bottomtext}
            onChange={(value) => handleEditorChange("bottomtext", value)}
            className=" w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Questions</label>
          {form.questions.map((q, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                className="border p-2 w-full"
                required
              />
              <ReactQuill
                value={q.answer}
                onChange={(value) => handleQuestionChange(index, "answer", value)}
                className=" w-full"
              />
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update FAQ
        </button>
      </form>
    </div>
  );
}
