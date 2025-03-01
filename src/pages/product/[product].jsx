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
import Found4O4 from "@/components/NotFound/4O4";

const ProductPage = ({ data, error, baseUrl }) => {
 
  if (error) {
    return (
      <Found4O4 />
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

      
      {/* <HeroSections heroSection={data.heroSection.heroSectionData} hjg image={data.heroSection?.Images[0]?.filePath} baseUrl={baseUrl} />
      <Brand section2={data.section2} baseUrl={baseUrl} />
      <CardSection1 section3={data.section3} baseUrl={baseUrl} />
      <CardSection2 section4={data.section4} baseUrl={baseUrl} />
      <PaymentOptions section5={data.section5} baseUrl={baseUrl} />
      <WeWorkSection section6={data.section6} baseUrl={baseUrl} />
      <WeChooseSection section7={data.section7} baseUrl={baseUrl} /> */}
      {data.heroSection?.heroSectionData && (
        <HeroSections
          heroSection={data.heroSection.heroSectionData}
          image={data.heroSection?.Images[0]?.filePath}
          baseUrl={baseUrl}
        />
      )}

      {data.section2 && (
        <Brand
          section2={data.section2}
          baseUrl={baseUrl}
        />
      )}

      {data.section3 && (
        <CardSection1
          section3={data.section3}
          baseUrl={baseUrl}
        />
      )}

      {data.section4 && (
        <CardSection2
          section4={data.section4}
          baseUrl={baseUrl}
        />
      )}

      {data.section5 && (
        <PaymentOptions
          section5={data.section5}
          baseUrl={baseUrl}
        />
      )}

      {data.section6 && (
        <WeWorkSection
          section6={data.section6}
          baseUrl={baseUrl}
        />
      )}

      {data.section7 && (
        <WeChooseSection
          section7={data.section7}
          baseUrl={baseUrl}
        />
      )}

    </div>
  );
};

export async function getServerSideProps(context) {
  const { product } = context.query; 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  if (!product) {
    return { props: { error: "Product not found", data: null, baseUrl } };
  }

  try {
    const response = await fetch(`${baseUrl}/api/product/${product}`, {
      headers: {
        'api-key': process.env.API_KEY, 
      },
    });
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
