


import { useState } from 'react';
import path from 'path';
import { MdDeleteForever } from "react-icons/md";
import Layout from '@/components/Admin/common/Layout';
const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

export async function getServerSideProps() {
  const fs = require('fs'); // Dynamically import fs inside getServerSideProps
  const uploadsDir = path.join(process.cwd(), 'uploads'); // Ensure this path is correct

  const getAllImages = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllImages(filePath)); // Recursively get images
      } else if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
        // Construct the relative path starting from '/uploads'
        const relativePath = path.join('/uploads', path.relative(path.join(process.cwd(), 'public', 'uploads'), filePath));
        results.push(relativePath); // Store path relative to 'public/uploads'
      }
    });
    return results;
  };

  const images = getAllImages(uploadsDir);

  return {
    props: {
      images, // Pass image paths to the page component
    },
  };
}

const Gallery = ({ images }) => {
  const [imageList, setImageList] = useState(images);

  // Function to delete image
  const handleDeleteImage = async (imagePath) => {
    const confirmed = prompt('Type "yes" to confirm deletion:');
    if (confirmed !== 'yes') {
      alert('Deletion canceled.');
      return;
    }

    try {
      const response = await fetch('/api/gallery/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the image from the state after successful deletion
        setImageList(imageList.filter((image) => image !== imagePath));
        alert('Image deleted successfully.');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image.');
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Image Gallery</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {imageList.map((image, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg relative">
              {/* Display image */}
              <img
                src={`${baseUrl}${image}`} // Display the image from the uploads folder
                alt={`Image ${index + 1}`}
                className="w-24 h-24 object-cover"
                height={100}
                width={100}
              />
              <div className="flex justify-between items-center absolute top-0 right-0 p-1">
                <button
                  onClick={() => handleDeleteImage(image)}
                  className="bg-red-500 text-white rounded-md"
                >
                  <MdDeleteForever size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
