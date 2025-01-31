import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";

export default function Section5Product({setActiveBox,sectionsStatusHandle}) {
  const [data, setData] = useState({
    heading: "",
    content: "",
    card: [
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
   const [apiStatus, setApiStatus] = useState(false)
    const [imageStatus, setImageStatus] = useState(false)
    
  
   useEffect(() => {
      if (apiStatus && imageStatus) {
        sectionsStatusHandle(true);
      }else{
        sectionsStatusHandle(false);
  
      }
    }, [apiStatus, imageStatus]); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getintouch`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData({
          heading: result.heading || "",
          content: result.content || "",
          card: result.card || [{ title: "", content: "" }, { title: "", content: "" }, { title: "", content: "" }],
        });
        setEdit(true);
        setApiStatus(true)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoChange = (index, field, value) => {
    const updatedInfo = [...data.card];
    updatedInfo[index][field] = value;
    setData((prev) => ({ ...prev, card: updatedInfo }));
  };

  const handleCreate = async () => {
    if (
      !data.heading.trim() ||
      !data.content.trim() ||
      data.card.some((item) => !item.title.trim() || !item.content.trim())
    ) {
      setError("Heading, content, and all card fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/getintouch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create data");
        
      }

      const newData = await response.json();
      setData(newData);
      alert("Data created successfully!");
      setActiveBox(3)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4  border bg-gray-50 shadow-inner rounded">
      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Heading</label>
            <input
              type="text"
              name="heading"
              value={data.heading}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Text</label>
            <textarea
              name="content"
              value={data.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">Info</h2>
            {data?.card?.map((item, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-white shadow-md">
                <div>
                  <ImageUploader
                    referenceType={"get_in_touch"}
                    referenceId={index + 2}
                    width={50} height={50}
                    setImageStatus={setImageStatus}
                  />
                  <label className="block font-medium">Title {index + 1}</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleInfoChange(index, "title", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">
                    Content {index + 1}
                  </label>
                  <textarea
                    value={item.content}
                    onChange={(e) =>
                      handleInfoChange(index, "content", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-x-4">
            {!edit ? (
              <button
                type="button"
                onClick={handleCreate}
                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Create
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreate}
                 className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Update
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
