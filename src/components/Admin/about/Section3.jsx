import { useState, useEffect } from 'react';
import ImageUploader from '../ImageUploader';

const AboutSection3Form = ({ setActiveBox,sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    heading: '',
    card: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ], // Initialize with 6 empty card objects
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Track if the form is in update mode

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/aboutpage/section3');
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched data:', data); // Check the fetched data

          // Ensure the fetched data has a valid card array
          setFormData({
            heading: data.heading || '',
            card: Array.isArray(data.card) ? data.card : [
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' },
            ],
          });
          setIsUpdate(true); // Set to update mode
          sectionsStatusHandle(true)
        } else {
          console.error('Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle changes in card inputs
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCard = [...formData.card];
    updatedCard[index][name] = value;
    setFormData({ ...formData, card: updatedCard });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/aboutpage/section3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isUpdate ? 'Data updated successfully!' : 'Data created successfully!');
        setActiveBox(4);
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto ">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-medium mb-1 text-xs">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full border p-1 px-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-xs">Cards</label>
          {Array.isArray(formData.card) && formData.card.map((card, index) => (
            <div key={index} className="mb-3 space-y-2">
              <ImageUploader referenceType={"aboutpage_section_3"} referenceId={index + 1} width={30} height={30} />
              <input
                type="text"
                name="title"
                value={card.title}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Card ${index + 1} Title`}
                className="w-full border p-1 px-2 rounded"
                required
              />
              <textarea
                name="description"
                value={card.description}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Card ${index + 1} Description`}
                className="w-full border p-1 px-2 rounded"
                rows="3"
                required
              ></textarea>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-adminbtn text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : isUpdate ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default AboutSection3Form;
