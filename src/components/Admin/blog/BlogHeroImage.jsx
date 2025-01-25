// import { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import ImageUploader from "../ImageUploader";

// const BlogHeroImage = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     // Function to toggle modal visibility
//     const toggleModal = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="relative">
//             {/* Button to open the modal */}
//             <button
//                 onClick={toggleModal}
//                 className="px-4 py-2 bg-gray-800 hover:bg-slate-700 text-white rounded"
//             >
//                Main Image
//             </button>

//             {/* Modal */}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-gray-500  bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white  p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-out opacity-100 scale-100 w-[20%] m-auto">
//                         <RxCross2 onClick={toggleModal} className="absolute top-2 right-2 hover:text-red-600 cursor-pointer" size={20} />
//                         <div className="mx-auto  flex justify-center">
//                             <ImageUploader referenceType={"blog_herosection_image"} width={1200} height={288}/>
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BlogHeroImage;



import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import ImageUploader from "../ImageUploader";

const BlogHeroImage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [headingName, setHeadingName] = useState(""); // Input box value
    const [loading, setLoading] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) fetchHeading(); // Fetch heading when modal opens
    };

    // Fetch the heading from the API
    const fetchHeading = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/blog/blogheading");
            if (response.ok) {
                const data = await response.json();
                setHeadingName(data.headingName || "");
            }
        } catch (error) {
            console.error("Error fetching heading:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update the heading using the API
    const updateHeading = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/blog/blogheading", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ headingName }),
            });
            if (response.ok) {
                alert("Heading updated successfully!");
            } else {
                alert("Failed to update heading.");
            }
        } catch (error) {
            console.error("Error updating heading:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            {/* Button to open the modal */}
            <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-800 hover:bg-slate-700 text-white rounded"
            >
                Main Image
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] m-auto">
                        <RxCross2
                            onClick={toggleModal}
                            className="absolute top-2 right-2 hover:text-red-600 cursor-pointer"
                            size={20}
                        />
                        <div className="mx-auto flex flex-col gap-4 justify-center">
                            <ImageUploader referenceType="blog_herosection_image" width={1200} height={288} />
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heading Name</label>
                                <input
                                    type="text"
                                    value={headingName}
                                    onChange={(e) => setHeadingName(e.target.value)}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    placeholder="Enter heading name"
                                    disabled={loading}
                                />
                            </div>
                            <button
                                onClick={updateHeading}
                                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Heading"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogHeroImage;
