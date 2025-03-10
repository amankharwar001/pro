
import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";
import Head from 'next/head';
import Header from '@/components/ClientSide/commonComponent/Header';
import { useRouter } from "next/router";
import FooterSection from '@/components/ClientSide/commonComponent/FooterSection';
import Layout from '@/components/Admin/common/Layout'; // Assuming Layout contains the Sidebar
import { FaArrowCircleUp } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";

export default function App({ Component, pageProps, data }) {
  const router = useRouter();
  const pathname = router.pathname;
  console.log("logo show is here1111", data)
  // Check if it's an admin page or admin account page
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAccountPage = pathname.startsWith("/admin/account");
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            <Header apikey={process.env.API_KEY} img={data} />
            <div className='mt-[78px] md:pt-[0px] lg:mt-[74px] xl:mt-[83px] '> </div>
            
            <Component {...pageProps} />
            <FooterSection />
            {showScroll && (
              <span
                className="fixed z-[999]  bottom-16 md:bottom-20  right-10 md:right-0 w-[8vw] text-black cursor-pointer"
                onClick={scrollToTop}
              >
                <IoIosArrowUp
                  className="border rounded-md w-12 h-12 p-2   shadow-xl bg-gray-200/90 hover:bg-gray-200 hover:scale-105"
                  
                />
              </span>
            )}</>
        );
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
     
      </Head>

      {/* Render content based on the pathname */}
      {renderLayout()}
    </>
  );
}

// Fetch data server-side
export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}api/public/logo`, {
      headers: {
       'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY, 
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const result = await response.json();
    return { props: { data: result, error: null } };
  } catch (err) {
    console.error("Failed to fetch home data:", err);
    return { props: { data: null, error: err.message } };
  }
}


























