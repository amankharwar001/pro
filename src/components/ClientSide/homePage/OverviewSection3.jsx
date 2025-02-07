import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

const OverviewSection3 = ({ apidata1, apidata2 }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger the animation once when the section comes into view
        threshold: 0.2, // Trigger animation when 20% of the section is visible
    });


    const [breifImage, setbreifImage] = useState([]); // Initialize with an empty array or default value.
    const [multiImage, setmultiImage] = useState([]); // Initialize with an empty array or default value.

    useEffect(() => {
        const agentBriefImages = apidata1?.images.filter(
            (image) => image.referenceType === "homepage_section_3"
        );

        // Set the filtered images to the state
        if (agentBriefImages) {
            setbreifImage(agentBriefImages);
        }
    }, [apidata1]); // Run this effect when apidata1 changes
    useEffect(() => {
        const multi2Images = apidata2?.images.filter(
            (image) => image.referenceType === "homepage_section_4"
        );

        // Set the filtered images to the state
        if (multi2Images) {
            setmultiImage(multi2Images);
        }
    }, [apidata2]); // Run this effect when apidata1 changes



    const primaryImage1 = apidata1?.images.find(
        (image) => image.referenceType === "home_section3_1"
    );
    const primaryImage2 = apidata1?.images.find(
        (image) => image.referenceType === "home_section3_2"
    );

    const primary1Image_2 = apidata2?.images.find(
        (image) => image.referenceType === "homepage_section4"
    );





    return (
        <div className='pt-20'>

            <div className="container m-auto  relative -mb-44">
                <div className="grid md:grid-cols-[45%_45%] lg:grid-cols-[55%_40%] md:place-content-around  z-10 gap-10" ref={ref}>
                    <div className="relative ">
                        <div className='relative h-full md:h-auto md:mb-10 md:bottom-0 md:top-2/4 md:-translate-y-[65%] lg:-translate-y-[85%] md:max-w-xl'>
                            <Fade triggerOnce direction="up">
                                <h2 className="font-bold w-[95%] md:text-start text-h2 text-center">
                                    {/* Write Some heading related to content will come here lorem ipsum */}
                                    {apidata1?.heading}
                                </h2>
                            </Fade>
                            <Fade triggerOnce direction="up" delay={300}>
                                <div className="relative">
                                    <p className="mt-5 md:pb-5 md:text-start text-p text-center">
                                        {apidata1?.content}
                                    </p>
                                </div>
                            </Fade>
                        </div>
                        {/* agen brief image section */}
                        <div className=" right-10 flex max-w-[360px] m-auto -mt-10 md:mt-0">
                            <div className="bg-slate-100 m-auto w-[70%] md:w-[200px] rounded-xl md:p-5 py-2 px-10 pr-12 relative md:absolute  md:-bottom-10 lg:bottom-5 md:-right-16 lg:right-6">
                                {/* <div className="bg-slate-100 m-auto w-[70%] md:w-[200px] rounded-xl md:p-5 py-2 px-10 pr-12 relative top-24 md:top-5 lg:top-5 xl:top-24 "> */}
                                <span className="font-semibold flex text-center text-xs md:text-base items-center ">{apidata1?.agentBrief}</span>
                                <div>
                                    <div className="relative h-10 my-5 w-full">
                                        <motion.img
                                            className="rounded-full absolute w-12 z-10"
                                            src={`${breifImage[0]?.filePath || "/paramotor_assets/aboutsection/testimonial-2.jpg"}`}
                                            alt={`${breifImage[0]?.altText || "Paramotor avtar"}`}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                        />
                                        <motion.img
                                            className="rounded-full absolute w-12 left-[35px] z-20"
                                            src={`${breifImage[1]?.filePath || "/paramotor_assets/aboutsection/testimonial-2.jpg"}`}
                                            alt={`${breifImage[1]?.altText || "Paramotor avtar"}`}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                        />
                                        <motion.img
                                            className="rounded-full absolute w-12 left-[70px] z-30"
                                            src={`${breifImage[2]?.filePath || "/paramotor_assets/aboutsection/testimonial-2.jpg"}`}
                                            alt={`${breifImage[2]?.altText || "Paramotor avtar"}`}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                        />
                                        <motion.img
                                            className="rounded-full absolute w-12 left-[105px] z-40"
                                            src={`${breifImage[3]?.filePath || "/paramotor_assets/aboutsection/testimonial-2.jpg"}`}
                                            alt={`${breifImage[3]?.altText || "Paramotor avtar"}`}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* right 3 images */}
                    <div className="md:flex gap-3 lg:gap-5 flex-wrap md:flex-nowrap  items-center ">
                        <div className="grow max-w-[351px] m-auto md:m-0 md:min-w-[25vw] lg:min-w-[20vw] xl:min-w-[280px]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.7 }}
                            >
                                <Image
                                    src={`${primaryImage1?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                    alt={`${primaryImage1?.altText || "Paramotor Logo"}`}
                                    className="rounded-xl w-full h-auto object-cover"
                                    layout="responsive"
                                    width={351}
                                    height={560} // Aspect ratio set here for responsive layout
                                />
                            </motion.div>
                        </div>
                        <div className="relative py-8 md:py-0">
                            <div className="mb-20 md:mb-0   m-auto max-w-[351px] md:w-full bg-slate-200 rounded-xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6, duration: 0.7 }}
                                >
                                    <Image
                                        src={`${primaryImage2?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                        alt={`${primaryImage2?.altText || "Paramotor Logo"}`}
                                        className="w-full h-auto object-contain"
                                        layout="responsive"
                                        width={400} // Customize as needed for the container's width
                                        height={320} // Aspect ratio for responsive behavior
                                    />
                                </motion.div>
                            </div>
                            <div className="px-5 relative -top-10 md:top-0 rounded-2xl bg-[#00122C] w-[80%] m-auto  md:w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.7, duration: 0.7 }}
                                    className="m-auto  md:w-full mt-5   py-2 px-1 xl:px-5"
                                >
                                    <div className="mt-0">
                                        <span className="font-semibold text-white text-[2.2rem] xl:text-[3.5rem] leading-10">
                                            {apidata1?.leadNo}
                                        </span>
                                        <br />
                                        <span className="text-white">{apidata1?.leadName}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Blue section start */}
                <div className="mt-16 pt-16 md:pt-36 bg-[#003066] rounded-t-3xl relative -top-44 md:-top-32 lg:-top-44 -z-[1]">
                    <div className="md:grid grid-cols-2">
                        <div className="relative">
                            {/* phone image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.7, duration: 0.7 }}
                                className="w-full flex items-end justify-center"
                            >
                                <Image
                                    src={`${primary1Image_2?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                    alt={`${primary1Image_2?.altText || "Paramotor Logo"}`}
                                    className="rounded-xl bg-slate-200 w-[60vw] md:w-72"
                                    width={550}
                                    height={100}
                                />
                            </motion.div>
                            {/* small component image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8, duration: 0.7 }}
                                className="absolute top-36 right-10 shadow-lg"
                            >
                                <Image
                                    src={`${multiImage[0]?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                    alt={`${multiImage[0]?.altText || "Paramotor Logo"}`}
                                    className="rounded-xl bg-slate-200 w-[40vw] md:w-52 overflow-hidden"
                                    width={750}
                                    height={120}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.9, duration: 0.7 }}
                                className="absolute top-14 right-5 md:right-14 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={`${multiImage[1]?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                    alt={`${multiImage[1]?.altText || "Paramotor Logo"}`}
                                    className="rounded-t-lg bg-slate-200 w-full md:w-16"
                                    width={100}
                                    height={100}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.9, duration: 0.7 }}
                                className="absolute bottom-10 left-10     rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={`${multiImage[2]?.filePath || "/paramotor_assets/aboutsection/phonecard.jpg"}`}
                                    alt={`${multiImage[2]?.altText || "Paramotor Logo"}`}
                                    className="rounded-lg bg-slate-200 max-w-[60px]  md:max-w-[80px]"
                                    width={100}
                                    height={100}
                                />
                            </motion.div>
                        </div>
                        <div>
                            <div className="px-6 rounded-lg">
                                <h2 className="text-h2_big text-center md:text-start mt-10 md:mt-0 font-bold mb-4 text-white">{apidata2?.heading}</h2>
                                <p className="text-base text-center md:text-start md:text-xl mb-6 text-white">
                                    {apidata2?.content}
                                </p>
                            </div>
                            <div className="flex md:justify-start justify-center pb-10  text-white items-center bg-background px-6">
                                <div className="text-center mr-8">
                                    <div className="text-h2_big font-bold text-red-600">{apidata2?.leadDetails[0].leadNo}</div>
                                    <span className="text-muted-foreground">{apidata2?.leadDetails[0].leadName}</span>
                                </div>
                                <div className="border-l-2 border-muted h-16"></div>
                                <div className="text-center ml-8">
                                    <div className="text-h2_big font-bold text-red-600">{apidata2?.leadDetails[1].leadNo}</div>
                                    <span className="text-muted-foreground">{apidata2?.leadDetails[1].leadName}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {/* Blue section end */}
            </div>
        </div>
    );
};

export default OverviewSection3;




