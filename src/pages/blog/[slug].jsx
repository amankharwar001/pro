import React, { useEffect, useState } from 'react';
import Header from '../../components/ClientSide/commonComponent/Header';
import FooterSection from '../../components/ClientSide/commonComponent/FooterSection';
import Image from 'next/image';
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import SocialShare from '../../components/ClientSide/blog/SocialShare';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Found4O4 from '@/components/NotFound/4O4'; // Your custom 404 component

const Slug = ({ data, error, baseUrl }) => {
    const blogUrl = `${baseUrl}blog/${data?.seo?.slug}`;
    const featureImageUrl = data?.featureImage ? `${baseUrl}${data?.featureImage?.filePath}` : null;
    const [safeContent, setSafeContent] = useState("");
        
          useEffect(() => {
            if (data?.content.content) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(data.content.content, "text/html");
        
              const tables = doc.querySelectorAll("table");
              tables.forEach((table) => {
                const wrapper = doc.createElement("div");
                wrapper.setAttribute("class", "overflow-x-auto my-4");
                table.parentNode?.insertBefore(wrapper, table);
                wrapper.appendChild(table);
              });
        
              setSafeContent(doc.body.innerHTML);
            }
          }, [data]);

    // Check if the status is not 'active' or if data is missing
    if (error || !data || data.status !== 'active') {
        return (<Found4O4 />);
    }

    return (
        <div className='scroll-smooth'>
            {/* SEO and Meta tags */}
            <Head>
                <title>{data?.seo?.title}</title>
                <meta name="description" content={data?.seo?.description} />
                <meta name="keywords" content={data?.seo?.keyword.join(", ")} />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={`${baseUrl}blog/${data?.seo?.slug || "blog"}`} />
                <meta property="og:title" content={data?.seo?.title} />
                <meta property="og:description" content={data?.seo?.description} />
                <meta property="og:image" content={featureImageUrl} />
                <meta property="og:url" content={blogUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={data?.seo?.title} />
                <meta name="twitter:description" content={data?.seo?.description} />
                <meta name="twitter:image" content={featureImageUrl} />
            </Head>

            <div className='container mt-5'>
                {featureImageUrl ? (
                    <Image
                        src={featureImageUrl}
                        alt={data.featureImage?.altText }
                        className="w-full h-auto object-cover md:h-[420px]"
                        style={{ aspectRatio: '16/9' }}
                        width={800}
                        height={100}
                    />
                ) : (
                    <Image
                        src='/fallback/image.webp'
                        className="w-full h-auto object-cover md:h-[420px]"
                        style={{ aspectRatio: '16/9' }}
                        width={800}
                        height={100}
                    />
                )}
            </div>
            <div className='container'>
                <div className='md:px-10'>
                    <div>
                        <h1 className='text-h1_small py-5 font-bold'>{data.heading}</h1>
                        <div className='flex gap-10 items-center'>
                            <span className='flex items-center gap-2 text-blue-500'>
                                <FaUser />By Admin
                            </span>
                            <span className='flex items-center gap-2 text-blue-500'>
                                <FaRegCalendarAlt />{data.createAt}
                            </span>
                        </div>
                        <hr />
                    </div>
                    <div
                        className="mt-8 blog-content-editor prose max-w-7xl m-auto"
                        dangerouslySetInnerHTML={{ __html: safeContent || "no content available" }}
                    />
                </div>
            </div>

            <SocialShare url={blogUrl} title={data.heading} />
            <div className='pt-10'></div>

        </div>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

    if (!slug) {
        return { props: { error: "Blog not found", data: null, baseUrl } };
    }

    try {
        // Check if blog activation is enabled
        const activationRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/public/blog/activate`);
        const activationData = await activationRes.json();

        if (activationData.status !== "active") {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        const response = await fetch(`${baseUrl}/api/public/blog/${slug}`, {
            headers: {
                'x-system-key': process.env.NEXT_PUBLIC_SYSTEM_KEY,
            },
        }
        );
        if (!response.ok) {
            return { props: { error: "Blog not found", data: null, baseUrl } };
        }
        const data = await response.json();

        // If the blog is not active or missing required fields
        if (!data || data.status !== 'active') {
            return { props: { error: "Blog not active", data: null, baseUrl } };
        }

        return { props: { data, error: null, baseUrl } };
    } catch (err) {
        console.error("Failed to fetch blog:", err);
        return { props: { error: err.message, data: null, baseUrl } };
    }
}

export default Slug;
