import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LeadFormEmailComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Fetch existing data on component mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/formemail/receive');
      const data = await res.json();
      if (data?.email) {
        setFormData({ email: data.email, password: data.password });
      }
    }
    fetchData();
  }, []);

  // Handle form submission (create or update)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('/api/formemail/receive', {
        method: formData.email ? 'PUT' : 'POST',  // Use PUT if data exists, otherwise POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert(formData.email ? 'Data updated successfully!' : 'Data created successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  return (
    <div className="max-w-md mx-auto  p-6  rounded-lg shadow-inner border bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {formData.email ? 'Update Lead Form Email' : 'Create Lead Form Email'}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 text-gray-700">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {formData.email ? 'Update Data' : 'Create Data'}
        </button>
      </form>
    </div>
  );
}

export default LeadFormEmailComponent;
