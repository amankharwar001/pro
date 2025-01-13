// import 'react-quill/dist/quill.snow.css';
// import "@/styles/globals.css";
// import Head from 'next/head';
// import Header from '@/components/ClientSide/commonComponent/Header';
// import { useRouter } from "next/router";
// import FooterSection from '@/components/ClientSide/commonComponent/FooterSection';
// import Layout from '@/components/Admin/common/Layout';

// export default function App({ Component, pageProps,data }) {
//   const router = useRouter();
//   const isAdminPage = router.pathname.startsWith("/admin");
//   const isAdminAccountPage = router.pathname.startsWith("/admin/account");

//   return (
//     <>
//       <Head>
//         <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
//       </Head>
//       {isAdminPage ? (
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       ) : (
//         isAdminAccountPage
//         <Component {...pageProps} />
//         <>
//           <Header />
//           <Component {...pageProps} />
//           <FooterSection />
//         </>
//       )}
//     </>
//   );
// }
// // Fetch data server-side
// export async function getServerSideProps() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}api/public/logo`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.status}`);
//     }
//     const result = await response.json();
//     return { props: { data: result.fevicon, error: null } };
//   } catch (err) {
//     console.error("Failed to fetch home data:", err);
//     return { props: { data: null, error: err.message } };
//   }
// }





// import 'react-quill/dist/quill.snow.css';
// import "@/styles/globals.css";
// import Head from 'next/head';
// import Header from '@/components/ClientSide/commonComponent/Header';
// import { useRouter } from "next/router";
// import FooterSection from '@/components/ClientSide/commonComponent/FooterSection';
// import Layout from '@/components/Admin/common/Layout'; // Assuming Layout contains the Sidebar

// export default function App({ Component, pageProps, data }) {
//   const router = useRouter();
//   const isAdminPage = router.pathname.startsWith("/admin"); // Check if it's an admin page
//   const isAdminAccountPage = router.pathname.startsWith("/admin/account"); // Check if it's the /admin/account page

//   return (
//     <>
//       <Head>
//         <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
//       </Head>

//       { !isAdminAccountPage ? ( // If it's an admin page but not /admin/account
//       // /admin me dikhega
//         <Layout>
//           {/* Render Layout with Sidebar */}
//           <Component {...pageProps} />
//         </Layout>
//       ) : (
//         // If it's /admin/account, render without Layout (no sidebar)
//         <Component {...pageProps} />
//       )}

//       {/* For non-admin pages, render Header and Footer */}
//       {/* ye website ka ha to simple show karega haeader footer ke sath  */}
//       {!isAdminPage && (
//         <>
//           <Header />
//           <Component {...pageProps} />
//           <FooterSection />
//         </>
//       )}
//     </>
//   );
// }

// // Fetch data server-side
// export async function getServerSideProps() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}api/public/logo`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.status}`);
//     }
//     const result = await response.json();
//     return { props: { data: result.fevicon, error: null } };
//   } catch (err) {
//     console.error("Failed to fetch home data:", err);
//     return { props: { data: null, error: err.message } };
//   }
// }





import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";
import Head from 'next/head';
import Header from '@/components/ClientSide/commonComponent/Header';
import { useRouter } from "next/router";
import FooterSection from '@/components/ClientSide/commonComponent/FooterSection';
import Layout from '@/components/Admin/common/Layout'; // Assuming Layout contains the Sidebar

export default function App({ Component, pageProps, data }) {
  const router = useRouter();
  const pathname = router.pathname;

  // Check if it's an admin page or admin account page
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAccountPage = pathname.startsWith("/admin/account");

  const renderLayout = () => {
    switch (true) {
      case isAdminAccountPage:
        // If it's the /admin/account page, render without Layout (no sidebar)
        return <Component {...pageProps} />;
      case isAdminPage:
        // If it's an admin page but not /admin/account, render Layout with Sidebar
        return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        );
      default:
        // For non-admin pages, render Header and Footer
        return (
          <>
            <Header apikey={process.env.API_KEY}/>
            <Component {...pageProps} />
            <FooterSection />
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
      </Head>

      {/* Render content based on the pathname */}
      {renderLayout()}
    </>
  );
}

// Fetch data server-side
export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}api/public/logo`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const result = await response.json();
    return { props: { data: result.fevicon, error: null } };
  } catch (err) {
    console.error("Failed to fetch home data:", err);
    return { props: { data: null, error: err.message } };
  }
}
