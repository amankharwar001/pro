import React, { useState, useEffect } from 'react';

const StatusSelector = ({ blogId, initialStatus = 'draft', onStatusChange }) => {
    const [status, setStatus] = useState(initialStatus);

    // Fetch the current status from the backend on initial render
    useEffect(() => {
        if (blogId) {
            fetchStatus(blogId);
        }
    }, [blogId]);

    const fetchStatus = async (blogId) => {
        try {
            const response = await fetch(`/api/blog/blog-status/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                setStatus(data.status);  // Set the fetched status
            } else {
                console.error('Error fetching blog status:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching blog status:', error);
        }
    };

    const handleStatusChange = async (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        // Call onStatusChange to propagate the selected status if provided
        // if (onStatusChange) onStatusChange(selectedStatus);

        // Update the status on the backend by calling the API
        if (blogId) {
            try {
                const response = await fetch(`/api/blog/blog-status/${blogId}?blogstatus=${selectedStatus}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Failed to update status');
                }
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };

    return (
        <div className="status-selector">
            <label className="font-semibold mr-3">Status:</label>
            <select
                value={status}
                onChange={handleStatusChange}
                className="h-8 px-2 rounded border text-para cursor-pointer"
            >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
            </select>
        </div>
    );
};

export default StatusSelector;
