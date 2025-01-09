import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";
import Head from 'next/head';

export default function App({ Component, pageProps,data }) {

  return (
    <>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}${data?.filePath}`} />
      </Head>
      <Component {...pageProps} />
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

