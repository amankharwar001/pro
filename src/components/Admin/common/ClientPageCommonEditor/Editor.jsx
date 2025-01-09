

import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Custom modules and handlers
const ClientSideCommonEditor =({ referenceType }) => {
  
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState(null);

  // Use useMemo to optimize the modules object
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }], // Dropdown for text and background colors
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"], // Clear formatting
      ],
      handlers: {
        image: async function () {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
      
          input.onchange = async () => {
            const file = input.files[0];
      
            // Validate file type and size
            if (!file.type.startsWith("image/")) {
              alert("Only image files are allowed.");
              return;
            }
            if (file.size > 5 * 1024 * 1024) {
              alert("Image size should not exceed 5MB.");
              return;
            }
      
            const altText = prompt("Enter alt text for the image:");
            const formData = new FormData();
            formData.append("image", file);
            formData.append("altText", altText);
            formData.append("referenceId", 1);
      
            try {
              // Show loading indicator
              const range = this.quill.getSelection();
              const placeholder = "Uploading...";
              this.quill.insertText(range.index, placeholder, { italic: true });
      
              // Upload image to API
              const response = await fetch(`/api/blogupload/${referenceType}`, {
                method: "POST",
                body: formData,
              });
      
              const data = await response.json();
      
              if (response.ok) {
                // Remove placeholder text
                this.quill.deleteText(range.index, placeholder.length);
      
                // Insert uploaded image
                const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
                this.quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
              } else {
                // Remove placeholder text and show error
                this.quill.deleteText(range.index, placeholder.length);
                alert(data.error || "Image upload failed.");
              }
            } catch (error) {
              console.error("Error uploading image:", error);
      
              // Remove placeholder text on error
              this.quill.deleteText(range.index, placeholder.length);
              alert("Error uploading image. Please try again.");
            }
          };
        },
      },
      
    },
  }), [referenceType]); // Empty dependency array ensures this is only calculated once on mount remove here reference type

  // Fetch existing content on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/common-term-policy-page/${referenceType}`);
        if (response.ok) {
          const data = await response.json();
          setEditorContent(data.data.content); // Fetch full HTML content
          setContentId(data.data.id); // Save the ID for future updates
        } else {
          console.warn("No content found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [referenceType]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    

    try {
      const endpoint = contentId ? `/api/common-term-policy-page/${contentId}` : `/api/common-term-policy-page/post`;
      const method = contentId ? "PUT" : "POST";
      const body = JSON.stringify(
        contentId
          ? { id: contentId, content: editorContent }
          : { content: editorContent, referenceType: referenceType}
      );

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      const result = await response.json();
      if (response.ok) {
        
        if (method === "POST") {
          setContentId(result.section.id);
        }
      } else {
        alert(result.error || "Failed to save content.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content.");
    }
  };

  return (
    <div className="mx-auto rounded-lg">
      {loading ? (
        <p>Loading editor...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <h1>Blog Text Editor</h1> */}
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            placeholder="Write something..."
            className="editor-content overflow-hidden overflow-y-auto"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            {contentId ? "Update Content" : "Create Content"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientSideCommonEditor;
