import HeroSections from '../components/ClientSide/contactPage/HeroSections'
import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
import React from 'react'
import HeadTagSEO from '@/components/HeadTag'
import Link from 'next/link';
import { BsFillFolderSymlinkFill } from "react-icons/bs";


const PrivacyPolicy = ({ data, pageData, error, baseUrl }) => {
  console.log("transaction details", pageData)

  return (
    <div>
      <HeadTagSEO data={data} />
      <HeroSections heroSection={data?.heroSection} image={data?.heroSection?.images[0]?.filePath} alttext={data?.heroSection?.images[0]?.filePath} baseUrl={baseUrl} />
      <div className='container my-20'>
        <h2>{data?.heroSection?.heading}</h2>
        {/* {pageData?.data
          ?.filter((item) => item.sectionType === "page") 
          .map((item, index) => (
            <h3 key={index}>
              <Link href={`/${item.slug}`} className="text-blue-500 hover:underline">
                {item.heading}
              </Link>
            </h3>
          ))} */}
        {pageData?.data
          ?.filter((item) => item.sectionType === "page" && item.status === "active") // ✅ Show only active status pages
          .map((item, index) => (
            <div key={index} className="flex gap-5 items-center pl-10 mt-3">
              <span >
                <BsFillFolderSymlinkFill size={20} className="text-blue-700 " />
              </span>
              <h3 >
                <Link href={`/${item.slug}`} className="hover:text-blue-700  text-[16px] hover:underline capitalize">
                  {item.nickname}
                </Link>
              </h3>
            </div>

          ))}

      </div>
      <div
        className="mt-8 blog-content-editor prose container "
        dangerouslySetInnerHTML={{ __html: data?.content || "no content available" }}
      />
      {/* <ContactInfo /> */}
      <div className='mt-40'></div>

    </div>
  )
}
// export async function getServerSideProps(context) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

//   try {
//     const response = await fetch(`${baseUrl}/api/public/document-transaction`,{
//       headers: {
//         'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
//        },
//     });
//     if (!response.ok) {
//       return { props: { error: "Product not found", data: null, baseUrl } };
//     }
//     const data = await response.json();

//     return { props: { data, error: null, baseUrl } };
//   } catch (err) {
//     console.error("Failed to fetch product:", err);
//     return { props: { error: err.message, data: null, baseUrl } };
//   }
// }



export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    // Fetching both APIs simultaneously
    const [documentRes, pageRes] = await Promise.all([
      fetch(`${baseUrl}/api/public/document-transaction`, {
        headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
      }),
      fetch(`${baseUrl}/api/public/create-pages/list`, {
        headers: { 'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY },
      })
    ]);

    const data = documentRes.ok ? await documentRes.json() : null;
    const pageData = pageRes.ok ? await pageRes.json() : null;

    return { props: { data, pageData, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch APIs:", err);
    return { props: { error: err.message, data: null, pageData: null, baseUrl } };
  }
}

export default PrivacyPolicy;