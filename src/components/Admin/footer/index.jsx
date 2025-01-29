// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// // Dynamically import ReactQuill (rich text editor)
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';

// const FooterAdminPanel = () => {
//   const [content, setContent] = useState('');
//   const [formData, setFormData] = useState({
//     heading: '',
//     buttons: [{ btnname: '', btnlink: '' }],
//   });
//   const [socialLinks, setSocialLinks] = useState({
//     facebook: '',
//     twitter: '',
//     instagram: '',
//     linkedin: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch data from the API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/adminsetting/footer');
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
//         const data = await response.json();

//         if (data) {
//           setContent(data.content || '');
//           setFormData({
//             heading: data.heading || '',
//             buttons: data.buttons || [{ btnname: '', btnlink: '' }],
//           });
//           setSocialLinks(data.socialLinks || {});
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleButtonChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedButtons = [...formData.buttons];
//     updatedButtons[index] = { ...updatedButtons[index], [name]: value };
//     setFormData({ ...formData, buttons: updatedButtons });
//   };

//   const addButton = () => {
//     setFormData({
//       ...formData,
//       buttons: [...formData.buttons, { btnname: '', btnlink: '' }],
//     });
//   };

//   const removeButton = (index) => {
//     const updatedButtons = formData.buttons.filter((_, idx) => idx !== index);
//     setFormData({ ...formData, buttons: updatedButtons });
//   };

//   const handleLinkChange = (e) => {
//     const { name, value } = e.target;
//     setSocialLinks({ ...socialLinks, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/adminsetting/footer', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           content,
//           heading: formData.heading,
//           buttons: formData.buttons,
//           socialLinks,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save footer data');
//       }

//       const result = await response.json();
//       alert(result.message || 'Data saved successfully!');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

  
//   return (
//     <div className="p-6">
//       {/* React Quill for Rich Text Editor */}
//       <div className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Content</label>
//         <ReactQuill
//           value={content}
//           onChange={handleContentChange}
//           className="bg-white rounded-md shadow-sm"
//         />
//       </div>

//       {/* Major Heading, Buttons Section */}
//       <div className="mt-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Major Heading</label>
//           <input
//             type="text"
//             name="heading"
//             value={formData.heading}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md"
//           />
//         </div>

//         <h3 className="text-lg font-semibold mt-4">Buttons</h3>
//         {formData.buttons.map((button, index) => (
//           <div key={index} className="space-y-2 mt-2">
//             <input
//               type="text"
//               name="btnname"
//               value={button.btnname}
//               onChange={(e) => handleButtonChange(index, e)}
//               placeholder="Button Name"
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//             <input
//               type="text"
//               name="btnlink"
//               value={button.btnlink}
//               onChange={(e) => handleButtonChange(index, e)}
//               placeholder="Button Link"
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//             <button
//               type="button"
//               onClick={() => removeButton(index)}
//               className="text-red-500"
//             >
//               Remove Button
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addButton}
//           className="bg-blue-500 text-white p-2 rounded-md mt-4"
//         >
//           Add Button
//         </button>
//       </div>

//       {/* Social Links */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Social Links</h3>
//         {Object.entries(socialLinks).map(([key, value]) => (
//           <div key={key} className="space-y-2 mt-2">
//             <label className="block text-sm font-medium text-gray-700">{key}</label>
//             <input
//               type="text"
//               name={key}
//               value={value}
//               onChange={handleLinkChange}
//               placeholder={`Enter ${key} link`}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Save Button */}
//       <button
//         type="button"
//         onClick={handleSave}
//         className="bg-green-500 text-white p-3 rounded-md mt-6"
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default FooterAdminPanel;




// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// // Dynamically import ReactQuill (rich text editor)
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';

// const FooterAdminPanel = () => {
//   const [content, setContent] = useState('');
//   const [formData, setFormData] = useState({
//     heading: '',
//     buttons: [{ btnname: '', btnlink: '' }],
//   });
//   const [socialLinks, setSocialLinks] = useState({
//     facebook: '',
//     twitter: '',
//     instagram: '',
//     linkedin: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch data from the API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/adminsetting/footer');
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
//         const data = await response.json();

//         if (data) {
//           setContent(data.content || '');
//           setFormData({
//             heading: data.heading || '',
//             buttons: data.buttons || [{ btnname: '', btnlink: '' }],
//           });
//           setSocialLinks(data.socialLinks || {});
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleButtonChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedButtons = [...formData.buttons];
//     updatedButtons[index] = { ...updatedButtons[index], [name]: value };
//     setFormData({ ...formData, buttons: updatedButtons });
//   };

//   const addButton = () => {
//     setFormData({
//       ...formData,
//       buttons: [...formData.buttons, { btnname: '', btnlink: '' }],
//     });
//   };

//   const removeButton = (index) => {
//     const updatedButtons = formData.buttons.filter((_, idx) => idx !== index);
//     setFormData({ ...formData, buttons: updatedButtons });
//   };

//   const handleLinkChange = (e) => {
//     const { name, value } = e.target;
//     setSocialLinks({ ...socialLinks, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/adminsetting/footer', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           content,
//           heading: formData.heading,
//           buttons: formData.buttons,
//           socialLinks,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save footer data');
//       }

//       const result = await response.json();
//       alert(result.message || 'Data saved successfully!');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Footer Admin Panel</h1>

