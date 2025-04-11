import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// jhajksf
const Homecard = ({ apidata }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [activeIndex, setActiveIndex] = useState(0);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: index * 0.3 },
        }),
    };



    const CustomPrevArrow = ({ onClick }) => (
        <button
            className="absolute left-0 z-10 transform -translate-y-1/2 top-1/2  text-black p-2 rounded-full shadow-xl bg-gray-200/90 hover:bg-gray-200 hover:scale-105"
            onClick={onClick}
        >
            <ChevronLeft size={24} />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            className="absolute right-0 z-10 transform -translate-y-1/2 top-1/2  text-black p-2 rounded-full shadow-xl bg-gray-200/90 hover:bg-gray-200 hover:scale-105"
            onClick={onClick}
        >
            <ChevronRight size={24} />
        </button>
    );

    const settings = {
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        
        beforeChange: (current, next) => {
            setActiveIndex(next);
        },
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, apidata?.card.length),
                    centerMode: true,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                },
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    centerPadding: '10px',
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '10px',
                },
            },
        ],
    };

    return (
        <div ref={ref} className="pt-20 ">
            <div className="max-w-2xl m-auto  text-center ">
                <h2 className="text-h2_medium  ">{apidata?.heading}</h2>
                <div
                className="mt-2 text-p text-paragraph"
                dangerouslySetInnerHTML={{ __html: apidata?.content }}
              />
            </div>
            <div className="container overflow-hidden mt-10">
                <Slider {...settings} className="md:homepage-card-slider flex ">
                    {apidata?.card.map((card, index) => (

                        <div key={index} className=" p-5 h-full">

                            <motion.div
                                key={index}
                                className={`${index === activeIndex
                                    ? 'bg-[#013466] text-white '
                                    : 'bg-white text-black'
                                    }   relative pb-10  min-w-[240px]  mx-auto h-full  border rounded-lg shadow-lg mt-10 transition-transform duration-300`}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                variants={cardVariants}
                                custom={index}
                            >

                                <div className="h-full">
                                    <div className="px-8 relative -top-10">
                                        <div className="w-full relative overflow-hidden">
                                            {/* <Image
                                                src={`homepage_section6_${index + 1} ==apidata?.images.referenceType && /${apidata?.images[index]?.filePath}`}
                                                alt={apidata?.images[index]?.altText || 'Card Image'}
                                                className="rounded-xl w-full md:h-[14vw] 2xl:h-[210px]  border border-slate-400"
                                                width={320}
                                                height={150}
                                            /> */}
                                            <Image
                                                src={card.image ||""}
                                                alt={card.imagealt || 'Card Image'}
                                                className="rounded-xl w-full ontab_210 md:h-[14vw] 2xl:h-[210px] border border-slate-400"
                                                width={320}
                                                height={150}
                                            />


                                        </div>
                                    </div>
                                    <div className="px-3 xl:px-6 homecard-ptag  h-[auto] sm:h-[420px] md:h-[480px] lg:h-[480px] xl:h-[320px]">
                                        <h2 className="text-h2_small font-bold text-center ">{card.title}</h2>
                                        <div
                                            className="text-muted-foreground text-center mt-2 "
                                            dangerouslySetInnerHTML={{ __html: card.content }}
                                        ></div>
                                        <hr className="my-4 border-border" />
                                        <div
                                            className="text-center text-muted homecard-ptag_lineheight "
                                            dangerouslySetInnerHTML={{ __html: card.info }}
                                        ></div>
                                        <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
                                            <button
                                                className={`${index === activeIndex
                                                    ? 'bg-white text-black shadow-md'
                                                    : 'bg-[#013466] hover:bg-red-600 text-white'
                                                    } flex m-auto items-center justify-center text-button py-3 px-5 rounded-full`}
                                                onClick={() => window.open(card.buttonLink
                                                    , '_blank')}
                                            >
                                                {card.buttonName}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div
                className="container w-full flex justify-center mt-8 text-xs subtext_bottom"
                dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}
            ></div>
        </div>
    );
};

export default Homecard;














