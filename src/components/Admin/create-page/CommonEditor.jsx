

import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Custom modules and handlers
const ClientSideCommonEditor = ({ referenceType, sectionsStatusHandle, setActiveBox }) => {

  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState(null);
  const [apiStatus, setApiStatus] = useState(false)



  useEffect(() => {
    if (apiStatus) {
      sectionsStatusHandle(true);
    } else {
      sectionsStatusHandle(false);

    }
  }, [apiStatus]);


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
                headers: {
                  'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
                 },
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
        const response = await fetch(`/api/common-term-policy-page/${referenceType}`,{
          headers: {
           'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEditorContent(data.data.content); // Fetch full HTML content
          setContentId(data.data.id); // Save the ID for future updates

          const plainText = data.data.content.replace(/<[^>]*>/g, "").trim();
          // Check if plain text contains at least one alphabet
          if (/[a-zA-Z]/.test(plainText)) {
            setApiStatus(true);
          }
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
  }, [referenceType,setActiveBox]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    const countWords = (content) => {
      // Remove HTML tags
      const plainText = content.replace(/<[^>]*>/g, "").trim();
      // Split by spaces and filter out empty strings
      const words = plainText.split(/\s+/).filter((word) => word !== "");
      return { count: words.length, plainText };
    };

    // Count words and get plain text
    const { count, plainText } = countWords(editorContent);

    // Validate word count and check for at least one alphabet
    if (count < 5 || !/[a-zA-Z]/.test(plainText)) {
      alert("Content must have at least 5 words and include alphabets.");
      return;
    }
    try {
      const endpoint = contentId ? `/api/common-term-policy-page/${contentId}` : `/api/common-term-policy-page/post`;
      const method = contentId ? "PUT" : "POST";
      const body = JSON.stringify(
        contentId
          ? { id: contentId, content: editorContent }
          : { content: editorContent, referenceType: referenceType }
      );

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json", 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,  },
        body,
      });

      const result = await response.json();
      if (response.ok) {

        if (method === "POST") {
          setContentId(result.section.id);
        }
        setActiveBox(3)
        // setApiStatus(true)
        const plainText = editorContent.replace(/<[^>]*>/g, "").trim();
        // Check if plain text contains at least one alphabet
        if (/[a-zA-Z]/.test(plainText)) {
          setApiStatus(true);
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
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
          >
            {contentId ? "Update Content" : "Create Content"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientSideCommonEditor;
