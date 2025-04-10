

// import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import React Quill
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// const ClientSidePageEditor = forwardRef(({ referenceType, sectionsStatusHandle, setActiveBox }, ref) => {
//   const [editorContent, setEditorContent] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [contentId, setContentId] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);

//   useEffect(() => {
//     if (apiStatus) {
//       sectionsStatusHandle(true);
//     } else {
//       sectionsStatusHandle(false);
//     }
//   }, [apiStatus]);

//   useImperativeHandle(ref, () => ({
//     save: handleSubmit,
//   }));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
//           headers: {
//             "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setEditorContent(data.data.content);
//           setContentId(data.data.id);
//           if (/[a-zA-Z]/.test(data.data.content.replace(/<[^>]*>/g, "").trim())) {
//             setApiStatus(true);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [referenceType]);

//   const handleSubmit = async (event) => {
//     // if (event) event.preventDefault();
//     if (event?.preventDefault) event.preventDefault();

//     try {
//       const endpoint = contentId ? `/api/common-term-policy-page/${contentId}` : `/api/common-term-policy-page/post`;
//       const method = contentId ? "PUT" : "POST";
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           "x-system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
//         },
//         body: JSON.stringify(contentId ? { id: contentId, content: editorContent } : { content: editorContent, referenceType }),
//       });

//       const result = await response.json();
//       if (response.ok) {

//         if (method === "POST") setContentId(result.section.id);
//         setActiveBox(3);
//         // if (/[a-zA-Z]/.test(plainText)) setApiStatus(true);
//       } else {
//         alert(result.error || "Failed to save content.");
//       }
//     } catch (error) {
//       console.error("Error saving content:", error);
//       // alert("Failed to save content.");
//     }
//   };

//   // ✅ Move `useMemo` outside JSX
//   const modules = useMemo(() => ({
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ color: [] }, { background: [] }],
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ align: [] }],
//         ["blockquote", "code-block"],
//         ["link", "image"],
//         ["clean"],
//       ],
//     },
//   }), []);

//   return (
//     <div className="mx-auto rounded-lg">
//       {loading ? (
//         <p>Loading editor...</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <ReactQuill
//             value={editorContent}
//             onChange={setEditorContent}
//             modules={modules} // ✅ Use the memoized modules here
//             placeholder="Write something..."
//             className="editor-content overflow-hidden overflow-y-auto"
//           />
//           {/* <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2">
//             {contentId ? "Update Content" : "Create Content"}
//           </button> */}
//         </form>
//       )}
//     </div>
//   );
// });


// ClientSidePageEditor.displayName = "ClientSidePageEditor";



// export default ClientSidePageEditor;







// 'use client';

// import {
//   useEffect,
//   useRef,
//   useState,
//   useImperativeHandle,
//   forwardRef,
// } from 'react';

// const CustomQuillEditor = forwardRef(({ referenceType, sectionsStatusHandle, setActiveBox }, ref) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editorContent, setEditorContent] = useState('');
//   const [contentId, setContentId] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   console.log("content data show is here--->", editorContent)
//   useEffect(() => {
//     if (quillRef.current) {
//       const plainText = quillRef.current.getText() || '';
//       setCharCount(plainText.trim().length);
//     }
//   }, [editorContent]);

//   useImperativeHandle(ref, () => ({
//     save: handleSubmit,
//   }));

//   useEffect(() => {
//     sectionsStatusHandle(apiStatus);
//   }, [apiStatus]);

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
//           headers: {
//             'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEditorContent(data.data.content || '');
//           setContentId(data.data.id || null);

//           if (/[a-zA-Z]/.test(data.data.content?.replace(/<[^>]*>/g, '').trim() || '')) {
//             setApiStatus(true);
//           }
//         } else {
//           setEditorContent('');
//         }
//       } catch (error) {
//         console.error('Error fetching content:', error);
//         setEditorContent('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [referenceType]);

//   useEffect(() => {
//     if (isEditorReady && editorContent !== null && quillRef.current) {
//       quillRef.current.root.innerHTML = editorContent || '';
//     }
//   }, [isEditorReady, editorContent]);

