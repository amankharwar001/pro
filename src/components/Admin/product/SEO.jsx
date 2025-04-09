import React, { useState, useEffect } from "react";

const SeoPage = ({ productpage,sectionsStatusHandle }) => {
    const [isSEOField, setIsSEOField] = useState({
        title: "",
        description: "",
        slug: "",
        keyword: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        title: "",
        description: "",
    });

    const [dataFetched, setDataFetched] = useState(false); // Track if data exists in the database

    
    useEffect(() => {
        if (isSEOField.title && !isSEOField.slug) {
            setIsSEOField((prevFields) => ({
                ...prevFields,
                slug: prevFields.title.replace(/\s+/g, "-").toLowerCase(),
            }));
        }
    }, [isSEOField.title]);

    // Fetch existing SEO data
    useEffect(() => {
        async function fetchData() {
            if (productpage?.id) {
                try {
                    const response = await fetch(`/api/product/seoproduct/${productpage.id}`,{
                        headers: {
                         'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                        },
                      }
              );
                    if (response.ok) {
                        const result = await response.json();
                        setIsSEOField(result);
                        setDataFetched(true); // Mark as existing data
                        sectionsStatusHandle(true)
                    }
                } catch (error) {
                    console.error("Error fetching SEO data:", error);
                }
            }
        }
        fetchData();
    }, [productpage?.id]);

    const handleMetaTag = (e) => {
        const { name, value } = e.target;

        // Special handling for slug
        if (name === "slug") {
            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: value
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^[-]+/, "")
                    .toLowerCase(),
            }));
            return;
        }

        // Special handling for keywords
        if (name === "keyword") {
            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: value
                    .replace(/\s+/g, ",")
                    .replace(/,+/g, ",")
                    .replace(/^,+/, ""),
            }));
            return;
        }

        // Generic update
        setIsSEOField((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));

        // Clear validation errors
        if (validationErrors[name]) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleSubmitSeoField = async (e) => {
        e.preventDefault();
        const { title, description, keyword,slug } = isSEOField;
        
        if (!title?.trim()) {
            alert('Title is required');
            return;
        }
        if (!description?.trim()) {
            alert('description is required');
            return;
        }
    
        if (!slug?.trim()) {
            alert('Slug is required');
            return;
        }

        // Validate fields
        // const errors = {};
        // if (!title.trim()) errors.title = "Title is required";
        // if (!description.trim()) errors.description = "Description is required";
        // setValidationErrors(errors);

        // if (Object.keys(errors).length > 0) return;

        // const seoData = {
        //     ...isSEOField,
        //     keyword: keyword.split(",").map((k) => k.trim()).filter((k) => k),
        // };

        const keywordString = String(keyword || '').trim();
        const keywordsArray = keywordString
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k);

        const seoData = { ...isSEOField, keyword: keywordsArray };

        try {
            const method = dataFetched ? "PUT" : "POST";
            const endpoint = `/api/product/seoproduct/${productpage?.id || ""}`;
            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json",'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
                body: JSON.stringify(seoData),
            });

            if (response.ok) {
                alert(dataFetched ? "SEO Data Updated Successfully" : "SEO Data Created Successfully");
                if (!dataFetched) setDataFetched(true); // Update state after first successful POST
            } else {
                throw new Error("Failed to save data. Please try again.");
            }
        } catch (error) {
            console.error("Error saving SEO data:", error);
            alert("An error occurred while saving. Please check the console for details.");
        }
    };

    return (
        <div>
            <form className="border rounded p-3" onSubmit={handleSubmitSeoField}>
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="text-para font-semibold">
                        Title:
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={isSEOField.title}
                        onChange={handleMetaTag}
                        className="h-8 px-2 rounded border text-para"
                        type="text"
                    />
                    <span className="text-xs text-red-700">{validationErrors.title}</span>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="description" className="text-para font-semibold">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={isSEOField.description}
                        onChange={handleMetaTag}
                        className="px-2 rounded border text-para"
                        rows={4}
                    />
                    <span className="text-xs text-red-700">{validationErrors.description}</span>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="slug" className="text-para font-semibold">
                        Slug:
                    </label>
                    <input
                        id="slug"
                        name="slug"
                        value={isSEOField.slug}
                        onChange={handleMetaTag}
                        className="h-8 px-2 rounded border text-para"
                        type="text"
                    />
                    <span className="text-xs text-gray-500">
                        Slug auto-generates from the title. You can edit it manually.
                    </span>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="keyword" className="text-para font-semibold">
                        Keywords (comma-separated):
                    </label>
                    <input
                        id="keyword"
                        name="keyword"
                        value={isSEOField.keyword}
                        onChange={handleMetaTag}
                        className="h-8 px-2 rounded border text-para"
                        type="text"
                    />
                    <span className="text-xs text-gray-500">
                        Enter keywords separated by spaces or commas.
                    </span>
                </div>

                <button type="submit" className="mt-2 w-full h-8 px-2 rounded bg-black text-white">
                    {dataFetched ? "Update Meta Tags" : "Create Meta Tags"}
                </button>
            </form>
        </div>
    );
};

export default SeoPage;
