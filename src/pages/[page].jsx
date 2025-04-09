// import HeroSections from '../components/ClientSide/contactPage/HeroSections'
// import FooterSection from '../components/ClientSide/commonComponent/FooterSection'
// import React from 'react'
// import HeadTagSEO from '@/components/HeadTag'
// const PrivacyPolicy = ({ data, error, baseUrl }) => {
//   console.log("transaction details",data)

//   return (
//     <div>
//       <HeadTagSEO data={data} />
//       <HeroSections heroSection={data?.heroSection} image={data?.heroSection?.images?.filePath} alttext={data?.heroSection?.images?.filePath} baseUrl={baseUrl} />
//       <div
//         className="mt-8 blog-content-editor prose container "
//         dangerouslySetInnerHTML={{ __html: data?.content || "no content available" }}
//       />
      
//       <div className='mt-40'></div>
      
//     </div>
//   )
// }
// export async function getServerSideProps(context) {
//   const { page } = context.query;
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

//   try {
//     const response = await fetch(`${baseUrl}/api/public/create-pages/${page}`,{
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

// export default PrivacyPolicy;











import HeroSections from '../components/ClientSide/contactPage/HeroSections';
import HeadTagSEO from '@/components/HeadTag';
import { useRouter } from 'next/router';

const PrivacyPolicy = ({ data, error, baseUrl }) => {
  console.log("data show is here",data)
  const router = useRouter();

  // If there's an error, redirect to 404
  if (error) {
    return <div className="text-center text-red-500 mt-10">Page Not Found</div>;
  }

  return (
    <div>
      <HeadTagSEO data={data} />
      <HeroSections 
        heroSection={data?.heroSection} 
        image={data?.heroSection?.images?.filePath} 
        alttext={data?.heroSection?.images?.filePath} 
        baseUrl={baseUrl} 
      />
      <div 
        className="mt-8 blog-content-editor prose container"
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />
      <div 
        className=" mt-2 blog-content-editor prose container"
        dangerouslySetInnerHTML={{ __html: data?.content2  }}
      />
    <div className='mt-40'></div>
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
      return { notFound: true }; // Redirect to 404
    }

    const data = await response.json();

    // Check if status is active, else return 404
    if (!data?.status || data.status.status !== "active") {
      return { notFound: true };
    }

    return { props: { data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return { notFound: true }; // Redirect to 404
  }
}

export default PrivacyPolicy;