//   const handleSubmit = async () => {
//     const plainText = quillRef.current.getText() || '';
//     const totalLength = plainText.trim().length;

//     if (totalLength > 44000) {
//       alert('Text exceeds 44,000 character limit. Please shorten your content.');
//       return;
//     }
//     try {
//       const content = quillRef.current.root.innerHTML;

//       const endpoint = contentId
//         ? `/api/common-term-policy-page/${contentId}`
//         : `/api/common-term-policy-page/post`;
//       const method = contentId ? 'PUT' : 'POST';

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//         },
//         body: JSON.stringify(
//           contentId
//             ? { id: contentId, content }
//             : { content, referenceType }
//         ),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         if (method === 'POST') setContentId(result.section.id);
//         alert("Saved successfully")
//         setActiveBox(3);
//         setApiStatus(true);
//       } else {
//         alert(result.error || 'Failed to save content.');
//       }
//     } catch (error) {
//       alert("failed to save content")
//       console.error('Error saving content:', error);
//     }
//   };

//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       if (!file.type.startsWith('image/')) {
//         alert('Only image files are allowed.');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should not exceed 5MB.');
//         return;
//       }

//       const altText = prompt('Enter alt text for the image:');
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('altText', altText);
//       formData.append('referenceId', 1); // adjust if needed

//       const quill = quillRef.current;
//       const range = quill.getSelection();
//       const placeholder = 'Uploading...';

//       quill.insertText(range.index, placeholder, { italic: true });

//       try {
//         const res = await fetch(`/api/blogupload/${referenceType}`, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           quill.deleteText(range.index, placeholder.length);
//           const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
//           quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
//         } else {
//           quill.deleteText(range.index, placeholder.length);
//           alert(data.error || 'Image upload failed.');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//         quill.deleteText(range.index, placeholder.length);
//         alert('Image upload failed. Please try again.');
//       }
//     };
//   };

//   useEffect(() => {
//     const initEditor = async () => {
//       if (!editorRef.current || quillRef.current || loading) return;

//       const Quill = (await import('quill')).default;
//       const QuillTableBetter = (await import('quill-table-better')).default;
//       const { keyboardBindings } = await import('quill-table-better');

//       await import('quill/dist/quill.snow.css');
//       await import('quill-table-better/dist/quill-table-better.css');

//       Quill.register('modules/table-better', QuillTableBetter);

//       const toolbarOptions = [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         [{ align: [] }],
//         [{ color: [] }, { background: [] }],
//         ['link', 'image'],
//         ['table-better'],
//         ['clean'],
//       ];

//       const options = {
//         theme: 'snow',
//         modules: {
//           toolbar: {
//             container: toolbarOptions,
//             handlers: {
//               image: imageHandler,
//             },
//           },
//           'table-better': {
//             language: 'en_US',
//             menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
//             toolbarTable: true,
//             toolbarButtons: {
//               whiteList: ['link', 'image', 'color', 'background'],
//               singleWhiteList: ['link', 'image', 'color', 'background'],
//             },
//           },
//           keyboard: {
//             bindings: keyboardBindings,
//           },
//         },
//       };

//       quillRef.current = new Quill(editorRef.current, options);
//       setIsEditorReady(true);
//       quillRef.current.root.innerHTML = editorContent || '';
//     };

//     initEditor();
//   }, [loading]);

//   return (
//     <div className="mx-auto rounded-lg">
//       <div className="flex justify-between items-center mb-2">
//         <p className={`text-sm ${charCount > 44000 ? 'text-red-600' : 'text-gray-600'}`}>
//           Characters: {charCount}/44000
//         </p>
//       </div>
//       {loading ? (
//         <p>Loading editor...</p>
//       ) : (
//         <div>
//           <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
//         </div>
//       )}
//       <button onClick={handleSubmit} className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2">
//         {contentId ? "Update Content" : "Create Content"}
//       </button>
//     </div>
//   );
// });

