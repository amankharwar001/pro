import Layout from "@/components/Admin/common/Layout";
import LeadFormEmailComponent from "@/components/Admin/leadform";
import React, { useState, useEffect } from "react";

const ScriptManager = () => {
  const [activeTab, setActiveTab] = useState("head"); // Current active tab
  const [scripts, setScripts] = useState([]);
  const [newScript, setNewScript] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [updatedScript, setUpdatedScript] = useState("");

  // Fetch all scripts for the current tab
  const fetchScripts = async () => {
    try {
      const response = await fetch(`/api/script/${activeTab}-script`);
      const data = await response.json();
      setScripts(data || []);
    } catch (error) {
      console.error("Error fetching scripts:", error);
    }
  };

  // Create a new script
  const createScript = async () => {
    try {
      const response = await fetch(`/api/script/${activeTab}-script`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script: newScript }),
      });

      if (response.ok) {
        setNewScript("");
        fetchScripts();
      } else {
        console.error("Error creating script");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update a script
  const updateScript = async (id) => {
    try {
      const response = await fetch(`/api/script/${activeTab}-script?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script: updatedScript }),
      });

      if (response.ok) {
        setEditingId(null);
        setUpdatedScript("");
        fetchScripts();
      } else {
        console.error("Error updating script");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete a script
  const deleteScript = async (id) => {
    try {
      const response = await fetch(`/api/script/${activeTab}-script?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchScripts();
      } else {
        console.error("Error deleting script");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, [activeTab]);

  return (
    <>
      <div className=" bg-gray-50 min-h-screen">
        <div className="bg-gray-50 shadow-inner rounded-lg border p-5">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Script Manager
          </h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            {["head", "body", "footer"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Add New Script */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add New Script
            </h2>
            <textarea
              className="w-full border p-3 rounded-lg mb-3"
              rows="4"
              placeholder={`Enter ${activeTab} script here...`}
              value={newScript}
              onChange={(e) => setNewScript(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
              onClick={createScript}
            >
              Add Script
            </button>
          </div>

          {/* List of Scripts */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Existing Scripts
            </h2>
            {scripts.length === 0 ? (
              <p className="text-gray-500">No scripts found for {activeTab}.</p>
            ) : (
              scripts.map((script) => (
                <div
                  key={script.id}
                  className="bg-gray-50 border p-4 rounded-lg mb-4 shadow"
                >
                  {editingId === script.id ? (
                    <>
                      <textarea
                        className="w-full border p-3 rounded-lg mb-3"
                        rows="4"
                        value={updatedScript}
                        onChange={(e) => setUpdatedScript(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2"
                        onClick={() => updateScript(script.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                        onClick={() => {
                          setEditingId(null);
                          setUpdatedScript("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <pre className="bg-gray-100 p-3 rounded-lg mb-3 text-gray-800 whitespace-pre-wrap overflow-scroll">
                        {script.script}
                      </pre>
                      <button
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg mr-2"
                        onClick={() => {
                          setEditingId(script.id);
                          setUpdatedScript(script.script);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-6 py-2 rounded-lg"
                        onClick={() => deleteScript(script.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ScriptManager;
