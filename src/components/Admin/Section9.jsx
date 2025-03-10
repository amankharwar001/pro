
import { useState, useEffect } from "react";
import CommonImageUpload from "./CommonImageUpload";
import StatusManager from "./status";

export default function Section9Manager({ setActiveBox, sectionsStatusHandle }) {
    const [form, setForm] = useState({
        heading: "",
        content: "",
        btn: "",
        btnLink: "",
        info: [],
        bottomtext: "",
    });
    
    const [message, setMessage] = useState("");
    const [apiStatus, setApiStatus] = useState(false);
    const [multiImageStatus, setMultiImageStatus] = useState(false);

    useEffect(() => {
        if (apiStatus && multiImageStatus) {
            sectionsStatusHandle(true);
        } else {
            sectionsStatusHandle(false);
        }
    }, [apiStatus, multiImageStatus]);

    useEffect(() => {
        async function fetchSection9Data() {
            try {
                const response = await fetch("/api/homepage/section9", {
                    headers: {
                     'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                    },
                  }
              );
                const result = await response.json();
                if (result.success) {
                    setForm(result.data);
                    setApiStatus(true);
                } else {
                    setMessage(result.message);
                }
            } catch (error) {
                console.error("Error fetching Section 9 data:", error);
                setMessage("Failed to load Section 9 data.");
            }
        }
        fetchSection9Data();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleInfoChange = (index, field, value) => {
        const updatedInfo = [...form.info];
        updatedInfo[index][field] = value;
        setForm((prevForm) => ({ ...prevForm, info: updatedInfo }));
    };

    const addInfoField = () => {
        setForm((prevForm) => ({
            ...prevForm,
            info: [...prevForm.info, { heading: "", content: "" }],
        }));
    };

    const removeInfoField = (index) => {
        const updatedInfo = form.info.filter((_, i) => i !== index);
        setForm((prevForm) => ({ ...prevForm, info: updatedInfo }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
      
        try {
            const response = await fetch("/api/homepage/section9", {
                method: "PUT",
                headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (result.success) {
                setMessage(result.message);
                setActiveBox(10);
                setApiStatus(true);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error("Error submitting Section 9 data:", error);
            setMessage("Failed to update Section 9 data.");
        }
    };

    return (
        <div className="p-4">
            <div className='flex justify-end pb-5'>
                <StatusManager sectionName={"homepage_section9"} />
            </div>

            {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
            <CommonImageUpload referenceType={"homepage_section_9"} imageCount={4} setMultiImageStatus={setMultiImageStatus} />

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                    <label className="block font-semibold">Heading</label>
                    <input type="text" name="heading" value={form.heading} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
                </div>
                
                <div>
                    <label className="block font-semibold">Content</label>
                    <textarea name="content" value={form.content} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
                </div>
                
                <div>
                    <label className="block font-semibold">Button Text</label>
                    <input type="text" name="btn" value={form.btn} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
                </div>
                
                <div>
                    <label className="block font-semibold">Button Link</label>
                    <input type="url" name="btnLink" value={form.btnLink} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
                </div>
                
                <div>
                    <label className="block underline font-bold">Info Fields</label>
                    {form.info.map((info, index) => (
                        <div key={index} className="space-y-2 mb-4 border p-4 rounded-md bg-white shadow-md">
                            <div>
                                <label className="block font-semibold">Heading {index + 1}</label>
                                <input type="text" value={info.heading} onChange={(e) => handleInfoChange(index, "heading", e.target.value)} className="border p-2 w-full rounded-md" />
                            </div>
                            <div>
                                <label className="block font-semibold">Text {index + 1}</label>
                                <textarea value={info.content} onChange={(e) => handleInfoChange(index, "content", e.target.value)} className="border p-2 w-full rounded-md" />
                            </div>
                            <button type="button" onClick={() => removeInfoField(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addInfoField} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Add More</button>
                </div>
                
                <div>
                    <label className="block font-semibold">Bottom Text</label>
                    <textarea name="bottomtext" value={form.bottomtext} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
                </div>
                
                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">Update Section 9</button>
            </form>
        </div>
    );
}