// CustomQuillEditor.displayName = 'CustomQuillEditor';
// export default CustomQuillEditor;
















// 'use client';

// import {
//   useEffect,
//   useRef,
//   useState,
//   useImperativeHandle,
//   forwardRef,
// } from 'react';

// const CustomQuillEditor = forwardRef(({ referenceType, sectionsStatusHandle, setActiveBox }, ref) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editorContent, setEditorContent] = useState('');
//   const [contentId, setContentId] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

//   useImperativeHandle(ref, () => ({
//     save: handleSubmit,
//   }));

//   // Handle character count update
//   useEffect(() => {
//     if (quillRef.current) {
//       const plainText = quillRef.current.getText() || '';
//       setCharCount(plainText.trim().length);
//     }
//   }, [editorContent]);

//   // Notify parent of save status
//   useEffect(() => {
//     sectionsStatusHandle(apiStatus);
//   }, [apiStatus]);

//   // Fetch content
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
//           headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEditorContent(data.data.content || '');
//           setContentId(data.data.id || null);

//           if (/[a-zA-Z]/.test(data.data.content?.replace(/<[^>]*>/g, '').trim() || '')) {
//             setApiStatus(true);
//           }
//         } else {
//           setEditorContent('');
//         }
//       } catch (error) {
//         console.error('Error fetching content:', error);
//         setEditorContent('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [referenceType]);

//   // Image upload handler
//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       if (!file.type.startsWith('image/')) {
//         alert('Only image files are allowed.');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should not exceed 5MB.');
//         return;
//       }

//       const altText = prompt('Enter alt text for the image:');
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('altText', altText || '');
//       formData.append('referenceId', 1); // Adjust if dynamic

//       const quill = quillRef.current;
//       const range = quill.getSelection();
//       const placeholder = 'Uploading...';

//       quill.insertText(range.index, placeholder, { italic: true });

//       try {
//         const res = await fetch(`/api/blogupload/${referenceType}`, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });

//         const data = await res.json();

//         quill.deleteText(range.index, placeholder.length);
//         if (res.ok) {
//           const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
//           quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
//         } else {
//           alert(data.error || 'Image upload failed.');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//         quill.deleteText(range.index, placeholder.length);
//         alert('Image upload failed. Please try again.');
//       }
//     };
//   };

//   // Submit handler
//   const handleSubmit = async () => {
//     const plainText = quillRef.current.getText() || '';
//     const totalLength = plainText.trim().length;

//     if (totalLength > 44000) {
//       alert('Text exceeds 44,000 character limit. Please shorten your content.');
//       return;
//     }

//     try {
//       const content = quillRef.current.root.innerHTML;
//       const endpoint = contentId
//         ? `/api/common-term-policy-page/${contentId}`
//         : `/api/common-term-policy-page/post`;
//       const method = contentId ? 'PUT' : 'POST';

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//         },
//         body: JSON.stringify(
//           contentId ? { id: contentId, content } : { content, referenceType }
//         ),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         if (method === 'POST') setContentId(result.section.id);
//         alert("Saved successfully");
//         setActiveBox(3);
//         setApiStatus(true);
//       } else {
//         alert(result.error || 'Failed to save content.');
//       }
//     } catch (error) {
//       alert('Failed to save content.');
//       console.error('Error saving content:', error);
//     }
//   };

//   // Initialize Quill editor
//   useEffect(() => {
//     const initEditor = async () => {
//       if (!editorRef.current || quillRef.current) return;

//       const Quill = (await import('quill')).default;
//       const QuillTableBetter = (await import('quill-table-better')).default;
//       const { keyboardBindings } = await import('quill-table-better');

//       await import('quill/dist/quill.snow.css');
//       await import('quill-table-better/dist/quill-table-better.css');

//       Quill.register('modules/table-better', QuillTableBetter);

