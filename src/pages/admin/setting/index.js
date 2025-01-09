import ChangeCredentials from '@/components/Admin/adminSetting';
import Layout from '@/components/Admin/common/Layout';
import ImageUploader from '@/components/Admin/ImageUploader';
import React, { useState, useEffect } from 'react';

// Utility function for debouncing
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const Index = () => {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch admin name from the API when the page first loads
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await fetch('/api/adminsetting');
        const result = await response.json();
        if (response.ok) {
          setAdminName(result.name); // Set the initial value from the server
        } else {
          console.error('Error fetching admin name:', result.message);
        }
      } catch (error) {
        console.error('Error fetching admin name:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminName(); // Fetch admin name on initial load
  }, []); // Empty dependency array ensures this runs only once on page load

  // Function to save the admin name to the database
  const saveAdminName = async (name) => {
    try {
      const response = await fetch('/api/adminsetting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      if (response.ok) {
        setAdminName(result.data.name); // Update adminName state with saved name
      } else {
        console.error('Error saving admin name:', result.message);
      }
    } catch (error) {
      console.error('Error saving admin name:', error);
    }
  };

  // Debounced function to save admin name after typing stops for 1 second
  const debouncedSave = debounce((name) => {
    saveAdminName(name);
  }, );

  // Handle change in admin name input
  const handleAdminNameChange = (e) => {
    const name = e.target.value;
    setAdminName(name); // Update state immediately
    debouncedSave(name); // Trigger debounced save
  };

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-bold mb-4">Setting</h1>
      </div>
      <div className="flex gap-5 justify-between bg-white p-4 rounded">
        <div className="rounded">
          <div>
            <div className="border-b mb-4">
              <p className="font-semibold">Basic Setting</p>
            </div>
            <div className="flex gap-5 flex-wrap items-center justify-center">
              <div className="flex flex-wrap gap-5">
                <div className="bg-gray-500 p-5 rounded-md overflow-hidden">
                  <span className="font-semibold text-white underline">Admin Panel Avatar</span>
                  <ImageUploader referenceType="adminAvatar" />
                </div>
                <div className="bg-gray-500 p-5 rounded-md overflow-hidden">
                  <span className="font-semibold text-white underline">Website Logo</span>
                  <ImageUploader referenceType="websitelogo" />
                </div>
                <div className="bg-gray-500 p-5 rounded-md overflow-hidden">
                  <span className="font-semibold text-white underline">Website Fevicon Logo</span>
                  <ImageUploader referenceType="websitefevicon" />
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto mb-5">
            <div>
              <label className="font-semibold text-black/70 text-para" htmlFor="adminName">
                Admin Name
              </label>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <input
                  type="text"
                  id="adminName"
                  value={adminName}
                  onChange={handleAdminNameChange}
                  className="border w-full rounded-md h-8 px-2 focus:border-black/55 outline-none text-para"
                />
              )}
            </div>
          </div>
        </div>
        <div className='grow'>
          <ChangeCredentials/>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
