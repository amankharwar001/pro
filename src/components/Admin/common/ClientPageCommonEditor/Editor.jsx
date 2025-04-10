








'use client';

import { useEffect, useRef, useState } from 'react';

const ClientSideCommonEditor = ({ referenceType, sectionsStatusHandle, setActiveBox }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [contentId, setContentId] = useState(null);
  const [apiStatus, setApiStatus] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [charCount, setCharCount] = useState(0); // <-- New state for character count

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    sectionsStatusHandle(apiStatus);
  }, [apiStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/common-term-policy-page/${referenceType}`, {
          headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
        });

        if (res.ok) {
          const data = await res.json();
          setEditorContent(data.data.content || '');
          setContentId(data.data.id || null);

          const plainText = data.data.content.replace(/<[^>]*>/g, '').trim();
          setCharCount(plainText.length); // <-- Set char count on fetch
          if (/[a-zA-Z]/.test(plainText)) setApiStatus(true);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setEditorContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [referenceType]);

  useEffect(() => {
    if (isEditorReady && editorContent && quillRef.current) {
      quillRef.current.root.innerHTML = editorContent;
    }
  }, [isEditorReady, editorContent]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) return alert('Only image files are allowed.');
      if (file.size > 5 * 1024 * 1024) return alert('Image size should not exceed 5MB.');

      const altText = prompt('Enter alt text for the image:');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('altText', altText);
      formData.append('referenceId', 1);

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
        quill.deleteText(range.index, placeholder.length);

        if (res.ok) {
          const imgTag = `<img src="${basePath}${data.image.filePath}" alt="${data.image.altText}" style="max-width: 100%; height: auto;" />`;
          quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
        } else {
          alert(data.error || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Upload error:', err);
        quill.deleteText(range.index, placeholder.length);
        alert('Image upload failed.');
      }
    };
  };

  const handleSubmit = async () => {
    try {
      const content = quillRef.current.root.innerHTML;
      const plainText = quillRef.current.getText().trim();

      if (plainText.length > 46000) {
        alert('Text exceeds 46,000 character limit.');
        return;
      }

      setSaving(true);

      const endpoint = contentId
        ? `/api/common-term-policy-page/${contentId}`
        : `/api/common-term-policy-page/post`;

      const method = contentId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
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

      const data = await res.json();

      if (res.ok) {
        alert("Saved successfully")
        if (method === 'POST') setContentId(data.section.id);
        setActiveBox(3);
        if (/[a-zA-Z]/.test(plainText)) setApiStatus(true);
      } else {
        console.warn(data.error || 'Failed to save content.');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save content.');
    } finally {
      setSaving(false);
    }
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
          <div ref={editorRef} style={{ height: '400px' }} className="bg-white mb-2" />

          {/* 🆕 Character count display */}
          <p className={`text-sm ${charCount > 46000 ? 'text-red-600' : 'text-gray-600'}`}>
            Characters: {charCount}/46000
          </p>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className={`w-full bg-adminbtn text-white py-2 rounded mt-4`}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientSideCommonEditor;
