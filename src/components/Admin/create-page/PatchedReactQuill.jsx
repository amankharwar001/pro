'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Quill from '@/utils/quill-with-table'; // use your custom Quill here

// Patch ReactQuill to use custom Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
if (typeof window !== 'undefined') {
  window.Quill = Quill;
}
export default ReactQuill;
