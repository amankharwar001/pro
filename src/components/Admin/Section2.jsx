import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import CommonImageUpload from './CommonImageUpload';
import StatusManager from './status';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const Section2 = ({setActiveBox,sectionsStatusHandle}) => {
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState(null);
  const [apiStatus, setApiStatus] = useState(false)
  const [multiImageStatus, setMultiImageStatus] = useState(false)
  useEffect(() => {
    if (apiStatus && multiImageStatus) {
      sectionsStatusHandle(true);
      console.log("api status in if ")
    } else {
      sectionsStatusHandle(false);
      console.log("api status in else ")

    }
  }, [apiStatus,multiImageStatus]);


  // Fetch existing content on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/homepage/section2', {
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEditorContent(data.section.heading);
          setContentId(data.section.id); // Save the ID for future updates
          
          setApiStatus(true)
        } else {
          console.warn('No content found');
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const endpoint = contentId ? '/api/homepage/section2' : '/api/homepage/section2';
      const method = contentId ? 'PUT' : 'POST';
      const body = contentId
        ? JSON.stringify({ id: contentId, heading: editorContent })
        : JSON.stringify({ heading: editorContent });

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json','x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Show success message
        if (method === 'POST') {
          setContentId(result.section.id); // Save the new content ID
        }
        setActiveBox(3)
        setApiStatus(true)
      } else {
        alert(result.error); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save content.');
    }
  };

  return (
    <div className=" mx-auto p-4 bg-slate-50 shadow-inner rounded-lg">
      <div className='flex justify-end'>
        <StatusManager sectionName={"homepage_section2"}/>
      </div>
      
      {loading ? (
        <p>Loading editor...</p>
      ) : (
        <form onSubmit={handleSubmit} className='mb-5 mt-3'>
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            placeholder="Write something..."
            className="editor   overflow-hidden overflow-y-auto"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md "
          >
            {contentId ? 'Update Content' : 'Create Content'}
          </button>
        </form>
      )}
      <CommonImageUpload referenceType={"homepage_section_2"} imageCount={40} setMultiImageStatus={setMultiImageStatus}/>
      <CommonImageUpload referenceType={"homepage_section_2_2"} imageCount={40} setMultiImageStatus={setMultiImageStatus}/>
    </div>
  );
};

export default Section2;
