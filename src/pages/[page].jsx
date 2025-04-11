







import HeroSections from '../components/ClientSide/contactPage/HeroSections';
import HeadTagSEO from '@/components/HeadTag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PrivacyPolicy = ({ data, error, baseUrl }) => {
  const router = useRouter();
  
  const [safeContent, setSafeContent] = useState("");
  const [safeContent2, setSafeContent2] = useState("");

  useEffect(() => {
    if (data?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.content, "text/html");

      const tables = doc.querySelectorAll("table");
      tables.forEach((table) => {
        const wrapper = doc.createElement("div");
        wrapper.setAttribute("class", "overflow-x-auto my-4");
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });

      setSafeContent(doc.body.innerHTML);
    }
  }, [data]);

  useEffect(() => {
    if (data?.content2) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.content2, "text/html");

      const tables = doc.querySelectorAll("table");
      tables.forEach((table) => {
        const wrapper = doc.createElement("div");
        wrapper.setAttribute("class", "overflow-x-auto my-4");
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });

      setSafeContent2(doc.body.innerHTML);
    }
  }, [data]);

  return (
    <div>
      <HeadTagSEO data={data} />
      {error ? (
        <div className="text-center text-red-500 mt-10">Page Not Found</div>
      ) : (
        <>
          <HeroSections 
            heroSection={data?.heroSection} 
            image={data?.heroSection?.images?.filePath} 
            alttext={data?.heroSection?.images?.filePath} 
            baseUrl={baseUrl} 
          />
          <div 
            className="mt-8 blog-content-editor prose container"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
          <div 
            className=" mt-2 blog-content-editor prose container"
            dangerouslySetInnerHTML={{ __html: safeContent2 }}
          />
          <div className='mt-40'></div>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { page } = context.query;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const response = await fetch(`${baseUrl}/api/public/create-pages/${page}`, {
      headers: {
        'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
      },
    });

    if (!response.ok) {
      return { notFound: true };
    }

    const data = await response.json();

    if (!data?.status || data.status.status !== "active") {
      return { notFound: true };
    }

    return { props: { data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return { notFound: true };
  }
}

export default PrivacyPolicy;
