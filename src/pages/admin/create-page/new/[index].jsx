// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/router';
// import SeoPage from '@/components/Admin/seo/SEO';
// import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';
// import CreatePageHeroSectionForm from '@/components/Admin/create-page/herosection';
// import CommonEditor from '@/components/Admin/create-page/CommonEditor';
// import CreatePageSeo from '@/components/Admin/create-page/SEO';
// import PageStatusSelector from '@/components/Admin/create-page/StatusSelector';
// import ClientSidePageEditor from '@/components/Admin/create-page/PageEditor';

// const Index = () => {

//   const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false));
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const { index } = router.query;
//   const childRef = useRef();
//   console.log("page data show is here", data)
//   const handleClick = () => {
//     if (childRef.current) {
//       childRef.current.save();
//     }
//   };

//   const sectionsStatusHandle = (index, status) => {
//     setSectionsStatus((prevStatus) => {
//       const updatedStatus = [...prevStatus];
//       updatedStatus[index] = status;
//       return updatedStatus;
//     });
//   };

//   useEffect(() => {
//     if (index) {
//       const fetchData = async () => {
//         try {
//           const endpoint = `/api/create-page/herosection/${index}`;
//           const res = await fetch(endpoint, {
//             headers: {
//               'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
//             },
//           }
//           );
//           if (res.ok) {
//             const data = await res.json();
//             setData(data);
//           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };

//       fetchData();
//     }
//   }, [index]);




//   return (
//     <div>
//       <div className='flex  items-center gap-10 justify-end py-5 px-2' >
//         <PageStatusSelector blogId={index} />
//         <span onClick={handleClick} className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" >Button</span>
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-4">
//         <CreatePageHeroSectionForm
//           page={index}
//           ref={childRef}
//           sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}
//         />
//         <div className='mb-10'></div>

//         <ClientSidePageEditor ref={childRef} sectionsStatus={sectionsStatus} referenceType={index} sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} />
//         <div className='mb-10'></div>
//         <CreatePageSeo blogpageId={index} />
//       </div>
//     </div>
//   );
// };

// export default Index;








import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { useRouter } from 'next/router';
import CreatePageHeroSectionForm from '@/components/Admin/create-page/herosection';
import CreatePageSeo from '@/components/Admin/create-page/SEO';
import PageStatusSelector from '@/components/Admin/create-page/StatusSelector';
import ClientSidePageEditor from '@/components/Admin/create-page/PageEditor';

const Index = () => {
  const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false));
  const router = useRouter();
  const [data, setData] = useState(null);
  const { index } = router.query;
  const [pageStatusSection,setPageStatusSection] = useState()


  const heroSectionRef = useRef();
  const pageEditorRef = useRef();


  const handleClick = () => {
    if (heroSectionRef.current) {
      heroSectionRef.current.save();
    }
    if (pageEditorRef.current) {
      pageEditorRef.current.save();
    }
    alert("save data");
  };
  
  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  useEffect(() => {
    if (index) {
      const fetchData = async () => {
        try {
          const endpoint = `/api/create-page/herosection/${index}`;
          const res = await fetch(endpoint, {
            headers: {
              'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setData(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [index]);

  return (
    <div>
      <div className='flex items-center gap-10 justify-end py-5 px-2'>
        <PageStatusSelector blogId={index} />
        <span
          onClick={handleClick}
          className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </span>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <CreatePageHeroSectionForm
          page={index}
          ref={heroSectionRef} 
          sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}
        />
        <div className='mb-10'></div>

        <ClientSidePageEditor
          ref={pageEditorRef} 
          sectionsStatus={sectionsStatus}
          referenceType={index}
          sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}
        />
        <div className='mb-10'></div>
        <CreatePageSeo blogpageId={index} />
      </div>
    </div>
  );
};

export default Index;
