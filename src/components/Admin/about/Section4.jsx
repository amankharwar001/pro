import { useState, useEffect } from 'react';
import ImageUploader from '../ImageUploader';
import StatusManager from '../status';

const AboutSection4Form = ({ setActiveBox,sectionsStatusHandle }) => {
  const [formData, setFormData] = useState({
    card: [{ title: '', description: '' }, { title: '', description: '' }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aboutSection4, setAboutSection4] = useState(null);
   const [apiStatus, setApiStatus] = useState(false)
   const [imageStatus, setImageStatus] = useState({});

   // Function to update the image status dynamically
   const updateImageStatus = (referenceType, referenceId, status) => {
     const key = `${referenceType}_${referenceId}`;
     setImageStatus((prevStatus) => ({
       ...prevStatus,
       [key]: status,
     }));
   };
    
  
   useEffect(() => {
    const allImagesUploaded = Object.values(imageStatus).every(status => status === true);

      if (apiStatus && allImagesUploaded) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatus]); 

  useEffect(() => {
    const fetchSectionData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/aboutpage/section4',{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (res.ok) {
          const data = await res.json();
          setAboutSection4(data);
          setFormData({
            card: data.card || [{ title: '', description: '' }, { title: '', description: '' }],
          });
        } else {
          console.error('Failed to fetch data', await res.text());
        }
        setApiStatus(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData();
  }, []); // Empty dependency array means this effect runs only once

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCard = [...formData.card];
    updatedCard[index][name] = value;
    setFormData({ ...formData, card: updatedCard });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/aboutpage/section4', {
        method: 'POST', // Using POST for both create and update
        headers: { 'Content-Type': 'application/json', 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body: JSON.stringify({ card: formData.card }),
      });

      if (res.ok) {
        const data = await res.json();
        alert('Data created/updated successfully!');
        setAboutSection4(data);
        setActiveBox(5);
        setFormData({
          card: [{ title: '', description: '' }, { title: '', description: '' }],
        }); // Reset form on success
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
      <div className='flex justify-end mb-2'>
        <StatusManager sectionName={"about_section4"}/>
      </div>
      <div className="mb-3 bg-white shadow-md rounded border p-4">
        <span className="text-sm font-medium">Main images</span>
        <div className="flex flex-wrap gap-10 items-center">
          <ImageUploader setImageStatus={(status) => updateImageStatus("about_section4_primaryImage", 1, status)} referenceType={"about_section4_primaryImage"} width={660} height={440}/>
          <ImageUploader setImageStatus={(status) => updateImageStatus("about_section4_secondaryImage", 2, status)} referenceType={"about_section4_secondaryImage"} width={230} height={115}/>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block font-semibold mb-1 text-sm text-gray-700">Cards</label>
          {formData.card.map((card, index) => (
            <div key={index} className="mb-3 space-y-2">
              <ImageUploader setImageStatus={(status) => updateImageStatus("aboutpage_section_4", index + 1, status)} referenceType={"aboutpage_section_4"} referenceId={index + 1} width={25} height={25}/>
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
          {isLoading ? 'Submitting...' : aboutSection4 ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default AboutSection4Form;
