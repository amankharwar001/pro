// import { useState, useEffect } from "react";
// import { TiDelete } from "react-icons/ti";
// import { MdEditSquare } from "react-icons/md";


// const CommonImageUpload = ({ referenceType, imageCount}) => {
//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
//   const [image, setImage] = useState(null);
//   const [altText, setAltText] = useState("");
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [images, setImages] = useState([]);
//   const [referenceId, setReferenceId] = useState(1); // Start from 1 for unique numeric referenceId
//   const [editImageId, setEditImageId] = useState(null); // To keep track of which image is being edited

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch(`/api/images/${referenceType}`);
//         const data = await res.json();
//         if (data.success) {
//           setImages(data.images);

//           // Dynamically calculate the next referenceId based on the current number of images
//           const nextReferenceId = data.images.length + 1; // Incrementing referenceId for the next image
//           setReferenceId(nextReferenceId);
//         } else {
//           setUploadStatus("Failed to fetch images.");
//         }
//       } catch (error) {
//         console.error("Error fetching images:", error);
//         setUploadStatus("Error fetching images.");
//       }
//     };

//     fetchImages();
//   }, [referenceType, imageCount]);

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!image || !altText) {
//       setUploadStatus("Please select an image and provide alt text.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("altText", altText);
//     formData.append("referenceId", referenceId);

//     try {
//       const res = await fetch(`/api/upload/${referenceType}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         setUploadStatus("Image uploaded successfully!");
//         setImages((prev) => [...prev, data.image]);

//         // Resetting input fields after successful upload
//         setImage(null); // Clear image input
//         setAltText(""); // Clear alt text input

//         // Update referenceId to the next unique number
//         setReferenceId((prev) => prev + 1); // Increment referenceId after each upload
//       } else {
//         setUploadStatus("Failed to upload image.");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setUploadStatus("Error uploading image.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/images/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (data.success) {
//         setImages((prev) => prev.filter((img) => img.id !== id));
//       } else {
//         setUploadStatus("Failed to delete image.");
//       }
//     } catch (error) {
//       console.error("Error deleting image:", error);
//       setUploadStatus("Error deleting image.");
//     }
//   };

//   const handleEdit = (img) => {
//     setImage(null); // Reset image input (optional, if user doesn't want to change image)
//     setAltText(img.altText);
//     setEditImageId(img.id); // Set the current image being edited
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!altText) {
//       setUploadStatus("Please provide alt text.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("altText", altText); // Only send updated alt text if no new image
//     if (image) {
//       formData.append("image", image); // Include image if the user selects a new one
//     }

//     try {
//       const res = await fetch(`/api/update/${referenceType}/${editImageId}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         setUploadStatus("Image updated successfully!");
//         setImages((prev) =>
//           prev.map((img) =>
//             img.id === editImageId ? { ...img, altText: data.image.altText, filePath: data.image.filePath } : img
//           )
//         );

//         // Reset fields after update
//         setImage(null); // Clear the image if not updated
//         setAltText(""); // Clear alt text after update
//         setEditImageId(null); // Reset the edit mode
//       } else {
//         setUploadStatus("Failed to update image.");
//       }
//     } catch (error) {
//       console.error("Error updating image:", error);
//       setUploadStatus("Error updating image.");
//     }
//   };

//   return (
//     <div className="">
//       {/* Uploaded Images Display */}
//       <div className="flex items-center justify-start gap-4 p-4 bg-gray-300 rounded-lg overflow-x-auto">
//         {images.length > 0 ? (
//           images.map((img) => (
//             <div
//               key={img.id}
//               className="relative w-24 h-24 overflow-hidden border  bg-white rounded-md shadow-md flex flex-col items-center justify-end"
//             >
//               <Image
//                 className="w-full h-24 object-cover"
//                 src={`${basePath}${img.filePath}`}
//                 alt={img.altText}
//               />
//               <p className="text-sm text-gray-600 mt-1">{img.altText}</p>
//               <button
//                 onClick={() => handleDelete(img.id)}
//                 className="absolute -top-1 -right-1  text-xs ">
//                 <TiDelete className="text-black hover:text-red-600"  size={23}/>

//               </button>
//               <button
//                 onClick={() => handleEdit(img)}
//                 className="absolute -bottom-1 -right-1 p-1 text-xs text-blue-500 rounded hover:text-blue-600"
//               >
//                 <MdEditSquare   size={23}/>

//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No images available</p>
//         )}
//       </div>

//       {/* Upload Form */}
//       <form className="mt-4">
//         <div className="flex flex-col space-y-3">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="p-2 border border-gray-300 rounded-md"
//             disabled={images.length >= imageCount && !editImageId} // Disable input if limit is reached and no edit mode
//           />
//           <input
//             type="text"
//             value={altText}
//             onChange={(e) => setAltText(e.target.value)}
//             placeholder="Enter alt text"
//             className="p-2 border border-gray-300 rounded-md"
//             disabled={images.length >= imageCount && !editImageId} // Disable if limit is reached and no edit mode
//           />
//           <button
//             type="button"
//             onClick={editImageId ? handleUpdate : handleUpload}
//             className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//             disabled={images.length >= imageCount && !editImageId} // Disable if the limit is reached
//           >
//             {editImageId ? "Update" : "Upload"}
//           </button>
//         </div>
//         {uploadStatus && <p className="mt-2 text-gray-600">{uploadStatus}</p>}
//       </form>
//     </div>
//   );
// };

// export default CommonImageUpload;

















import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { MdEditSquare } from "react-icons/md";
import Image from "next/image";

const CommonImageUpload = ({ referenceType, imageCount }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [images, setImages] = useState([]);
  const [referenceId, setReferenceId] = useState(1);
  const [editImageId, setEditImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/images/${referenceType}`);
        const data = await res.json();
        if (data.success) {
          setImages(data.images);
          setReferenceId(data.images.length + 1); // Set next unique referenceId
        } else {
          setUploadStatus("Failed to fetch images.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setUploadStatus("Error fetching images.");
      }
    };

    fetchImages();
  }, [referenceType, imageCount]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image || !altText) {
      setUploadStatus("Please select an image and provide alt text.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("altText", altText);
    formData.append("referenceId", referenceId);

    try {
      const res = await fetch(`/api/upload/${referenceType}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setUploadStatus("Image uploaded successfully!");
        setImages((prev) => [...prev, data.image]);
        setImage(null);
        setAltText("");
        setReferenceId((prev) => prev + 1);
      } else {
        setUploadStatus("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Error uploading image.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        setUploadStatus("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setUploadStatus("Error deleting image.");
    }
  };

  const handleEdit = (img) => {
    setImage(null);
    setAltText(img.altText);
    setEditImageId(img.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!altText) {
      setUploadStatus("Please provide alt text.");
      return;
    }

    const formData = new FormData();
    formData.append("altText", altText);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`/api/images/update/${referenceType}/${editImageId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setUploadStatus("Image updated successfully!");
        setImages((prev) =>
          prev.map((img) =>
            img.id === editImageId
              ? { ...img, altText: data.image.altText, filePath: data.image.filePath }
              : img
          )
        );
        setImage(null);
        setAltText("");
        setEditImageId(null);
      } else {
        setUploadStatus("Failed to update image.");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      setUploadStatus("Error updating image.");
    }
  };

  return (
    <div className="container mx-auto">
      {/* Uploaded Images */}
      <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-md overflow-x-auto">
        {images.length > 0 ? (
          images.map((img) => (
            <div
              key={img.id}
              className="relative w-24 h-24 overflow-hidden border bg-white rounded-md shadow-md flex flex-col items-center justify-end"
            >
              <Image
                className="w-full h-24 object-cover"
                src={`${basePath}${img.filePath}`}
                alt={img.altText}
                height={20}
                  width={20}
              />
              <p className="text-sm text-gray-600 mt-1">{img.altText}</p>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute -top-1 -right-1 text-xs"
              >
                <TiDelete className="text-black hover:text-red-600" size={23} />
              </button>
              <button
                onClick={() => handleEdit(img)}
                className="absolute -bottom-1 -right-1 text-xs text-blue-500 hover:text-blue-600"
              >
                <MdEditSquare size={23} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No images available</p>
        )}
      </div>

      {/* Upload Form */}
      <form className="mt-4">
        <div className="flex flex-col space-y-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
            disabled={images.length >= imageCount && !editImageId}
          />
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Enter alt text"
            className="p-2 border rounded-md"
            disabled={images.length >= imageCount && !editImageId}
          />
          <button
            type="button"
            onClick={editImageId ? handleUpdate : handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={images.length >= imageCount && !editImageId}
          >
            {editImageId ? "Update" : "Upload"}
          </button>
        </div>
        {uploadStatus && <p className="mt-2 text-gray-600">{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default CommonImageUpload;
