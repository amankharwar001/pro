import React from "react";
import Head from "next/head";
import FooterSection from "../../components/ClientSide/commonComponent/FooterSection";
import HeroSections from "../../components/ClientSide/contactPage/HeroSections";
import Brand from "../../components/ClientSide/product/Brand";
import CardSection1 from "../../components/ClientSide/product/CardSection1";
import CardSection2 from "../../components/ClientSide/product/CardSection2";
import PaymentOptions from "../../components/ClientSide/product/PaymentOptions";
import WeWorkSection from "../../components/ClientSide/product/WeWorkSection";
import WeChooseSection from "../../components/ClientSide/product/WeChooseSection";

const ProductPage = ({ data, error, baseUrl }) => {
  if (error) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-red-500">404 - Product Not Found</h1>
        <p className="text-gray-600 mt-4">The product you are looking for does not exist.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  const { seo } = data;

  return (
    <div>
      {/* Dynamic SEO Meta Tags */}
      <Head>
        <title>{seo?.title || "Default Title"}</title>
        <meta name="description" content={seo?.description || "Default Description"} />
        <meta name="keywords" content={seo?.keyword?.join(", ") || "Default Keywords"} />
        <link rel="canonical" href={`${baseUrl}/${seo?.slug || "product"}`} />
        <meta property="og:title" content={seo?.title || "Default Title"} />
        <meta property="og:description" content={seo?.description || "Default Description"} />
        <meta property="og:url" content={`${baseUrl}/${seo?.slug || "product"}`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>

      <HeroSections heroSection={data.heroSection.heroSectionData} image={data.heroSection.Images[0].filePath} baseUrl={baseUrl} />
      <Brand section2={data.section2} baseUrl={baseUrl} />
      <CardSection1 section3={data.section3} baseUrl={baseUrl} />
      <CardSection2 section4={data.section4} baseUrl={baseUrl} />
      <PaymentOptions section5={data.section5} baseUrl={baseUrl} />
      <WeWorkSection section6={data.section6} baseUrl={baseUrl} />
      <WeChooseSection section7={data.section7} baseUrl={baseUrl} />
      <FooterSection />
    </div>
  );
};

// Fetch data server-side
export async function getServerSideProps(context) {
  const { product } = context.query; // Extract the product slug from query params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  if (!product) {
    return { props: { error: "Product not found", data: null, baseUrl } };
  }

  try {
    const response = await fetch(`${baseUrl}/api/product/${product}`);
    if (!response.ok) {
      return { props: { error: "Product not found", data: null, baseUrl } };
    }
    const data = await response.json();
    return { props: { data, error: null, baseUrl } };
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return { props: { error: err.message, data: null, baseUrl } };
  }
}

export default ProductPage;