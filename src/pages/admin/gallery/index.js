// import { useState } from 'react';
// import path from 'path';
// import { MdDeleteForever } from "react-icons/md";
// import Layout from '@/components/Admin/common/Layout';
// import Image from 'next/image';

// export async function getStaticProps() {
//   const fs = require('fs'); // Dynamically import fs inside getStaticProps
//   const uploadsDir = path.join(process.cwd(), 'uploads'); // Ensure this path is correct

//   const getAllImages = (dir) => {
//     let results = [];
//     const list = fs.readdirSync(dir);
//     list.forEach((file) => {
//       const filePath = path.join(dir, file);
//       const stat = fs.statSync(filePath);
//       if (stat && stat.isDirectory()) {
//         results = results.concat(getAllImages(filePath)); // Recursively get images
//       } else if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
//         // Construct the relative path starting from '/uploads'
//         const relativePath = path.join('/uploads', path.relative(path.join(process.cwd(), 'public', 'uploads'), filePath));
//         results.push(relativePath); // Store path relative to 'public/uploads'
//       }
//     });
//     return results;
//   };

//   const images = getAllImages(uploadsDir);

//   return {
//     props: {
//       images, // Pass image paths to the page component
//     },
//   };
// }

// const Gallery = ({ images }) => {
//   const [imageList, setImageList] = useState(images);

//   // Function to delete image
//   const handleDeleteImage = async (imagePath) => {
//     console.log("delete image",imagePath)
//     const confirmed = prompt('Type "yes" to confirm deletion:');
//     if (confirmed !== 'yes') {
//       alert('Deletion canceled.');
//       return;
//     }


//     try {
//       const response = await fetch('/api/gallery/delete-image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ imagePath }),
//       });

//       if (response.ok) {
//         // Remove the image from the state after successful deletion
//         setImageList(imageList.filter((image) => image !== imagePath));
//         alert('Image deleted successfully.');
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message , 'Error deleting image. ',imagePath);
//       }
//     } catch (error) {
//       alert('Error deleting image.',imagePath);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-bold text-gray-700 mb-6">Image Gallery</h2>

//         <div className="flex flex-wrap gap-6">
//           {imageList.map((image, index) => (
//             <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg relative">
//               {/* Use the relative path from '/uploads' */}
//               <Image
//                 src={image}  // Now, the src is something like "/uploads/39cc51f0-5dfe-4d51-83cc-119620b5afbd/..."
//                 alt={`Image ${index + 1}`}
//                 className="w-28 h-28 object-cover"
//               />
//               <div className="flex justify-between items-center absolute top-0 right-0 p-1">
//                 <button
//                   onClick={() => handleDeleteImage(image)}
//                   className="bg-red-500 text-white rounded-md"
//                 >
//                   <MdDeleteForever size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Gallery;



import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index