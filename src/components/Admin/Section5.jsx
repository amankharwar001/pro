import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

const Section5Form = ({setActiveBox}) => {
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [boxes, setBoxes] = useState([
        { heading: '', content: '' },
        { heading: '', content: '' },
        { heading: '', content: '' },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchSectionData = async () => {
            try {
                const response = await fetch('/api/homepage/section5');
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
                } else {
                    alert('Failed to fetch section data');
                }
            } catch (error) {
                console.error(error);
                alert('Error fetching data');
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                alert('Section updated successfully!');
                setActiveBox(6)
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
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Section 5</h2> */}


            <form className="space-y-6  p-4 rounded-lg">
                {/* Heading */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Content</label>
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

                                <ImageUploader referenceType={`homepage_section5_${index+1}`} />
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
                        className="w-full py-3 px-4 bg-blue-600 text-white font-medium text-lg rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Section'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Section5Form;