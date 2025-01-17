import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ImageUploader from "../ImageUploader";

const BlogHeroImage = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
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
                <div className="fixed inset-0 bg-gray-500  bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white  p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-out opacity-100 scale-100 w-[20%] m-auto">
                        <RxCross2 onClick={toggleModal} className="absolute top-2 right-2 hover:text-red-600 cursor-pointer" size={20} />
                        <div className="mx-auto  flex justify-center">
                            <ImageUploader referenceType={"blog_herosection_image"} width={1200} height={288}/>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogHeroImage;
