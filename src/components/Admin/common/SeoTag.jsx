import React from "react";
import Head from "next/head";

const SeoTag = ({ seo }) => {
  const baseUrl = "https://example.com"; // Replace with your site's base URL
  const slug = seo?.pageType || "product"; // Use pageType as the slug or fallback

  return (
    <Head>
      {/* Basic SEO */}
      <title>{seo?.title || "Default Title"}</title>
      <meta name="description" content={seo?.description || "Default Description"} />
      <meta name="keywords" content={seo?.keyword?.join(", ") || "Default Keywords"} />
      <link rel="canonical" href={`${baseUrl}/${slug}`} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={seo?.title || "Default Title"} />
      <meta property="og:description" content={seo?.description || "Default Description"} />
      <meta property="og:url" content={`${baseUrl}/${slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Your Site Name" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={seo?.title || "Default Title"} />
      <meta name="twitter:description" content={seo?.description || "Default Description"} />
      <meta name="twitter:url" content={`${baseUrl}/${slug}`} />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:creator" content="@YourTwitterHandle" />
    </Head>
  );
};

export default SeoTag;
