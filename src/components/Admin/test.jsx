import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

const Test = ({setActiveBox}) => {
  const [id, setId] = useState(null); // Store ID for editing
  const [text, setText] = useState('');
  const [textarea, setTextarea] = useState('');
  const [btnLink, setBtnLink] = useState('');
  const [btn, setBtn] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch existing data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/submitForm', {
          method: 'GET',
        });
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          const existingData = result.data[0]; // Assuming only one record
          setId(existingData.id);
          setText(existingData.heading);
          setTextarea(existingData.text);
          setBtn(existingData.btn);
          setBtnLink(existingData.btnLink);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      heading: text,
      text: textarea,
      btnLink,
      btn,
    };

    try {
      setIsUploading(true);

      const response = await fetch('/api/submitForm', {
        method: id ? 'PUT' : 'POST', // Use PUT for updating, POST for creatings
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, id }), // Include ID for updates
      });

      const result = await response.json();

      if (response.ok) {
        alert(id ? 'Data updated successfully!' : 'Form submitted successfully!');
        setId(result.data.id); // Save ID after creation for future edits
        setActiveBox(2)
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className=" mx-auto p-4 bg-slate-100 shadow-inner rounded-lg space-y-4">
      <ImageUploader referenceType={"hero_section"}/>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Text</label>
        <textarea
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Button Link</label>
        <input
          value={btnLink}
          onChange={(e) => setBtnLink(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Button Text</label>
        <input
          value={btn}
          onChange={(e) => setBtn(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        disabled={isUploading}
      >
        {isUploading ? 'Submitting...' : id ? 'Update' : 'Submit'}
      </button>
    </div>
  );
};

export default Test;