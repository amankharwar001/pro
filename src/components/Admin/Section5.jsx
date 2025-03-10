import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import StatusManager from './status';

const Section5Form = ({ setActiveBox, sectionsStatusHandle }) => {
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [boxes, setBoxes] = useState([
        { heading: '', content: '' },
        { heading: '', content: '' },
        { heading: '', content: '' },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiStatus, setApiStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState({});
    console.log("Image Status: ", imageStatus);


    useEffect(() => {
        const allImagesUploaded = imageStatus.homepage_section5_1=== true && imageStatus.homepage_section5_2=== true  && imageStatus.homepage_section5_3;

        if (apiStatus && allImagesUploaded ) {
            console.log("All conditions met: API and images are complete.");
            sectionsStatusHandle(true);
        } else {
            console.log("Conditions not met: Updating sections status to false.");
            sectionsStatusHandle(false);
        }
    }, [apiStatus, imageStatus]);

    useEffect(() => {
        const fetchSectionData = async () => {
            try {
                const response = await fetch('/api/homepage/section5', {
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  });
                const result = await response.json();

                if (response.ok && result.success) {
                    const { heading, content, boxes } = result.data;
                    setHeading(heading || '');
                    setContent(content || '');
                    setBoxes(boxes || [
                        { heading: '', content: '' },
                        { heading: '', content: '' },
                        { heading: '', content: '' },
                    ]);
                    setApiStatus(true)
                } else {
                    console.warn('Failed to fetch section data');
                }
            } catch (error) {
                console.error(error);
                
            }
        };

        fetchSectionData();
    }, []);

    const handleBoxChange = (index, key, value) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index][key] = value;
        setBoxes(updatedBoxes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            heading,
            content,
            boxes,
        };

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/homepage/section5', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                 },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                alert('Section updated successfully!');
                setActiveBox(6)
                setApiStatus(true)
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error updating section');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="shadow-inner bg-gray-50">
            <div className='flex justify-end pt-5 px-5'>
                <StatusManager sectionName={"homepage_section5"} />
            </div>
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Section 5</h2> */}


            <form className="space-y-6  p-4 rounded-lg">
                {/* Heading */}
                <div>
                    <label className="block text-sm font-semibold  text-gray-700 mb-1">Section Heading</label>
                    <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter section heading"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-semibold  text-gray-700 mb-1">Section Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        rows="4"
                        placeholder="Enter section content"
                    />
                </div>

                {/* Boxes */}
                <div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-4 ">Boxes</h3>
                    <div className=" space-y-6">
                        {boxes.map((box, index) => (
                            <div key={index} className="p-4 bg-white shadow-md rounded-md border border-gray-200 grow">
                                <h4 className="text-md font-medium text-gray-700 mb-2">Box {index + 1}</h4>
                                <div>

                                    <ImageUploader deleteStatus={1}  referenceType={`homepage_section5_${index + 1}`} width={200} height={100}
                                        setImageStatus={(status) =>
                                            setImageStatus(prevState => ({
                                                ...prevState,
                                                [`homepage_section5_${index + 1}`]: status 
                                            }))
                                        }
                                    />
                                    <div className="">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Box Heading</label>
                                            <input
                                                type="text"
                                                value={box.heading}
                                                onChange={(e) => handleBoxChange(index, 'heading', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={`Enter heading for Box ${index + 1}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Box Content</label>
                                            <textarea
                                                value={box.content}
                                                onChange={(e) => handleBoxChange(index, 'content', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                rows="3"
                                                placeholder={`Enter content for Box ${index + 1}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                         className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Section'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Section5Form;
