// import { useEffect } from 'react';
// import Head from 'next/head';

// export default function HomePage({ scripts }) {
//     // Dynamically add header scripts to the <head>
//     useEffect(() => {
//         if (scripts?.header?.length > 0) {
//             const addedHeaderScripts = [];
//             scripts.header.forEach((scriptData) => {
//                 if (scriptData?.script) {
//                     const script = document.createElement('script');
//                     script.src = scriptData.script;
//                     script.async = true;
//                     document.head.appendChild(script);
//                     addedHeaderScripts.push(script);
//                 }
//             });

//             // Cleanup header scripts on unmount
//             return () => {
//                 addedHeaderScripts.forEach((script) => document.head.removeChild(script));
//             };
//         }
//     }, [scripts?.header]);

//     // Dynamically add footer scripts to the <body>
//     useEffect(() => {
//         if (scripts?.footer?.length > 0) {
//             const addedFooterScripts = [];
//             scripts.footer.forEach((scriptData) => {
//                 if (scriptData?.script) {
//                     const script = document.createElement('script');
//                     script.src = scriptData.script;
//                     script.async = true;
//                     document.body.appendChild(script);
//                     addedFooterScripts.push(script);
//                 }
//             });

//             // Cleanup footer scripts on unmount
//             return () => {
//                 addedFooterScripts.forEach((script) => document.body.removeChild(script));
//             };
//         }
//     }, [scripts?.footer]);

//     return (
//         <>
//             {/* Head Section */}
//             <Head>
//                 <title>Dynamic Scripts in Next.js</title>
//             </Head>

//             {/* Main Content */}
//             <main>
//                 <h1>Hello, I am a dynamically scripted website!</h1>
//                 <p>Scripts are dynamically loaded in both the head and footer.</p>
//             </main>
//         </>
//     );
// }

// // Fetching Data for SSR
// export async function getServerSideProps() {
//     try {
//         // Fetch script data from the API
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/script`);
//         const data = await response.json();

//         // Ensure valid structure for header and footer scripts
//         return {
//             props: {
//                 scripts: {
//                     header: data?.contentResponse?.header || [],
//                     footer: data?.contentResponse?.footer || [],
//                 },
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching scripts:', error);

//         // Fallback to empty scripts in case of an error
//         return {
//             props: {
//                 scripts: { header: [], footer: [] },
//             },
//         };
//     }
// }

import React from 'react'

const test = () => {
  return (
    <div>test</div>
  )
}

export default test