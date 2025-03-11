import React, { useState, useEffect } from 'react';
import HeroSectionForm from '@/components/Admin/common/HeroSection';
import SeoPage from '@/components/Admin/seo/SEO';
import ClientSideCommonEditor from '@/components/Admin/common/ClientPageCommonEditor/Editor';

const Index = () => {
  
  const [sectionsStatus, setSectionsStatus] = useState(Array(3).fill(false)); // Initialize for 3 sections

 
  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };


  

  return (
    <div>
        {/* map according to the dynamically add and  when user delete then delete page */}
        <span >Button</span>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <HeroSectionForm   url="create-page/herosection" referencetype="herosection_refund_policy_page"  sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}/>
        <ClientSideCommonEditor sectionsStatus={sectionsStatus} referenceType="refund_policy"  sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}/>
        <SeoPage page="refund-policy"  sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)}/>,
      </div>
    </div>
  );
};

export default Index;
