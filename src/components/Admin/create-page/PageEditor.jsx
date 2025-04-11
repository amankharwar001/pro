

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
    const plainText = quillRef.current.getText() || '';
    const totalLength = plainText.trim().length;

    if (totalLength > 46000) {
      alert('Text exceeds 46,000 character limit. Please shorten your content.');
      return;
    }

    try {
      const content = quillRef.current.root.innerHTML;
      const endpoint = contentId
        ? `/api/common-term-policy-page/${contentId}`
        : `/api/common-term-policy-page/${contentId}`;
      const method = contentId ? 'PUT' : 'POST';

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
        alert("Saved successfully");
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


  useEffect(() => {
  if (quillRef.current && editorContent !== null) {
    quillRef.current.root.innerHTML = editorContent;
  }
}, [editorContent]);

  

   useEffect(() => {
      const initEditor = async () => {
        if (!editorRef.current) return;
  
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
      if (!loading && editorRef.current) {
        initEditor();
      }
      // initEditor();
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
