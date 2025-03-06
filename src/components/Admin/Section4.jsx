





import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ImageUploader from './ImageUploader';
import CommonImageUpload from './CommonImageUpload';
import StatusManager from './status';

const Section4Form = ({ setActiveBox, sectionsStatusHandle }) => {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [leadName1, setLeadName1] = useState('');
  const [leadNo1, setLeadNo1] = useState('');
  const [leadName2, setLeadName2] = useState('');
  const [leadNo2, setLeadNo2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [multiImageStatus, setMultiImageStatus] = useState(false);

  useEffect(() => {
    if (apiStatus && imageStatus && multiImageStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);
    }
  }, [apiStatus, imageStatus, multiImageStatus]);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await fetch('/api/homepage/section4');
        const result = await response.json();

        if (response.ok && result.success) {
          const { heading, content, leadDetails } = result.data;
          setHeading(heading);
          setContent(content);

          if (leadDetails && leadDetails.length >= 2) {
            setLeadName1(leadDetails[0].leadName || '');
            setLeadNo1(leadDetails[0].leadNo || '');
            setLeadName2(leadDetails[1].leadName || '');
            setLeadNo2(leadDetails[1].leadNo || '');
          }
          setApiStatus(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    };

    fetchSectionData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      heading,
      content,
      leadDetails: [
        { leadName: leadName1, leadNo: leadNo1 },
        { leadName: leadName2, leadNo: leadNo2 },
      ],
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/homepage/section4', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Data updated successfully!');
        setActiveBox(5);
        setApiStatus(true);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-slate-50 shadow-inner rounded-md space-y-4">
      <div className='flex justify-end'>
        <StatusManager sectionName={'homepage_section4'} />
      </div>
      <div className='flex gap-5 items-center flex-wrap'>
        <ImageUploader referenceType={'homepage_section4'} referenceId={1} width={349} height={563} setImageStatus={setImageStatus} />
        <ImageUploader referenceType={'homepage_section4_png1'} referenceId={1} width={349} height={563} setImageStatus={setImageStatus} />
        <ImageUploader referenceType={'homepage_section4_png2'} referenceId={1} width={349} height={563} setImageStatus={setImageStatus} />
        <ImageUploader referenceType={'homepage_section4_png3'} referenceId={1} width={349} height={563} setImageStatus={setImageStatus} />
        {/* <CommonImageUpload referenceType={'homepage_section_4'} imageCount={3} setMultiImageStatus={setMultiImageStatus} /> */}
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-semibold text-gray-700">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-semibold text-gray-700">Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="bg-white border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Lead Details</label>
        <div className="flex space-x-4">
          <input type="text" placeholder="Lead Name" value={leadName1} onChange={(e) => setLeadName1(e.target.value)} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          <input type="text" placeholder="Lead No" value={leadNo1} onChange={(e) => setLeadNo1(e.target.value)} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div className="flex space-x-4">
          <input type="text" placeholder="Lead Name" value={leadName2} onChange={(e) => setLeadName2(e.target.value)} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          <input type="text" placeholder="Lead No" value={leadNo2} onChange={(e) => setLeadNo2(e.target.value)} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Section'}
      </button>
    </div>
  );
};

export default Section4Form;
