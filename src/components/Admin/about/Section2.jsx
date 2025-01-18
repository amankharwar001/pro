


import { useState, useEffect } from 'react';
import ImageUploader from '../ImageUploader';

const AboutSectionForm = ({ setActiveBox,sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    title: '',
    heading: '',
    text: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch existing data if editing an existing section
  useEffect(() => {
    const fetchSectionData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/aboutpage/section2');
        if (res.ok) {
          const data = await res.json();
          setSection(data);
          if (data) {
            setFormData({
              title: data.title,
              heading: data.heading,
              text: data.text,
            });
          }
          sectionsStatusHandle(true)
        } else {
          throw new Error('Failed to fetch section data');
        }
      } catch (error) {
        setErrorMessage('Error fetching section data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    try {
      const endpoint = '/api/aboutpage/section2';
      const dataToSubmit = { ...formData, id: section?.id }; // Include the section ID for update
      const res = await fetch(endpoint, {
        method: 'POST', // Always POST method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`${section ? 'Updated' : 'Created'} successfully!`);
        setSection(data);
        setActiveBox(3); // Move to next section
        setFormData({ title: '', heading: '', text: '' }); // Reset form on successful submission
      } else {
        const error = await res.json();
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto ">
      <div className="flex flex-wrap gap-10 items-center mb-3">
        <ImageUploader referenceType="about_section_primaryImage" width={616} height={580}/>
        <ImageUploader referenceType="about_section_secondaryImage" width={240} height={210} />
      </div>

      {/* Display error message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-medium mb-1 text-xs">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border p-1 px-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-adminbtn text-white py-2 rounded"
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? 'Submitting...' : section ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default AboutSectionForm;
