// import React, { useState, useEffect } from 'react';

// const SeoPage = ({ productpage }) => {
//     const [isSEOField, setIsSEOField] = useState({
//         title: '',
//         description: '',
//         slug: '',
//         keyword: '',
//     });

//     const [validationErrors, setValidationErrors] = useState({
//         title: '',
//         description: '',
//     });

//     // Automatically generate slug based on title
//     useEffect(() => {
//         if (isSEOField.title && !isSEOField.slug) {
//             setIsSEOField((prevFields) => ({
//                 ...prevFields,
//                 slug: prevFields.title.replace(/\s+/g, '-').toLowerCase(), // Replace spaces with hyphens
//             }));
//         }
//     }, [isSEOField]);

//     // Fetch existing SEO data on component mount using productpage.id
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await fetch(`/api/product/seoproduct/${productpage?.id}`, {
//                     method: 'GET',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data.');
//                 }
//                 const result = await response.json();
//                 setIsSEOField(result);
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         // Only fetch data if productpage.id is available
//         if (productpage?.id) {
//             fetchData();
//         }
//     }, [productpage?.id]);

//     const handleMetaTag = (e) => {
//         const { name, value } = e.target;

//         if (name === 'slug') {
//             // Replace multiple spaces with a single hyphen, convert to lowercase
//             let updatedValue = value
//                 .replace(/\s+/g, '-')  // Replace spaces with hyphens
//                 .replace(/-+/g, '-')   // Remove multiple hyphens
//                 .toLowerCase();       // Convert to lowercase

//             // Remove leading hyphen if exists
//             updatedValue = updatedValue.replace(/^[-]+/, '');

//             setIsSEOField((prevFields) => ({
//                 ...prevFields,
//                 [name]: updatedValue,
//             }));
//             return;
//         }

//         if (name === 'keyword') {
//             // Replace spaces with commas, handle multiple commas
//             let updatedValue = value
//                 .replace(/\s+/g, ',')  // Replace spaces with commas
//                 .replace(/,+/g, ',');   // Remove multiple commas

//             // Remove leading comma if exists
//             updatedValue = updatedValue.replace(/^,+/, '');

//             setIsSEOField((prevFields) => ({
//                 ...prevFields,
//                 [name]: updatedValue,
//             }));
//             return;
//         }

//         // Generic handler for other fields
//         setIsSEOField((prevFields) => ({
//             ...prevFields,
//             [name]: value,
//         }));
//     };

//     const handleSubmitSeoField = async (e) => {
//         e.preventDefault();
//         const { title, description, keyword } = isSEOField;

//         // Validate required fields
//         const errors = {};
//         if (!title.trim()) errors.title = 'Title is required';
//         if (!description.trim()) errors.description = 'Description is required';
//         setValidationErrors(errors);

//         if (Object.keys(errors).length > 0) return;
//         const keywordString = String(keyword || '').trim();

//         // Convert keyword string into an array
//         const keywordsArray = keywordString
//             .split(',')
//             .map((k) => k.trim())
//             .filter((k) => k); // Remove empty strings

//         const seoData = { ...isSEOField, keyword: keywordsArray };

//         try {
//             const method = productpage.id ? 'PUT' : 'POST'; // Use PUT for existing entries, POST for new ones
//             const response = await fetch(`/api/product/seoproduct/${productpage?.id || ''}`, {
//                 method: method,
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(seoData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to save data.');
//             }

//             alert('SEO Data Submitted Successfully');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="">
//             <form className="border rounded p-3 " onSubmit={handleSubmitSeoField}>
//                 {/* Title */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="title">
//                         Title:
//                     </label>
//                     <input
//                         id="title"
//                         name="title"
//                         value={isSEOField.title}
//                         onChange={handleMetaTag}
//                         className="h-8 px-2 rounded border text-para"
//                         type="text"
//                     />
//                     <span className="text-xs text-red-700">{validationErrors.title}</span>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="description">
//                         Description:
//                     </label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={isSEOField.description}
//                         onChange={handleMetaTag}
//                         className="px-2 rounded border text-para"
//                         rows={4}
//                     />
//                     <span className="text-xs text-red-700">{validationErrors.description}</span>
//                 </div>

//                 {/* Slug */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="slug">
//                         Slug:
//                     </label>
//                     <input
//                         id="slug"
//                         name="slug"
//                         value={isSEOField.slug}
//                         onChange={handleMetaTag}
//                         className="h-8 px-2 rounded border text-para"
//                         type="text"
//                     />
//                     <span className="text-xs text-gray-500">
//                         Slug auto-generates from the title. You can edit it manually.
//                     </span>
//                 </div>

//                 {/* Keyword */}
//                 <div className="flex flex-col mb-2">
//                     <label className="text-para font-semibold" htmlFor="keyword">
//                         Keywords (comma-separated):
//                     </label>
//                     <input
//                         id="keyword"
//                         name="keyword"
//                         value={isSEOField.keyword}
//                         onChange={handleMetaTag}
//                         className="h-8 px-2 rounded border text-para"
//                         type="text"
//                     />
//                     <span className="text-xs text-gray-500">
//                         Enter keywords separated by spaces or commas.
//                     </span>
//                 </div>

//                 <button
//                     className="mt-2 w-full h-8 px-2 rounded bg-black text-white"
//                     type="submit"
//                 >
//                     Save Meta Tags
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SeoPage;





































import React, { useState, useEffect } from 'react';

const SeoPage = ({ productpage }) => {
    const [isSEOField, setIsSEOField] = useState({
        title: '',
        description: '',
        slug: '',
        keyword: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        title: '',
        description: '',
    });

    // Auto-generate slug based on title
    useEffect(() => {
        if (isSEOField.title && !isSEOField.slug) {
            setIsSEOField((prevFields) => ({
                ...prevFields,
                slug: prevFields.title.replace(/\s+/g, '-').toLowerCase(),
            }));
        }
    }, [isSEOField.title]); // Only run when title changes

    // Fetch existing SEO data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/product/seoproduct/${productpage?.id || ''}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const result = await response.json();
                    setIsSEOField(result);
                }
            } catch (error) {
                console.error('Error fetching SEO data:', error);
            }
        }

        if (productpage?.id) fetchData();
    }, [productpage?.id]);

    const handleMetaTag = (e) => {
        const { name, value } = e.target;

        if (name === 'slug') {
            let updatedValue = value
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^[-]+/, '')
                .toLowerCase();

            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: updatedValue,
            }));
            return;
        }

        if (name === 'keyword') {
            let updatedValue = value
                .replace(/\s+/g, ',')
                .replace(/,+/g, ',')
                .replace(/^,+/, '');

            setIsSEOField((prevFields) => ({
                ...prevFields,
                [name]: updatedValue,
            }));
            return;
        }

        setIsSEOField((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));

        // Clear validation errors for the field being updated
        if (validationErrors[name]) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleSubmitSeoField = async (e) => {
        e.preventDefault();
        const { title, description, keyword } = isSEOField;

        // Validate required fields
        const errors = {};
        if (!title.trim()) errors.title = 'Title is required';
        if (!description.trim()) errors.description = 'Description is required';
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const keywordString = String(keyword || '').trim();
        const keywordsArray = keywordString.split(',').map((k) => k.trim()).filter((k) => k);

        const seoData = { ...isSEOField, keyword: keywordsArray };

        try {
            const method = productpage?.id ? 'PUT' : 'POST';
            const endpoint = `/api/product/seoproduct/${productpage?.id || ''}`;
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(seoData),
            });

            if (response.ok) {
                alert('SEO Data Submitted Successfully');
            } else {
                throw new Error('Failed to save data. Please try again.');
            }
        } catch (error) {
            console.error('Error saving SEO data:', error);
            alert('An error occurred while saving. Please check the console for details.');
        }
    };

    return (
        <div>
            <form className="border rounded p-3" onSubmit={handleSubmitSeoField}>
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

                {/* Keywords */}
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
