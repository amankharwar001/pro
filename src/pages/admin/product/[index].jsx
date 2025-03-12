import React, { useEffect, useState } from 'react';
import HeroSectionForm from '../../../components/Admin/product/HeroSection';
import Section2Form from '../../../components/Admin/product/Section2';
import Section3Form from '../../../components/Admin/product/Section3';
import Section4Product from '../../../components/Admin/product/Section4';
import Section5Product from '../../../components/Admin/product/Section5';
import Section6Product from '../../../components/Admin/product/Section6';
import Section7Product from '../../../components/Admin/product/Section7';
import { useRouter } from 'next/router';
import SeoPage from '@/components/Admin/product/SEO';
import StatusSelector from '@/components/Admin/product/StatusSelector';
import Section2Optional from '@/components/Admin/product/Section2Optional';

const Index = () => {
  const [activeBox, setActiveBox] = useState(1);
  const [sectionsStatus, setSectionsStatus] = useState(Array(8).fill(false));
  const [data, setData] = useState(null);
  const router = useRouter();
  const { index, edit: queryActiveBox } = router.query;

  const sectionsStatusHandle = (index, status) => {
    setSectionsStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  const tabs = [
    {
      id: 1,
      label: 'Hero Banner Section',
      component: (
        <HeroSectionForm
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(0, status)}
        />
      ),
    },
    {
      id: 2,
      label: 'Section2',
      component: (
        <Section2Form
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}
        />
      ),
    },
    {
      id: 3,
      label: 'Section2 optional',
      component: (
        <Section2Optional
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(1, status)}
        />
      ),
    },
    {
      id: 4,
      label: 'Section3',
      component: (
        <Section3Form
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(2, status)}
        />
      ),
    },
    {
      id: 5,
      label: 'Section4',
      component: (
        <Section4Product
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(3, status)}
        />
      ),
    },
    {
      id: 6,
      label: 'Section5',
      component: (
        <Section5Product
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(4, status)}
        />
      ),
    },
    {
      id: 7,
      label: 'Section6',
      component: (
        <Section6Product
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(5, status)}
        />
      ),
    },
    {
      id: 8,
      label: 'Section7',
      component: (
        <Section7Product
          productpage={data}
          setActiveBox={setActiveBox}
          sectionsStatusHandle={(status) => sectionsStatusHandle(6, status)}
        />
      ),
    },
    {
      id: 9,
      label: 'SEO',
      component: (
        <SeoPage
          productpage={data}
          sectionsStatusHandle={(status) => sectionsStatusHandle(7, status)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (queryActiveBox) {
      setActiveBox(Number(queryActiveBox));
    }
  }, [queryActiveBox]);

  useEffect(() => {
    if (index) {
      const fetchData = async () => {
        try {
          const endpoint = `/api/product/productpage/${index}`;
          const res = await fetch(endpoint,{
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
  }, [index, queryActiveBox]);
// dsaf
  useEffect(() => {
    // Simulate API trigger for all sections
    tabs.forEach((tab) => {
      console.log(`Triggering API for tab: ${tab.label}`);
    });
  }, []);

  const getTabClass = (isActive, isCompleted) => {
    return `${isCompleted ? 'bg-gradient-to-r from-[#1A2980] to-[#26D0CE] text-white' : ''} 
            ${isActive ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;
  };

  return (
    <div>
      <div className="pt-4 md:p-4 bg-white rounded-lg">
        <div className="flex justify-end px-2 mb-4">
          <StatusSelector productId={index} />
        </div>
        <div className="sticky top-16 border-b shadow-md z-10 flex gap-2 bg-white p-4 overflow-x-auto border ">
          {tabs.map((tab, index) => {
            const isActive = activeBox === tab.id;
            const isCompleted = sectionsStatus[index];
            return (
              <span
                key={tab.id}
                className={`cursor-pointer text-admin_btn_tab px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border ${getTabClass(
                  isActive,
                  isCompleted
                )}`}
                onClick={() => setActiveBox(tab.id)}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
        <div className="mt-5 border bg-gray-50  rounded-lg shadow-inner">
          <div className="hidden">
            {tabs.map((tab, index) => (
              <div key={index}>{tab.component}</div>
            ))}
          </div>
          <div>{tabs.find((tab) => tab.id === activeBox)?.component}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;














