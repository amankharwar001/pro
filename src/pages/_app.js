import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";
import Head from 'next/head';
import Header from '@/components/ClientSide/commonComponent/Header';
import { useRouter } from "next/router";
import FooterSection from '@/components/ClientSide/commonComponent/FooterSection';
import Layout from '@/components/Admin/common/Layout';

export default function App({ Component, pageProps,data }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");


  return (
    <>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
      </Head>
      {isAdminPage ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <FooterSection />
        </>
      )}
      {/* {!isAdminPage && <Header />}
      
      <Component {...pageProps} />
      {!isAdminPage && <FooterSection />} */}

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

