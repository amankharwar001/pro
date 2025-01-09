import { useState, useEffect } from "react";
import CommonImageUpload from "./CommonImageUpload";

export default function Section9Manager({setActiveBox}) {
    const [form, setForm] = useState({
        heading: "",
        content: "",
        btn: "",
        btnLink: "",
        info: [
            { heading: "", content: "" },
            { heading: "", content: "" },
            { heading: "", content: "" },
            { heading: "", content: "" },
        ],
        bottomtext: "",
    });
    const [message, setMessage] = useState("");

    // Fetch Section 12 data on component mount
    useEffect(() => {
        async function fetchSection9Data() {
            try {
                const response = await fetch("/api/homepage/section9");
                const result = await response.json();

                if (result.success) {
                    setForm(result.data); // Prefill form with fetched data
                } else {
                    setMessage(result.message);
                }
            } catch (error) {
                console.error("Error fetching Section 12 data:", error);
                setMessage("Failed to load Section 12 data.");
            }
        }

        fetchSection9Data();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Handle info field changes
    const handleInfoChange = (index, field, value) => {
        const updatedInfo = [...form.info];
        updatedInfo[index][field] = value; // Update the correct field (heading or content)
        setForm((prevForm) => ({
            ...prevForm,
            info: updatedInfo,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {

            const response = await fetch("/api/homepage/section9", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();
            if (result.success) {
                setMessage(result.message);
                setActiveBox(10)
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error("Error submitting Section 12 data:", error);
            setMessage("Failed to update Section 12 data.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Section 12 Manager</h1>

            {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
            <CommonImageUpload referenceType={"homepage_section_9"} imageCount={4} />

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Heading */}
                <div>
                    <label htmlFor="heading" className="block font-medium">Heading</label>
                    <input
                        type="text"
                        id="heading"
                        name="heading"
                        value={form.heading}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block font-medium">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>

                {/* Button */}
                <div>
                    <label htmlFor="btn" className="block font-medium">Button Text</label>
                    <input
                        type="text"
                        id="btn"
                        name="btn"
                        value={form.btn}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>

                {/* Button Link */}
                <div>
                    <label htmlFor="btnLink" className="block font-medium">Button Link</label>
                    <input
                        type="url"
                        id="btnLink"
                        name="btnLink"
                        value={form.btnLink}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>

                {/* Info Fields */}
                <div>
                    <label className="block font-medium">Info Fields</label>
                    {form.info.map((info, index) => (
                        <div key={index} className="space-y-2 mb-4">
                            <div>
                                <label htmlFor={`infoheading${index}`} className="block font-medium">{`heading ${index+1}`}</label>
                                <input
                                    type="text"
                                    id={`infoheading${index}`}
                                    placeholder={`Heading ${index + 1}`}
                                    value={info.heading}
                                    onChange={(e) => handleInfoChange(index, "heading", e.target.value)}
                                    className="border p-2 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor={`infotext${index}`} className="block font-medium">{`text ${index+1}`}</label>
                                <textarea
                                    placeholder={`Content ${index + 1}`}
                                    id={`infotext${index}`}
                                    value={info.content}
                                    onChange={(e) => handleInfoChange(index, "content", e.target.value)}
                                    className="border p-2 w-full rounded-md"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div>
                    <label htmlFor="bottomtext" className="block font-medium">Bottom Text</label>
                    <textarea
                        id="bottomtext"
                        name="bottomtext"
                        value={form.bottomtext}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Section 12
                </button>
            </form>
        </div>
    );
}
