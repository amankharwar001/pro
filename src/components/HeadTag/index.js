import Head from 'next/head';
import React from 'react'

const HeadTagSEO = ({data}) => {
    return (
        <Head>

            <title>{data?.seoData?.title}</title>
            <meta name="description" content={data?.seoData?.description} />
            <meta name="keywords" content={data?.seoData?.keyword.join(", ")} />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="article" />
            {/* canonical url is empty */}
            <link rel="canonical" href={`url`} />
            <meta property="og:title" content={data?.seoData?.title} />
            <meta property="og:description" content={data?.seoData?.description}/>
            {/* blog url is empty */}
            <meta property="og:url" content={"url"} /> 
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data?.seoData?.title} />
            <meta name="twitter:description" content={data?.seoData?.description} />
            
        </Head>
    )
}

export default HeadTagSEO;