//       {/* React Quill for Rich Text Editor */}
//       <div className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Content</label>
//         <ReactQuill
//           value={content}
//           onChange={handleContentChange}
//           className="bg-white rounded-md shadow-sm w-full"
//         />
//       </div>

//       {/* Major Heading Section */}
//       <div className="mt-6 space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Major Heading</label>
//         <input
//           type="text"
//           name="heading"
//           value={formData.heading}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Buttons Section */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold text-gray-800">Buttons</h3>
//         {formData.buttons.map((button, index) => (
//           <div key={index} className="space-y-2 mt-2">
//             <input
//               type="text"
//               name="btnname"
//               value={button.btnname}
//               onChange={(e) => handleButtonChange(index, e)}
//               placeholder="Button Name"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               name="btnlink"
//               value={button.btnlink}
//               onChange={(e) => handleButtonChange(index, e)}
//               placeholder="Button Link"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={() => removeButton(index)}
//               className="text-red-500 hover:underline"
//             >
//               Remove Button
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addButton}
//           className="bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600"
//         >
//           Add Button
//         </button>
//       </div>

//       {/* Social Links Section */}
//       <div className="mt-6 space-y-4">
//         <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
//         {Object.entries(socialLinks).map(([key, value]) => (
//           <div key={key} className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">{key}</label>
//             <input
//               type="text"
//               name={key}
//               value={value}
//               onChange={handleLinkChange}
//               placeholder={`Enter ${key} link`}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Save Button */}
//       <div className="mt-8 flex justify-center">
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 w-full sm:w-auto"
//         >
//           Save
//         </button>
//       </div>

//       {/* Loading & Error Handling */}
//       {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
//       {error && <p className="text-center text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default FooterAdminPanel;










import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { FaLink } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";


// Dynamically import ReactQuill (rich text editor)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const FooterAdminPanel = () => {
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    heading: '',
    buttons: [{ btnname: '', btnlink: '' }],
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    pinterest: '',
    linkedin: '',
  });
  const [copyright, setCopyright] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/adminsetting/footer');
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const data = await response.json();

        if (data) {
          setContent(data.content || '');
          setFormData({
            heading: data.heading || '',
            buttons: data.buttons || [{ btnname: '', btnlink: '' }],
          });
          setSocialLinks(data.socialLinks || {});
          setCopyright(data.copyright || '');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonChange = (index, e) => {
    const { name, value } = e.target;
    const updatedButtons = [...formData.buttons];
    updatedButtons[index] = { ...updatedButtons[index], [name]: value };
    setFormData({ ...formData, buttons: updatedButtons });
  };

  const addButton = () => {
    setFormData({
      ...formData,
      buttons: [...formData.buttons, { btnname: '', btnlink: '' }],
    });
  };

  const removeButton = (index) => {
    const updatedButtons = formData.buttons.filter((_, idx) => idx !== index);
    setFormData({ ...formData, buttons: updatedButtons });
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/adminsetting/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          heading: formData.heading,
          buttons: formData.buttons,
          socialLinks,
          copyright,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save footer data');
      }

      const result = await response.json();
      alert(result.message || 'Data saved successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='px-2 '>
      <div className="bg-gray-50 relative  p-1 shadow-inner border border-gray-400 rounded-lg  mx-auto">
        <h1 className="text-2xl font-semibold text-center sticky top-[71px] border-b-2 shadow z-10 py-5 bg-gray-50 text-gray-800 mb-6">Footer Panel</h1>
        <div className='p-4'>

          {/* React Quill for Rich Text Editor */}
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">Content</label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              className="bg-white rounded-md shadow-sm w-full"
            />
          </div>

          {/* Major Heading Section */}
          <div className='bg-gray-50 shadow-inner p-4 mt-5 rounded-lg border'>
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800">Links</h3>
              {formData.buttons.map((button, index) => (
                <div key={index} className="space-y-2 mt-2 bg-gray-200 p-2 border border-gray-300 rounded-md">
                  <input
                    type="text"
                    name="btnname"
                    value={button.btnname}
                    onChange={(e) => handleButtonChange(index, e)}
                    placeholder="Link Name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="btnlink"
                    value={button.btnlink}
                    onChange={(e) => handleButtonChange(index, e)}
                    placeholder="URL"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeButton(index)}
                    className="text-red-500 hover:underline hover:text-red-800"
                  >
                    <span className='flex gap-2 items-center'><IoIosRemoveCircle/> Remove</span>
                    
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addButton}
                className="bg-gray-500 text-white p-3 rounded-md mt-4 hover:bg-[#003066]"
              >
                <span className='flex gap-2 items-center'><FaLink/>Add Links</span>
                
              </button>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-6 space-y-4 ">
            <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
            <div className='bg-gray-200 p-4 rounded-md border'>

              {Object.entries(socialLinks).map(([key, value]) => (
                <div key={key} className=" pb-2">
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleLinkChange}
                    placeholder={`Enter ${key} link`}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-6 space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700">Copyright</label>
            <input
              type="text"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              placeholder="Enter copyright text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className='text-xs  text-zinc-400' > footer save button</span>

          {/* Save Button */}
          <div className=" w-full flex">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white p-3 rounded-md  hover:bg-green-600 w-full"
            >
              Save Footer
            </button>
          </div>
          
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default FooterAdminPanel;
