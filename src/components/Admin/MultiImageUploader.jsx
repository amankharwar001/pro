import Image from 'next/image';
import { useEffect, useState } from 'react';

const MultiImageUploader = ({ section }) => {
  const [sectionList, setSectionList] = useState(['section1']);
  const [images, setImages] = useState({});
  const [altTexts, setAltTexts] = useState({});
  const [isUploaded, setIsUploaded] = useState({});
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageData, setImageData] = useState()

  useEffect(() => {
    const fetchImages = async (sectionName) => {
      try {
        const res = await fetch(`/api/multiimages/${sectionName}`);
        const data = await res.json();
        setImageData(data?.images)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(section)
    
  }, [section,isUploaded])


  // Handle file selection change
  const handleFileChange = (e, sectionName) => {
    const files = e.target.files;
    setImages((prevImages) => ({
      ...prevImages,
      [sectionName]: files,
    }));
  };

  // Handle alt text change for a specific section
  const handleAltTextChange = (e, sectionName) => {
    setAltTexts((prevAltTexts) => ({
      ...prevAltTexts,
      [sectionName]: e.target.value,
    }));
  };

  // Handle image upload for a specific section
  const handleUpload = async (e, sectionName) => {
    e.preventDefault();

    const selectedImages = images[sectionName];
    const altText = altTexts[sectionName];

    if (!selectedImages || !selectedImages.length || !altText) {
      setUploadStatus('Please select an image and provide alt text.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }
    formData.append('altText', altText);

    try {
      const res = await fetch(`/api/multiupload/${section}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadStatus('Image uploaded successfully!');
        setIsUploaded((prev) => ({
          ...prev,
          [sectionName]: true, // Mark as uploaded
        }));
        setImages((prevImages) => ({
          ...prevImages,
          [sectionName]: [], // Clear the selected images
        }));
        setAltTexts((prevAltTexts) => ({
          ...prevAltTexts,
          [sectionName]: '', // Reset alt text
        }));
      } else {
        setUploadStatus('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image.');
    }
  };

  // Handle deleting an image for a specific section
  const handleDelete = async (sectionName, id) => {
    try {
      const res = await fetch(`/api/multiimages/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        setImages((prevImages) => ({
          ...prevImages,
          [sectionName]: prevImages[sectionName].filter((img) => img.id !== id),
        }));
      } else {
        setUploadStatus('Failed to delete image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setUploadStatus('Error deleting image.');
    }
  };

  // Handle adding a new section
  const handleAddSection = () => {
    const newSection = `section${sectionList.length + 1}`;
    setSectionList([...sectionList, newSection]);

    setImages((prevImages) => ({
      ...prevImages,
      [newSection]: [],
    }));
    setAltTexts((prevAltTexts) => ({
      ...prevAltTexts,
      [newSection]: '',
    }));
    setIsUploaded((prev) => ({
      ...prev,
      [newSection]: false,
    }));
  };

  return (
    <div className="w-full">
      {sectionList.map((sectionName) => (
        <div key={sectionName} className="mb-8">
          <h2 className="text-xl font-semibold">{sectionName}</h2>

          {/* Image Display Section */}
          <div className="flex items-center gap-5">
            <div className="">
              {images[sectionName] && images[sectionName].length > 0 ? (
                Array.from(images[sectionName]).map((img, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                    <div>
                      <Image
                        className="w-44 h-44 object-contain border rounded-lg"
                        src={URL.createObjectURL(img)}
                        alt={altTexts[sectionName] || 'Image'}
                        height={20}
                  width={20}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 pr-10">
                      <p className="text-sm">{altTexts[sectionName]}</p>
                      <button
                        onClick={() => handleDelete(sectionName, img.name)}
                        className="absolute -top-8 right-2 text-white bg-red-500 p-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center w-44 h-44 shadow-lg rounded-lg border pt-[76px] text-gray-600">
                  No images available
                </p>
              )}
            </div>

            {/* Image Upload Form */}
            <form onSubmit={(e) => handleUpload(e, sectionName)} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, sectionName)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={altTexts[sectionName] || ''}
                  onChange={(e) => handleAltTextChange(e, sectionName)}
                  placeholder="Enter alt text"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isUploaded[sectionName] ? 'Update' : 'Upload'}
                </button>
              </div>
              {uploadStatus && (
                <p className="text-center text-gray-600">{uploadStatus}</p>
              )}
            </form>
          </div>
        </div>
      ))}

      {/* Button to add a new section */}
      <button
        onClick={handleAddSection}
        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add New Section
      </button>
    </div>
  );
};

export default MultiImageUploader;
