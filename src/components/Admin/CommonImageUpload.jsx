import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { MdEditSquare } from "react-icons/md";
import Image from "next/image";

const CommonImageUpload = ({ referenceType, imageCount,setMultiImageStatus }) => {
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
          setMultiImageStatus(true) //this is show image is avaible or not more than 0 like 1 images alleast have then working
        } else {
          setUploadStatus("Failed to fetch images.");
          setMultiImageStatus(false)
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

    if (!image ) {
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
        setMultiImageStatus(true);
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
        setMultiImageStatus(images.length - 1 > 0);
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
    <div className="">
      {/* Uploaded Images */}
      <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-md overflow-x-auto">
        {images.length > 0 ? (
          images.map((img) => ( 
            <div
              key={img.id}
              className="relative min-w-24 h-24 overflow-hidden border bg-white rounded-md shadow-md flex flex-col items-center justify-end"
            >
              <Image
                className="min-w-24 h-24 object-cover"
                src={`${basePath}${img.filePath}`}
                alt={img.altText}
                height={20}
                  width={20}
              />
              <p className="text-admin_image text-gray-600 mt-1">{img.altText}</p>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute -top-1 -right-1 text-xs"
              >
                <TiDelete className="text-black hover:text-red-600" size={23} />
              </button>
              <button
                onClick={() => handleEdit(img)}
                className="absolute bottom-1 right-1 text-xs text-blue-500 hover:text-blue-600"
              >
                <MdEditSquare size={20} />
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
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            disabled={images.length >= imageCount && !editImageId}
          >
            {editImageId ? "Image Update" : "Image Upload"}
          </button>
        </div>
        {uploadStatus && <p className="mt-2 text-gray-600">{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default CommonImageUpload;
