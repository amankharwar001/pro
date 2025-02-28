import React, { useState, useEffect } from 'react';

const ProductStatusDropdown = ({ productStatusId }) => {
  const [status, setStatus] = useState(''); // Current status
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch current status when the component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/product/status/${productStatusId}`);
        if (response.ok) {
          const data = await response.json();
          setStatus(data.statusbar); // Set the current status
        } else {
          setError('Failed to fetch product status');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching product status');
      }
    };

    fetchStatus();
  }, [productStatusId]);

  // Handle dropdown change
  const handleChange = async (newStatus) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/product/status/${productStatusId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.productStatus.statusbar); // Update status on success
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating the status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="statusDropdown" className="text-sm font-medium">
        Product Status:
      </label>
      <select
        id="statusDropdown"
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mt-1"
        disabled={loading} // Disable dropdown while updating
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
      </select>
      {loading && <p className="text-sm text-blue-500 mt-1">Updating...</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ProductStatusDropdown;
