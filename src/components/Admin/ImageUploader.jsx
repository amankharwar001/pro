

// import { useState, useEffect } from 'react';

// const ImageUploader = ({ referenceType, referenceId: propReferenceId }) => {
//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
//   const [image, setImage] = useState(null);
//   const [altText, setAltText] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [images, setImages] = useState([]);

//   // Static referenceId
//   const referenceId = propReferenceId || 1; // You can change this value as needed

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch(`/api/images/${referenceType}?referenceId=${referenceId}`);
//         const data = await res.json();
//         if (data.success) {
//           setImages(data.images);
//         } else {
//           setUploadStatus('Failed to fetch images.');
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//         setUploadStatus('Error fetching images.');
//       }
//     };

//     fetchImages();
//   }, [referenceType, referenceId]);

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!image || !altText || !referenceId) {
//       setUploadStatus('Please select an image, provide alt text');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('altText', altText);
//     formData.append('referenceId', referenceId);

//     try {
//       const res = await fetch(`/api/upload/${referenceType}`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         setUploadStatus('Image uploaded successfully!');
//         const updatedRes = await fetch(`/api/images/${referenceType}`);
//         const updatedData = await updatedRes.json();
//         if (updatedData.success) {
//           setImages(updatedData.images);
//         }
//       } else {
//         setUploadStatus('Failed to upload image.');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setUploadStatus('Error uploading image.');
//     }
//   };

//   const handleDelete = async (id) => {
//     // Show confirmation dialog
//     const isConfirmed = window.confirm('Are you sure you want to delete this image?');
  
//     if (!isConfirmed) {
//       return; // If the user clicks "No", do nothing and exit
//     }
  
//     try {
//       const res = await fetch(`/api/images/${id}`, {
//         method: 'DELETE',
//       });
  
//       const data = await res.json();
//       if (data.success) {
//         setImages((prevImages) => prevImages.filter((img) => img.id !== id));
//       } else {
//         setUploadStatus('Failed to delete image.');
//       }
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       setUploadStatus('Error deleting image.');
//     }
//   };
  
//   const filteredImages = images.filter((img) => img.referenceId === referenceId);

//   return (
//     <div className="">
//       <div className=" flex-wrap  items-center  ">
//         <div className="p-5">
//           {filteredImages.length > 0 ? (
//             filteredImages.map((img) => (
//               <div key={img.id} className="relative w-28 h-28 object-contain  overflow-hidden rounded-lg shadow-md ">
                
//                 <Image
//                     className="w-full h-28  border rounded-lg"
//                     src={`${basePath}${img.filePath}`}
//                     alt={img.altText}
//                     onError={(e) => e.target.src = '/fallback/image.webp'}
//                     style={{
//                       backgroundImage: 'linear-gradient(to bottom, rgba(21, 29, 44, 1.1), rgba(14, 26, 51, 0))'
//                     }}
//                   />

                
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 pr-10">
//                   <p className="text-xs">{img.altText}</p>
//                   <button
//                     onClick={() => handleDelete(img.id)}
//                     className="absolute -top-8 right-2 text-xs text-white bg-[#F80F10] p-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="relative w-28 h-28 object-contain  overflow-hidden rounded-lg shadow-md ">

//               <Image
//                     className="w-28 h-28 object-contain  border rounded-lg"
//                     src="/fallback/image.webp"
//                     alt="fallbacki image"
//                     onError={(e) => e.target.src = '/fallback/image.webp'}
//                     style={{
//                       backgroundImage: 'linear-gradient(to bottom, rgba(21, 29, 44, 1.1), rgba(14, 26, 51, 0))'
//                     }}
//                   />
//             </div>
            

//           )}
//         </div>
//         <form className="space-y-4 max-w-[320px] ">
//           <div className="flex flex-col space-y-2 max-w-40">
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="border block w-full text-sm text-slate-500
//                 file:mr-4 file:py-2 file:px-2
//                 file:rounded-full file:border-0
//                 file:text-xs file:font-semibold
//                 file:w-30
//                 file:bg-violet-50 file:text-blue-950
//                 hover:file:bg-violet-100 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               value={altText}
//               onChange={(e) => setAltText(e.target.value)}
//               placeholder="Enter alt text"
//               className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={handleUpload}
//               className="w-full py-1 bg-gray-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className='flex pl-2'>
//         {/* {uploadStatus && <p className="text-center text-cyan-600 text-sm">{uploadStatus}</p>} */}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;







import Image from 'next/image';
import { useState, useEffect } from 'react';

const ImageUploader = ({ referenceType, referenceId: propReferenceId }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [images, setImages] = useState([]);
  const [editImageId, setEditImageId] = useState(null);

  // Static referenceId
  const referenceId = propReferenceId || 1;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/images/${referenceType}?referenceId=${referenceId}`);
        const data = await res.json();
        if (data.success) {
          setImages(data.images);
        } else {
          setUploadStatus('Failed to fetch images.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setUploadStatus('Error fetching images.');
      }
    };

    fetchImages();
  }, [referenceType, referenceId]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image || !altText || !referenceId) {
      setUploadStatus('Please select an image, provide alt text');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('altText', altText);
    formData.append('referenceId', referenceId);

    try {
      const res = await fetch(`/api/upload/${referenceType}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadStatus('Image uploaded successfully!');
        const updatedRes = await fetch(`/api/images/${referenceType}`);
        const updatedData = await updatedRes.json();
        if (updatedData.success) {
          setImages(updatedData.images);
        }
        setImage(null);
        setAltText('');
      } else {
        setUploadStatus('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image.');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/images/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      } else {
        setUploadStatus('Failed to delete image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setUploadStatus('Error deleting image.');
    }
  };

  const handleEdit = (img) => {
    setEditImageId(img.id);
    setAltText(img.altText);
    setImage(null); // Clear any new file if editing only the alt text
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!altText) {
      setUploadStatus('Please provide alt text.');
      return;
    }

    const formData = new FormData();
    formData.append('altText', altText);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`/api/images/update/${referenceType}/${editImageId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadStatus('Image updated successfully!');
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.id === editImageId
              ? { ...img, altText: data.image.altText, filePath: data.image.filePath }
              : img
          )
        );
        setEditImageId(null);
        setAltText('');
        setImage(null);
      } else {
        setUploadStatus('Failed to update image.');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setUploadStatus('Error updating image.');
    }
  };

  const filteredImages = images.filter((img) => img.referenceId === referenceId);

  return (
    <div>
      <div className="flex-wrap items-center">
        <div className="p-5">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <div key={img.id} className="relative w-28 h-28 object-contain overflow-hidden rounded-lg shadow-md">
                <Image
                  className="w-full h-28 border rounded-lg"
                  src={`${basePath}${img.filePath}`}
                  alt={img.altText}
                  onError={(e) => (e.target.src = '/fallback/image.webp')}
                  height={20}
                  width={20}
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(21, 29, 44, 1.1), rgba(14, 26, 51, 0))',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 pr-10">
                  <p className="text-xs">{img.altText}</p>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute -top-8 right-2 text-xs text-white bg-[#F80F10] p-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(img)}
                    className="absolute -top-8 left-2 text-xs text-white bg-blue-500 p-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="relative w-28 h-28 object-contain overflow-hidden rounded-lg shadow-md">
              <Image
                className="w-28 h-28 object-contain border rounded-lg"
                src="/fallback/image.webp"
                alt="fallback image"
                onError={(e) => (e.target.src = '/fallback/image.webp')}
                height={20}
                  width={20}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(21, 29, 44, 1.1), rgba(14, 26, 51, 0))',
                }}
              />
            </div>
          )}
        </div>
        <form className="space-y-4 max-w-[320px]">
          <div className="flex flex-col space-y-2 max-w-40">
            <input
              type="file"
              onChange={handleFileChange}
              className="border block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:w-30 file:bg-violet-50 file:text-blue-950 hover:file:bg-violet-100 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Enter alt text"
              className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={editImageId ? handleUpdate : handleUpload}
              className="w-full py-1 bg-gray-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editImageId ? 'Update' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
      <div className="flex pl-2">
        {uploadStatus && <p className="text-center text-cyan-600 text-sm">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;