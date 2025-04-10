import { useState, useEffect } from 'react';
import ImageUploader from '../ImageUploader';
import StatusManager from '../status';

const AboutSection3Form = ({ setActiveBox, sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    heading: '',
    card: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ], 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Track if the form is in update mode
  const [apiStatus, setApiStatus] = useState(false)
  const [imageStatus, setImageStatus] = useState({});

  // Update image status dynamically based on section and index
  const updateImageStatus = (section, index, status) => {
    setImageStatus((prevStatus) => ({
      ...prevStatus,
      [`${section}_${index}`]: status,
    }));
  };

  useEffect(() => {
    const allImagesUploaded = Object.values(imageStatus).every(status => status === true);

    if (apiStatus && allImagesUploaded) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);

    }
  }, [apiStatus, imageStatus]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/aboutpage/section3',{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (res.ok) {
          const data = await res.json();
         

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
          setApiStatus(true)
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
        headers: { 'Content-Type': 'application/json','x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
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
    <div className="mx-auto p-4">
      <div className='flex justify-end'>
      <StatusManager sectionName={"about_section3"} />
      </div>
      <div  className="space-y-4 w-full">
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-sm">Heading</label>
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
          <label className="block font-semibold text-gray-700 mb-1 text-sm">Cards</label>
          {Array.isArray(formData.card) && formData.card.map((card, index) => (
            <div key={index} className="mb-3 space-y-2 p-4 border shadow-md rounded bg-white"> 
              {/* <ImageUploader setImageStatus={setImageStatus} referenceType={"aboutpage_section_3"} referenceId={index + 1} width={30} height={30} /> */}
              <ImageUploader
                setImageStatus={(status) => updateImageStatus("aboutpage_section_3", index + 1, status)}  // dynamically set status based on section and index
                referenceType={"aboutpage_section_3"}
                referenceId={index + 1}
                width={30}
                height={30}
              />
              <input
                type="text"
                name="title"
                value={card.title}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Card ${index + 1} Title`}
                className="w-full border p-1 px-2 rounded"
                
              />
              <textarea
                name="description"
                value={card.description}
                onChange={(e) => handleChange(index, e)}
                placeholder={`Card ${index + 1} Description`}
                className="w-full border p-1 px-2 rounded"
                rows="3"
                
              ></textarea>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-adminbtn text-white py-2 rounded"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting...' : isUpdate ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default AboutSection3Form;
