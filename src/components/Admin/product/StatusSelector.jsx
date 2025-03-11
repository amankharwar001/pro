import React, { useState, useEffect } from 'react';

const StatusSelector = ({ productId, initialStatus = 'draft', onStatusChange }) => {
    const [status, setStatus] = useState(initialStatus);

    // Fetch the current status from the backend on initial render
    useEffect(() => {
        if (productId) {
            fetchStatus(productId);
        }
    }, [productId]);

    const fetchStatus = async (productId) => {
        try {
            const response = await fetch(`/api/product/product-status/${productId}`,{
                headers: {
                 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                },
              });
            
            if (response.ok) {
                const data = await response.json();
                setStatus(data.status);  // Set the fetched status
            } else {
                const errorData = await response.json();  // Get error message from the response
                console.error('Error fetching status:', errorData.error);  // Log error message
                // alert(errorData.error || "Please fill all parts");  // Show alert with error message
            }
        } catch (error) {
            console.error('Error fetching status:', error);
            alert("An error occurred while fetching the status.");
        }
    };

    const handleStatusChange = async (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        // Only attempt to update when the status changes to "active"
        if (selectedStatus ) {
            try {
                const response = await fetch(`/api/product/product-status/${productId}?productstatus=${selectedStatus}`, {
                    method: 'POST',
                    headers: {
                        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                       },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error updating status:', errorData.error);
                    alert(errorData.error || "Please fill all parts");  // Show alert if error occurs
                }
            } catch (error) {
                console.error('Error updating status:', error);
                alert("An error occurred while updating the status.");
            }
        }
    };

    return (
        <div className="status-selector">
            <label className="font-semibold mr-3">Status:</label>
            <select
                value={status}
                onChange={handleStatusChange}
                className="h-8 px-8 rounded border text-para cursor-pointer"
            >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
            </select>
        </div>
    );
};

export default StatusSelector;
