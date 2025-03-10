import { useState, useEffect } from 'react';
import StatusManager from '../status';

const AboutSection5Form = ({setActiveBox,sectionsStatusHandle}) => {
    const [formData, setFormData] = useState([
        { counting: '', text: '' },
        { counting: '', text: '' },
        { counting: '', text: '' },
        { counting: '', text: '' },
    ]);
    const [isUpdate, setIsUpdate] = useState(false); // Tracks if it's an update operation

    // Fetch existing data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/aboutpage/section5',{
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  });
                if (res.ok) {
                    const data = await res.json();
                    if (data.card && data.card.length > 0) {
                        setFormData(data.card); // Populate formData with fetched data
                        setIsUpdate(true); // Set update mode
                    }
                    sectionsStatusHandle(true)
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (index, field, value) => {
        const updatedFormData = [...formData];
        updatedFormData[index][field] = value;
        setFormData(updatedFormData);
    };

    // Handle form submission or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/aboutpage/section5', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, },
                body: JSON.stringify({ card: formData }),
            });

            if (res.ok) {
                const message = isUpdate ? 'Data successfully updated!' : 'Data successfully saved!';
                alert(message);
                setActiveBox(6)
            } else {
                const error = await res.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit data. Please try again.');
        }
    };

    return (
        <div className='p-4'>
            <div className='flex justify-end'>
                <StatusManager sectionName={"about_section5"}/>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {formData.map((item, index) => (
                    <div key={index} className="flex space-x-4 items-center">
                        <input
                            type="text"
                            value={item.counting}
                            onChange={(e) => handleChange(index, 'counting', e.target.value)}
                            placeholder="Counting"
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleChange(index, 'text', e.target.value)}
                            placeholder="Text"
                            required
                            className="border p-2 rounded"
                        />
                    </div>
                ))}
                <button type="submit"  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
                    {isUpdate ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AboutSection5Form;