//       const options = {
//         theme: 'snow',
//         modules: {
//           toolbar: {
//             container: [
//               [{ header: [1, 2, 3, 4, 5, 6, false] }],
//               ['bold', 'italic', 'underline', 'strike'],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               [{ align: [] }],
//               [{ color: [] }, { background: [] }],
//               ['link', 'image'],
//               ['table-better'],
//               ['clean'],
//             ],
//             handlers: { image: imageHandler },
//           },
//           'table-better': {
//             language: 'en_US',
//             menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
//             toolbarTable: true,
//             toolbarButtons: {
//               whiteList: ['link', 'image', 'color', 'background'],
//               singleWhiteList: ['link', 'image', 'color', 'background'],
//             },
//           },
//           keyboard: {
//             bindings: keyboardBindings,
//           },
//         },
//       };

//       const quill = new Quill(editorRef.current, options);
//       quillRef.current = quill;

//       // Paste initial content
//       if (editorContent) {
//         quill.clipboard.dangerouslyPasteHTML(editorContent);
//       }

//       setTimeout(() => {
//         setCharCount(quill.getText().trim().length);
//       }, 0);
//     };

//     if (!loading) initEditor();
//   }, [loading, editorContent]);

//   return (
//     <div className="mx-auto rounded-lg">
//       <div className="flex justify-between items-center mb-2">
//         <p className={`text-sm ${charCount > 44000 ? 'text-red-600' : 'text-gray-600'}`}>
//           Characters: {charCount}/44000
//         </p>
//       </div>

//       {loading ? (
//         <p>Loading editor...</p>
//       ) : (
//         <div>
//           <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
//       >
//         {contentId ? 'Update Content' : 'Create Content'}
//       </button>
//     </div>
//   );
// });

// CustomQuillEditor.displayName = 'CustomQuillEditor';
// export default CustomQuillEditor;





// 'use client';

// import { useEffect, useRef, useState } from 'react';

// const CustomQuillEditor = ({ referenceType, sectionsStatusHandle, setActiveBox }) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editorContent, setEditorContent] = useState('');
//   const [contentId, setContentId] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

//   useEffect(() => {
//     if (quillRef.current) {
//       const plainText = quillRef.current.getText() || '';
//       setCharCount(plainText.trim().length);
//     }
//   }, [editorContent]);

//   useEffect(() => {
//     sectionsStatusHandle(apiStatus);
//   }, [apiStatus]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
//           headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEditorContent(data.data.content || '');
//           setContentId(data.data.id || null);

//           if (/[a-zA-Z]/.test(data.data.content?.replace(/<[^>]*>/g, '').trim() || '')) {
//             setApiStatus(true);
//           }
//         } else {
//           setEditorContent('');
//         }
//       } catch (error) {
//         console.error('Error fetching content:', error);
//         setEditorContent('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [referenceType]);

//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       if (!file.type.startsWith('image/')) {
//         alert('Only image files are allowed.');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should not exceed 5MB.');
//         return;
//       }

//       const altText = prompt('Enter alt text for the image:');
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('altText', altText || '');
//       formData.append('referenceId', 1);

//       const quill = quillRef.current;
//       const range = quill.getSelection();
//       const placeholder = 'Uploading...';

//       quill.insertText(range.index, placeholder, { italic: true });

//       try {
//         const res = await fetch(`/api/blogupload/${referenceType}`, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });

//         const data = await res.json();

//         quill.deleteText(range.index, placeholder.length);
//         if (res.ok) {
//           const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
//           quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
//         } else {
//           alert(data.error || 'Image upload failed.');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//         quill.deleteText(range.index, placeholder.length);
//         alert('Image upload failed. Please try again.');
//       }
//     };
//   };

//   const handleSubmit = async () => {
//     const plainText = quillRef.current.getText() || '';
//     const totalLength = plainText.trim().length;

//     if (totalLength > 66000) {
//       alert('Text exceeds 44,000 character limit. Please shorten your content.');
//       return;
//     }

