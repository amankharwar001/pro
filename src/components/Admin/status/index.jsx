import React, { useState, useEffect } from "react";

const StatusManager = ({ sectionName }) => {
    const [selectedStatus, setSelectedStatus] = useState("Active");
    const [loading, setLoading] = useState(true);

    // Fetch or create the section when the component mounts
    useEffect(() => {
        const fetchOrCreateSection = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/hideunhide?SectionName=${sectionName}`);
                const data = await response.json();

                if (response.ok && data.SectionName) {
                    setSelectedStatus(data.Status); // Set the fetched status
                } else {
                    // Create section if not exists
                    await fetch("/api/hideunhide", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            SectionName: sectionName,
                            Status: "Active", // Default status
                        }),
                    });
                }
            } catch (error) {
                console.error("Error fetching or creating section:", error);
            }
            setLoading(false);
        };

        fetchOrCreateSection();
    }, [sectionName]);

    // Handle status change
    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);

        try {
            const response = await fetch("/api/hideunhide", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    SectionName:sectionName,
                    Status: newStatus,
                }),
            });

            if (!response.ok) {
                alert("Error updating status.");
            }
        } catch (error) {
            console.error("Error updating section status:", error);
        }
    };

    return (
        <div className=" ">
            <div className="  ">
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="p-2 px-7 border text-xs border-gray-300 rounded bg-white"
                >
                    <option className="text-xs" value="Active">Active</option>
                    <option className="text-xs" value="Disable">Disable</option>
                </select>
            </div>
        </div>
    );
};

export default StatusManager;
