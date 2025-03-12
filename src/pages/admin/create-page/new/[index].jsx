import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';
import CreatePageHeroSectionForm from '@/components/Admin/create-page/herosection';
import CommonEditor from '@/components/Admin/create-page/CommonEditor';
import CreatePageSeo from '@/components/Admin/create-page/SEO';
import PageStatusSelector from '@/components/Admin/create-page/StatusSelector';

const Index = () => {

  const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false));
  const router = useRouter();
  const [data, setData] = useState(null);
  const { index } = router.query;

  console.log("page data show is here",data)

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
          }
          );
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
      
      <span >Button</span>
      <PageStatusSelector blogId={index}/>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <CreatePageHeroSectionForm
          page={index}
          // setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}
        />
         {/* <CommonEditor pageId={index} /> */}
        {/* <ClientSideCommonEditor sectionsStatus={sectionsStatus} referenceType={index}/> */}
        <ClientSideCommonEditor sectionsStatus={sectionsStatus} referenceType={index} sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)} />
        {/* <SeoPage page={index} sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)} /> */}
        <CreatePageSeo blogpageId={index}/>
      </div>
    </div>
  );
};

export default Index;