//     try {
//       const content = quillRef.current.root.innerHTML;
//       const endpoint = contentId
//         ? `/api/common-term-policy-page/${contentId}`
//         : `/api/common-term-policy-page/post`;
//       const method = contentId ? 'PUT' : 'POST';

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//         },
//         body: JSON.stringify(
//           contentId ? { id: contentId, content } : { content, referenceType }
//         ),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         if (method === 'POST') setContentId(result.section.id);
//         alert("Saved successfully");
//         setActiveBox(3);
//         setApiStatus(true);
//       } else {
//         alert(result.error || 'Failed to save content.');
//       }
//     } catch (error) {
//       alert('Failed to save content.');
//       console.error('Error saving content:', error);
//     }
//   };

//   useEffect(() => {
//     const initEditor = async () => {
//       if (!editorRef.current || quillRef.current) return;

//       const Quill = (await import('quill')).default;
//       const QuillTableBetter = (await import('quill-table-better')).default;
//       const { keyboardBindings } = await import('quill-table-better');

//       await import('quill/dist/quill.snow.css');
//       await import('quill-table-better/dist/quill-table-better.css');

//       Quill.register('modules/table-better', QuillTableBetter);

//       const options = {
//         theme: 'snow',
//         modules: {
//           toolbar: {
//             container: [
//               [{ header: [1, 2, 3, 4, 5, 6, false] }],
//               ['bold', 'italic', 'underline', 'strike'],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               [{ align: [] }],
//               [{ color: [] }, { background: [] }],
//               ['link', 'image'],
//               ['table-better'],
//               ['clean'],
//             ],
//             handlers: { image: imageHandler },
//           },
//           'table-better': {
//             language: 'en_US',
//             menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
//             toolbarTable: true,
//             toolbarButtons: {
//               whiteList: ['link', 'image', 'color', 'background'],
//               singleWhiteList: ['link', 'image', 'color', 'background'],
//             },
//           },
//           keyboard: {
//             bindings: keyboardBindings,
//           },
//         },
//       };

//       const quill = new Quill(editorRef.current, options);
//       quillRef.current = quill;

//       if (editorContent) {
//         quill.clipboard.dangerouslyPasteHTML(editorContent);
//       }

//       setTimeout(() => {
//         setCharCount(quill.getText().trim().length);
//       }, 0);
//     };

//     if (!loading) initEditor();
//   }, [loading, editorContent]);

//   return (
//     <div className="mx-auto rounded-lg">
//       <div className="flex justify-between items-center mb-2">
//         <p className={`text-sm ${charCount > 66000 ? 'text-red-600' : 'text-gray-600'}`}>
//           Characters: {charCount}/66000
//         </p>
//       </div>

//       {loading ? (
//         <p>Loading editor...</p>
//       ) : (
//         <div>
//           <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
//       >
//         {contentId ? 'Update Content' : 'Create Content'}
//       </button>
//     </div>
//   );
// };

// export default CustomQuillEditor;




// 'use client';

// import { useEffect, useRef, useState } from 'react';

// const CustomQuillEditor = ({ referenceType, sectionsStatusHandle, setActiveBox }) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editorContent, setEditorContent] = useState('');
//   const [contentId, setContentId] = useState(null);
//   const [apiStatus, setApiStatus] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

//   useEffect(() => {
//     sectionsStatusHandle(apiStatus);
//   }, [apiStatus]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
//           headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEditorContent(data.data.content || '');
//           setContentId(data.data.id || null);

//           if (/[a-zA-Z]/.test(data.data.content?.replace(/<[^>]*>/g, '').trim() || '')) {
//             setApiStatus(true);
//           }
//         } else {
//           setEditorContent('');
//         }
//       } catch (error) {
//         console.error('Error fetching content:', error);
//         setEditorContent('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [referenceType]);

//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       if (!file.type.startsWith('image/')) {
//         alert('Only image files are allowed.');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should not exceed 5MB.');
//         return;
//       }

//       const altText = prompt('Enter alt text for the image:');
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('altText', altText || '');
//       formData.append('referenceId', 1);

//       const quill = quillRef.current;
//       const range = quill.getSelection();
//       const placeholder = 'Uploading...';

//       quill.insertText(range.index, placeholder, { italic: true });

