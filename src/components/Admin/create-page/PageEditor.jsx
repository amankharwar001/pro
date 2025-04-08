

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







'use client';

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

const CustomQuillEditor = forwardRef(({ referenceType, sectionsStatusHandle, setActiveBox }, ref) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [contentId, setContentId] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  console.log("content data show is here--->", editorContent)

  useImperativeHandle(ref, () => ({
    save: handleSubmit,
  }));

  useEffect(() => {
    sectionsStatusHandle(apiStatus);
  }, [apiStatus]);
 
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/common-term-policy-page/${referenceType}`, {
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEditorContent(data.data.content || '');
          setContentId(data.data.id || null);

          if (/[a-zA-Z]/.test(data.data.content?.replace(/<[^>]*>/g, '').trim() || '')) {
            setApiStatus(true);
          }
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

  useEffect(() => {
    if (isEditorReady && editorContent !== null && quillRef.current) {
      quillRef.current.root.innerHTML = editorContent || '';
    }
  }, [isEditorReady, editorContent]);

  const handleSubmit = async () => {
    try {
      const content = quillRef.current.root.innerHTML;

      const endpoint = contentId
        ? `/api/common-term-policy-page/${contentId}`
        : `/api/common-term-policy-page/post`;
      const method = contentId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
        },
        body: JSON.stringify(
          contentId
            ? { id: contentId, content }
            : { content, referenceType }
        ),
      });

      const result = await response.json();

      if (response.ok) {
        if (method === 'POST') setContentId(result.section.id);
        setActiveBox(3);
        setApiStatus(true);
      } else {
        alert(result.error || 'Failed to save content.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB.');
        return;
      }

      const altText = prompt('Enter alt text for the image:');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('altText', altText);
      formData.append('referenceId', 1); // adjust if needed

      const quill = quillRef.current;
      const range = quill.getSelection();
      const placeholder = 'Uploading...';

      quill.insertText(range.index, placeholder, { italic: true });

      try {
        const res = await fetch(`/api/blogupload/${referenceType}`, {
          method: 'POST',
          body: formData,
          headers: {
            'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
          },
        });

        const data = await res.json();

        if (res.ok) {
          quill.deleteText(range.index, placeholder.length);
          const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
          quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
        } else {
          quill.deleteText(range.index, placeholder.length);
          alert(data.error || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Upload error:', err);
        quill.deleteText(range.index, placeholder.length);
        alert('Image upload failed. Please try again.');
      }
    };
  };

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current || quillRef.current || loading) return;

      const Quill = (await import('quill')).default;
      const QuillTableBetter = (await import('quill-table-better')).default;
      const { keyboardBindings } = await import('quill-table-better');

      await import('quill/dist/quill.snow.css');
      await import('quill-table-better/dist/quill-table-better.css');

      Quill.register('modules/table-better', QuillTableBetter);

      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image'],
        ['table-better'],
        ['clean'],
      ];

      const options = {
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: imageHandler,
            },
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
      };

      quillRef.current = new Quill(editorRef.current, options);
      setIsEditorReady(true);
      quillRef.current.root.innerHTML = editorContent || '';
    };

    initEditor();
  }, [loading]);

  return (
    <div className="mx-auto rounded-lg">
      {loading ? (
        <p>Loading editor...</p>
      ) : (
        <div>
          <div ref={editorRef} style={{ height: '400px' }} className="bg-white" />
        </div>
      )}
    </div>
  );
});

CustomQuillEditor.displayName = 'CustomQuillEditor';
export default CustomQuillEditor;
