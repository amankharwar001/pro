import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';
import CommonImageUpload from './CommonImageUpload';

const Section3Form = ({setActiveBox}) => {
    const [sectionData, setSectionData] = useState(null);
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [agentBrief, setAgentBrief] = useState('');
    const [leadNo, setLeadNo] = useState('');
    const [leadName, setLeadName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Section3 data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/homepage/section3');
                const result = await response.json();

                if (result.success && result.data) {
                    setSectionData(result.data);
                    setHeading(result.data.heading);
                    setContent(result.data.content);
                    setAgentBrief(result.data.agentBrief);
                    setLeadNo(result.data.leadNo);
                    setLeadName(result.data.leadName);
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
                // Directly update the state with new data without refetching
                setSectionData(data.data);
                setHeading(data.data.heading);
                setContent(data.data.content);
                setAgentBrief(data.data.agentBrief);
                setLeadNo(data.data.leadNo);
                setLeadName(data.data.leadName);
                setError('');
                alert('Section updated successfully!');
                setActiveBox(4)
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
            {/* <h2 className="text-xl font-semibold mb-4"> Section 3</h2> */}
            <div className='flex gap-10 flex-wrap mb-5'>
                <ImageUploader referenceType={"home_section3_1"} />
                <ImageUploader referenceType={"home_section3_2"}/>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            
                <form onSubmit={handleSubmit} className='pt-5'>
                    <div className="mb-4">
                        <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
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

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <div className='border bg-slate-100  rounded-lg overflow-hidden '>
                        <div className='p-5'>
                            <span className='font-semibold opacity-40'> Agent Brief Images</span>
                            <CommonImageUpload referenceType={"homepage_section_3"} imageCount={4} />
                        </div>
                    </div>

                    <div className="mb-4 mt-2">
                        <label htmlFor="agentBrief" className="block text-sm font-medium text-gray-700">
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
                    <div className='flex gap-5 '>
                        <div className="mb-4 grow">
                            <label htmlFor="leadNo" className="block text-sm font-medium text-gray-700">
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
                            <label htmlFor="leadName" className="block text-sm font-medium text-gray-700">
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



                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Update Section 3
                    </button>
                </form>
            
        </div>
    );
};

export default Section3Form;
