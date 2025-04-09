// 'use client';

// import { useEffect, useRef, useState } from 'react';

// const ClientSideCommonEditor = () => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   useEffect(() => {
//     const initEditor = async () => {
//       if (!editorRef.current || quillRef.current) return;

//       const Quill = (await import('quill')).default;
//       const QuillTableBetter = (await import('quill-table-better')).default;
//       const { keyboardBindings } = await import('quill-table-better');

//       await import('quill/dist/quill.snow.css');
//       await import('quill-table-better/dist/quill-table-better.css');

//       Quill.register('modules/table-better', QuillTableBetter);

//       quillRef.current = new Quill(editorRef.current, {
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
//           },
          
//           'table-better': {
//             language: 'en_US',
//             menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
//           },
//           keyboard: {
//             bindings: keyboardBindings,
//           },
//         },
//       });

      
//       quillRef.current.on('text-change', () => {
//   setTimeout(() => {
//     const root = quillRef.current.root;
//     const olElements = root.querySelectorAll('ol');

//     olElements.forEach((ol) => {
//       const isBullet = [...ol.children].some((li) => li.getAttribute('data-list') === 'bullet');
//       if (isBullet) {
//         const ul = document.createElement('ul');

//         [...ol.children].forEach((li) => {
//           const newLi = document.createElement('li');
//           newLi.innerHTML = li.innerHTML;
//           ul.appendChild(newLi);
//         });

//         ol.replaceWith(ul);
//       }
//     });

//     const plainText = quillRef.current.getText() || '';
//     setCharCount(plainText.trim().length);
//   }, 0); // ⏱ delay so DOM is ready
// });


//       setIsEditorReady(true);
//     };

//     initEditor();
//   }, []);

//   return (
//     <div className="mx-auto rounded-lg">
//       <div ref={editorRef} style={{ height: '400px' }} className="bg-white mb-2" />

//       <p className={`text-sm ${charCount > 46000 ? 'text-red-600' : 'text-gray-600'}`}>
//         Characters: {charCount}/46000
//       </p>
//     </div>
//   );
// };

// export default ClientSideCommonEditor;





import { useEffect, useRef, useState } from 'react';

const ClientSideCommonEditor = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current || quillRef.current) return;

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
          },
          
          'table-better': {
            language: 'en_US',
            menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'copy', 'delete'],
          },
          keyboard: {
            bindings: keyboardBindings,
          },
        },
      });

      
      


      setIsEditorReady(true);
    };

    initEditor();
  }, []);

  return (
    <div className="mx-auto rounded-lg">
      <div ref={editorRef} style={{ height: '400px' }} className="bg-white mb-2" />

      <p className={`text-sm ${charCount > 46000 ? 'text-red-600' : 'text-gray-600'}`}>
        Characters: {charCount}/46000
      </p>
    </div>
  );
};

export default ClientSideCommonEditor;