//       try {
//         const res = await fetch(`/api/blogupload/${referenceType}`, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//           },
//         });

//         const data = await res.json();

//         quill.deleteText(range.index, placeholder.length);
//         if (res.ok) {
//           const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
//           quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
//         } else {
//           alert(data.error || 'Image upload failed.');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//         quill.deleteText(range.index, placeholder.length);
//         alert('Image upload failed. Please try again.');
//       }
//     };
//   };

//   const handleSubmit = async () => {
//     const plainText = quillRef.current.getText() || '';
//     const totalLength = plainText.trim().length;

//     if (totalLength > 46000) {
//       alert('Text exceeds 46,000 character limit. Please shorten your content.');
//       return;
//     }

//     try {
//       const content = quillRef.current.root.innerHTML;
//       const endpoint = contentId
//         ? `/api/common-term-policy-page/${contentId}`
//         : `/api/common-term-policy-page/${contentId}`;
//       const method = contentId ? 'PUT' : 'POST';

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//         },
//         body: JSON.stringify(
//           contentId ? { id: contentId, content } : { content, referenceType }
//         ),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("Saved successfully");
//         if (method === 'POST') setContentId(result.section.id);
//         setActiveBox(3);
//         setApiStatus(true);
//       } else {
//         alert(result.error || 'Failed to save content.');
//       }
//     } catch (error) {
//       console.error('Error saving content:', error);
//     }
//   };

//   useEffect(() => {
//     const initEditor = async () => {
//       if (!editorRef.current || quillRef.current) return;

//       const Quill = (await import('quill')).default;
//       const QuillTableBetter = (await import('quill-table-better')).default;
//       const { keyboardBindings } = await import('quill-table-better');

//       await import('quill/dist/quill.snow.css');
//       await import('quill-table-better/dist/quill-table-better.css');

//       Quill.register('modules/table-better', QuillTableBetter);

//       const options = {
//         theme: 'snow',
//         modules: {
//           toolbar: {
//             container: [
//               [{ header: [1, 2, 3, 4, 5, 6, false] }],
//               ['bold', 'italic', 'underline', 'strike'],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               [{ align: [] }],
//               [{ color: [] }, { background: [] }],
//               ['link', 'image'],
//               ['table-better'],
//               ['clean'],
//             ],
//             handlers: { image: imageHandler },
//           },
//           'table-better': {
//             language: 'en_US',
//             menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
//             toolbarTable: true,
//             toolbarButtons: {
//               whiteList: ['link', 'image', 'color', 'background'],
//               singleWhiteList: ['link', 'image', 'color', 'background'],
//             },
//           },
//           keyboard: {
//             bindings: keyboardBindings,
//           },
//         },
//       };

//       const quill = new Quill(editorRef.current, options);
//       quillRef.current = quill;

//       if (editorContent) {
//         quill.clipboard.dangerouslyPasteHTML(editorContent);
//       }

//       // ✅ Add this to update char count live
//       quill.on('text-change', () => {
//         const plainText = quill.getText() || '';
//         setCharCount(plainText.trim().length);
//       });

//       // initial count
//       setCharCount(quill.getText().trim().length);
//     };

//     if (!loading) initEditor();
//   }, [loading, editorContent]);

//   return (
//     <div className="mx-auto rounded-lg">
//       <div className="flex justify-between items-center mb-2">
//         <p className={`text-sm ${charCount > 46000 ? 'text-red-600' : 'text-gray-600'}`}>
//           Characters: {charCount}/46000
//         </p>
//       </div>

//       {loading ? (
//         <p>Loading editor...</p>
//       ) : (
//         <div>
//           <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
//       >
//         {contentId ? 'Update Content' : 'Create Content'}
//       </button>
//     </div>
//   );
// };

// export default CustomQuillEditor;



'use client';

import { useEffect, useRef, useState } from 'react';

