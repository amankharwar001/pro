import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import ImageUploader from './ImageUploader';
import CommonImageUpload from './CommonImageUpload';
import StatusManager from './status';

const Section3Form = ({ setActiveBox, sectionsStatusHandle }) => {
    const [sectionData, setSectionData] = useState(null);
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [agentBrief, setAgentBrief] = useState('');
    const [leadNo, setLeadNo] = useState('');
    const [leadName, setLeadName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState(false);
    const [imageStatus, setImageStatus] = useState({});
    const [multiImageStatus, setMultiImageStatus] = useState(false);

    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      };

    useEffect(() => {
        const allImagesUploaded =
            imageStatus.home_section3_1 === true && imageStatus.home_section3_2 === true;

        if (apiStatus && allImagesUploaded && multiImageStatus) {
            sectionsStatusHandle(true);
        } else {
            sectionsStatusHandle(false);
        }
    }, [apiStatus, imageStatus, multiImageStatus]);

    // Fetch Section3 data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/homepage/section3', {
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  });
                const result = await response.json();

                if (result.success && result.data) {
                    setSectionData(result.data);
                    setHeading(result.data.heading);
                    setContent(result.data.content);
                    setAgentBrief(result.data.agentBrief);
                    setLeadNo(result.data.leadNo);
                    setLeadName(result.data.leadName);
                    setApiStatus(true);
                } else {
                    setError('Section not found');
                }
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/homepage/section3', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                },
                body: JSON.stringify({
                    heading,
                    content,
                    agentBrief,
                    leadNo,
                    leadName,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setSectionData(data.data);
                setHeading(data.data.heading);
                setContent(data.data.content);
                setAgentBrief(data.data.agentBrief);
                setLeadNo(data.data.leadNo);
                setLeadName(data.data.leadName);
                setError('');
                alert('Section updated successfully!');
                setActiveBox(4);
                setApiStatus(true);
            } else {
                setError(data.message || 'Error updating section');
            }
        } catch (error) {
            setError('Error updating data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 mx-auto bg-slate-50 shadow-inner rounded-lg">
            <div className="flex justify-end pb-5">
                <StatusManager sectionName={'homepage_section3'} />
            </div>

            <div className="md:flex block gap-5 items-center">
                <div className="flex gap-10 flex-wrap mb-5">
                    <ImageUploader
                        referenceType={'home_section3_1'}
                        width={350}
                        height={700}
                        setImageStatus={(status) =>
                            setImageStatus((prevState) => ({ ...prevState, home_section3_1: status }))
                        }
                    />
                    <ImageUploader
                        referenceType={'home_section3_2'}
                        width={250}
                        height={410}
                        setImageStatus={(status) =>
                            setImageStatus((prevState) => ({ ...prevState, home_section3_2: status }))
                        }
                    />
                </div>
                <div className="border bg-slate-100 rounded-lg overflow-hidden max-w-full grow">
                    <div className="p-5">
                        <span className="font-semibold opacity-40">Agent Brief Images</span>
                        <CommonImageUpload referenceType={'homepage_section_3'} imageCount={4} setMultiImageStatus={setMultiImageStatus} />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="pt-5">
                <div className="mb-4">
                    <label htmlFor="heading" className="block text-sm font-medium font-semibold text-gray-700">
                        Heading
                    </label>
                    <input
                        type="text"
                        id="heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* React Quill Editor for Content */}
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium font-semibold text-gray-700">
                        Content
                    </label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        theme="snow"
                        className="bg-white border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4 mt-2">
                    <label htmlFor="agentBrief" className="block text-sm font-medium font-semibold text-gray-700">
                        Agent Brief
                    </label>
                    <textarea
                        id="agentBrief"
                        value={agentBrief}
                        onChange={(e) => setAgentBrief(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>

                <div className="flex gap-5">
                    <div className="mb-4 grow">
                        <label htmlFor="leadNo" className="block text-sm font-medium font-semibold text-gray-700">
                            Lead Number
                        </label>
                        <input
                            type="text"
                            id="leadNo"
                            value={leadNo}
                            onChange={(e) => setLeadNo(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 grow">
                        <label htmlFor="leadName" className="block text-sm font-medium font-semibold text-gray-700">
                            Lead Name
                        </label>
                        <input
                            type="text"
                            id="leadName"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                    {isLoading ? 'Updating...' : 'Update Section 3'}
                </button>
            </form>
        </div>
    );
};

export default Section3Form;
