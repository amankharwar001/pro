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
    };

    // Fetch the heading from the API
    const fetchHeading = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/blog/blogheading",{
                headers: {
                 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                },
              });
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
                headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
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
                onClick={() => {
                    toggleModal();
                    if (!isOpen) fetchHeading(); // Fetch heading when modal opens
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-slate-700 text-white rounded"
            >
                Main Image
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto m-4 relative">
                        <RxCross2
                            onClick={toggleModal}
                            className="absolute top-2 right-2 hover:text-red-600 cursor-pointer"
                            size={20}
                        />
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <ImageUploader referenceType="blog_herosection_image" width={1200} height={288} />
                            <div className="w-full"> 
                                <label className="block text-sm font-medium text-gray-700">Heading Name</label>
                                <input
                                    type="text"
                                    value={headingName}
                                    onChange={(e) => setHeadingName(e.target.value)}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter heading name"
                                    disabled={loading}
                                />
                            </div>
                            <button
                                onClick={updateHeading}
                                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300" disabled={loading}
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