const CustomQuillEditor = ({ referenceType, sectionsStatusHandle, setActiveBox }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [contentId, setContentId] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    sectionsStatusHandle(apiStatus);
  }, [apiStatus]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
          headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        });

        const result = await response.json();
        if (response.ok) {
          const content = result.data.content || '';
          setEditorContent(content);
          setContentId(result.data.id || null);

          const plain = content.replace(/<[^>]*>/g, '').trim();
          if (/[a-zA-Z]/.test(plain)) setApiStatus(true);
        } else {
          setEditorContent('');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setEditorContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [referenceType]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) return alert('Only image files are allowed.');
      if (file.size > 5 * 1024 * 1024) return alert('Image size should not exceed 5MB.');

      const altText = prompt('Enter alt text for the image:') || '';
      const formData = new FormData();
      formData.append('image', file);
      formData.append('altText', altText);
      formData.append('referenceId', contentId || 0);

      const quill = quillRef.current;
      const range = quill.getSelection(true);
      const placeholder = 'Uploading...';
      quill.insertText(range.index, placeholder, { italic: true });

      try {
        const res = await fetch(`/api/blogupload/${referenceType}`, {
          method: 'POST',
          headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
          body: formData,
        });

        const data = await res.json();
        quill.deleteText(range.index, placeholder.length);

        if (res.ok && data.image) {
          const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
          quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
        } else {
          alert(data.error || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Upload error:', err);
        quill.deleteText(range.index, placeholder.length);
        alert('Image upload failed. Please try again.');
      }
    };
  };

  const handleSubmit = async () => {
    const quill = quillRef.current;
    const plainText = quill.getText().trim();

    if (plainText.length > 46000) {
      alert('Text exceeds 46,000 character limit. Please shorten your content.');
      return;
    }

    try {
      const content = quill.root.innerHTML;
      const method = contentId ? 'PUT' : 'POST';
      const endpoint = contentId
        ? `/api/common-term-policy-page/${contentId}`
        : `/api/common-term-policy-page`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
        },
        body: JSON.stringify(
          contentId ? { id: contentId, content } : { content, referenceType }
        ),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Saved successfully');
        if (!contentId && result?.section?.id) setContentId(result.section.id);
        setApiStatus(true);
        setActiveBox?.(3);
      } else {
        alert(result.error || 'Failed to save content.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };
  // ✨ This ensures quill editor content is updated when editorContent changes
useEffect(() => {
  if (quillRef.current && editorContent !== null) {
    quillRef.current.root.innerHTML = editorContent;
  }
}, [editorContent]);

  

   useEffect(() => {
      const initEditor = async () => {
        // if (!editorRef.current || quillRef.current || loading) return;
  
        const Quill = (await import('quill')).default;
        const QuillTableBetter = (await import('quill-table-better')).default;
        const { keyboardBindings } = await import('quill-table-better');
  
        await import('quill/dist/quill.snow.css');
        await import('quill-table-better/dist/quill-table-better.css');
  
        Quill.register('modules/table-better', QuillTableBetter);
  
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
                ['table-better'],
                ['clean'],
              ],
              handlers: { image: imageHandler },
            },
            'table-better': {
              language: 'en_US',
              menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
              toolbarTable: true,
              toolbarButtons: {
                whiteList: ['link', 'image', 'color', 'background'],
                singleWhiteList: ['link', 'image', 'color', 'background'],
              },
            },
            keyboard: {
              bindings: keyboardBindings,
            },
          },
        });
  
        // 🆕 Update character count on each text change
        quillRef.current.on('text-change', () => {
          const plainText = quillRef.current.getText() || '';
          setCharCount(plainText.trim().length);
        });
  
       
        quillRef.current.root.innerHTML = editorContent || '';
      };
  
      initEditor();
    }, [loading,editorContent,referenceType]);
  return (
    <div className="mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <p className={`text-sm ${charCount > 46000 ? 'text-red-600' : 'text-gray-600'}`}>
          Characters: {charCount}/46000
        </p>
      </div>

      {loading ? (
        <p>Loading editor...</p>
      ) : (
        <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
      >
        {contentId ? 'Update Content' : 'Create Content'}
      </button>
    </div>
  );
};

export default CustomQuillEditor;
