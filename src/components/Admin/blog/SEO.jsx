
import React, { useState, useEffect } from 'react';

const SeoPage = ({ blogpageId }) => {
    const [isSEOField, setIsSEOField] = useState({
        title: null,
        description: null,
        slug: null,
        keyword: null,
    });

    const [validationErrors, setValidationErrors] = useState({
        title: '',
        description: '',
        keyword: '',
    });
    const [SEOData, setSEOData] = useState(null)

    // Automatically generate slug based on title
    useEffect(() => {
        if (isSEOField.title && !isSEOField.slug) {
            setIsSEOField((prevFields) => ({
                ...prevFields,
                slug: prevFields.title.replace(/\s+/g, '-').toLowerCase(), // Replace spaces with hyphens
            }));
        }
    }, [isSEOField.title, isSEOField.slug]);

    // Fetch existing SEO data on component mount using blogpageId
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/blog/seo/${blogpageId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data.');
                }
                const result = await response.json();
                setIsSEOField(result);
                setSEOData(result)
            } catch (error) {
                console.error(error);
            }
        };

        if (blogpageId) {
            fetchData();
        }
    }, [blogpageId]);

    const handleMetaTag = (e) => {
        const { name, value } = e.target;

        if (name === 'slug') {
            // Replace multiple spaces with a single hyphen, convert to lowercase
            let updatedValue = value
                .replace(/\s+/g, '-')  // Replace spaces with hyphens
                .replace(/-+/g, '-')   // Remove multiple hyphens
                .toLowerCase();       // Convert to lowercase

            // Remove leading hyphen if exists
            updatedValue = updatedValue.replace(/^[-]+/, '');

            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: updatedValue,
            }));
            return;
        }

        if (name === 'keyword') {
            // Replace spaces with commas, handle multiple commas
            let updatedValue = value
                .replace(/\s+/g, ',')  // Replace spaces with commas
                .replace(/,+/g, ',');   // Remove multiple commas

            // Remove leading comma if exists
            updatedValue = updatedValue.replace(/^,+/, '');

            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: updatedValue,
            }));
            return;
        }

        // Generic handler for other fields
        setIsSEOField((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const handleSubmitSeoField = async (e) => {
        e.preventDefault();
        const { title, description, keyword } = isSEOField;
    
        // Validate required fields
        const errors = {};
        if (!title.trim()) errors.title = 'Title is required';
        if (!description.trim()) errors.description = 'Description is required';
        if (!keyword || keyword.length === 0) errors.keyword = 'Keyword is required';
        setValidationErrors(errors);
    
        if (Object.keys(errors).length > 0) return;
    
        // Ensure `keyword` is a string
        const keywordString = String(keyword || '').trim();
    
        // Convert keyword string into an array
        const keywordsArray = keywordString
            .split(',')
            .map((k) => k.trim())
            .filter((k) => k); // Remove empty strings
    
        const seoData = { ...isSEOField, keyword: keywordsArray };
    
        try {
            // Check if the entry exists (blogpageId exists and isSEOField is not empty)
            const method = SEOData ? 'PUT' : 'POST';
    
            const response = await fetch(`/api/blog/seo/${blogpageId}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(seoData),
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save data.');
            }
    
            alert('SEO Data Submitted Successfully');
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="">
            <form className="border rounded p-3 bg-white" onSubmit={handleSubmitSeoField}>
                {/* Title */}
                <div className="flex flex-col mb-2">
                    <label className="text-para font-semibold" htmlFor="title">
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

                {/* Description */}
                <div className="flex flex-col mb-2">
                    <label className="text-para font-semibold" htmlFor="description">
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

                {/* Slug */}
                <div className="flex flex-col mb-2">
                    <label className="text-para font-semibold" htmlFor="slug">
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

                {/* Keyword */}
                <div className="flex flex-col mb-2">
                    <label className="text-para font-semibold" htmlFor="keyword">
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
                    <span className="text-xs text-red-700">{validationErrors.keyword}</span>
                    <span className="text-xs text-gray-500">
                        Enter keywords separated by spaces or commas.
                    </span>
                </div>

                <button
                    className="mt-2 w-full h-8 px-2 rounded bg-black text-white"
                    type="submit"
                >
                    Save Meta Tags
                </button>
            </form>
        </div>
    );
};

export default SeoPage;