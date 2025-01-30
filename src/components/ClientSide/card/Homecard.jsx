

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Homecard = ({ apidata }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [activeIndex, setActiveIndex] = useState(0); // Track the active card
    console.log("active index show is here", apidata)

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: index * 0.3 },
        }),
    };

    const settings = {
        infinite: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3,  // Display 3 images at once
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        beforeChange: (current, next) => {
            setActiveIndex(next); // Update active index based on the next slide
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, apidata?.card.length), 
                    centerMode: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                },
            },
            {
                breakpoint: 600, // Example breakpoint for smaller screens
                settings: {
                    slidesToShow: 1, 
                    centerMode: true, 
                    centerPadding: '20px', // Adjust padding as needed
                },
            },
            {
                breakpoint: 480, // Example breakpoint for mobile devices
                settings: {
                    slidesToShow: 1, 
                    centerMode: true, 
                    centerPadding: '10px', // Adjust padding as needed
                },
            },
        ],
    };

    return (
        <div ref={ref} className="pt-20 ">
            <div className="container text-center ">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold ">{apidata?.heading}</h2>
                <p className="mt-2 text-base md:text-xl text-slate-700">{apidata?.content}</p>
            </div>
            <div className="container overflow-hidden mt-10">
                <Slider {...settings} className="md:homepage-card-slider flex ">
                    {apidata?.card.map((card, index) => (
                        <div key={index} className=" p-5">

                            <motion.div
                                key={index}
                                className={`${index === activeIndex
                                    ? 'bg-[#013466] text-white ' // Active card styling
                                    : 'bg-white text-black' // Default card styling
                                    }   relative pb-10  min-w-[320px]  mx-auto h-full  border rounded-lg shadow-lg mt-10 transition-transform duration-300`}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                variants={cardVariants}
                                custom={index}
                            >

                                <div className="h-full">
                                    <div className="px-8 relative -top-10">
                                        <div className="w-full relative overflow-hidden">
                                            <Image
                                                src={`/${apidata?.images[index]?.filePath}`}
                                                alt={apidata?.images[index]?.altText || 'Card Image'}
                                                className="rounded-xl w-full h-auto object-cover border border-slate-400"
                                                width={320}
                                                height={150}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-6 ">
                                        <h2 className="text-[1.7rem] font-bold text-center ">{card.title }</h2>
                                        <div
                                            className="text-muted-foreground text-center mt-2"
                                            dangerouslySetInnerHTML={{ __html: card.content }}
                                        ></div>
                                        <hr className="my-4 border-border" />
                                        <div
                                            className="text-center text-muted "
                                            dangerouslySetInnerHTML={{ __html: card.info }}
                                        ></div>
                                        <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
                                            <button
                                                className={`${index === activeIndex
                                                    ? 'bg-white text-black shadow-md'
                                                    : 'bg-[#013466] hover:bg-red-600 text-white'
                                                    } flex m-auto items-center justify-center py-3 px-5 rounded-full`}
                                                onClick={() => window.open(card.btnlink, '_blank')}
                                            >
                                                {card.btnname}
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
                className="container w-full flex justify-center mt-8 text-xs"
                dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}
            ></div>
        </div>
    );
};

export default Homecard;























































// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import Slider from "react-slick";
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';

// const Homecard = ({ apidata }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true });

//     const [activeIndex, setActiveIndex] = useState(0); // Track the active card

//     const cardVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: (index) => ({
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.8, delay: index * 0.3 },
//         }),
//     };

//     const settings = {
//         infinite: true,
//         centerMode: true,
//         centerPadding: "0px",
//         slidesToShow: 3,  // Display 3 images at once on large screens
//         speed: 500,
//         autoplay: false,
//         autoplaySpeed: 3000,
//         beforeChange: (current, next) => {
//             setActiveIndex(next); // Update active index based on the next slide
//         },
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     centerMode: true,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     centerMode: true,
//                 },
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: '20px',
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: '10px',
//                 },
//             },
//         ],
//     };

//     return (
//         <div ref={ref} className="pt-20">
//             <div className="container text-center">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl text-slate-700">{apidata?.content}</p>
//             </div>
//             <div className="container overflow-hidden mt-10">
//                 <Slider {...settings} className="md:homepage-card-slider flex">
//                     {apidata?.card.map((card, index) => (
//                         <div key={index} className="p-5">
//                             <motion.div
//                                 key={index}
//                                 className={`
//                                     relative pb-10 min-w-[320px] mx-auto h-full border rounded-lg shadow-lg mt-10 transition-transform duration-300
//                                     ${index === activeIndex ? 'bg-[#013466] text-white' : 'bg-white text-black'}
                                    
//                                     ${index === activeIndex && settings.slidesToShow === 3 ? 'lg:bg-[#013466] lg:text-white' : 'lg:bg-white lg:text-black'}
//                                 `}
//                                 initial="hidden"
//                                 animate={isInView ? 'visible' : 'hidden'}
//                                 variants={cardVariants}
//                                 custom={index}
//                             >
                            

//                                 <div className="h-full">
//                                     <div className="px-8 relative -top-10">
//                                         <div className="w-full relative overflow-hidden">
//                                             <Image
//                                                 src={`/${apidata?.images[index]?.filePath}`}
//                                                 alt={apidata?.images[index]?.altText || 'Card Image'}
//                                                 className="rounded-xl w-full h-auto object-cover border border-slate-400"
//                                                 width={320}
//                                                 height={150}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="px-6">
//                                         <h2 className="text-[1.7rem] font-bold text-center">{card.title}</h2>
//                                         <div className="text-muted-foreground text-center mt-2" dangerouslySetInnerHTML={{ __html: card.content }}></div>
//                                         <hr className="my-4 border-border" />
//                                         <div className="text-center text-muted" dangerouslySetInnerHTML={{ __html: card.info }}></div>
//                                         <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
//                                             <button
//                                                 className={`${index === activeIndex
//                                                     ? 'bg-white text-black shadow-md'
//                                                     : 'bg-[#013466] hover:bg-red-600 text-white'
//                                                     } flex m-auto items-center justify-center py-3 px-5 rounded-full`}
//                                                 onClick={() => window.open(card.btnlink, '_blank')}
//                                             >
//                                                 {card.btnname}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//             <div
//                 className="container w-full flex justify-center mt-8 text-xs"
//                 dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}
//             ></div>
//         </div>
//     );
// };

// export default Homecard;













































// import "swiper/css";
// import "swiper/css/autoplay"; // Import autoplay style

// import "swiper/css/navigation";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// import React, { useState } from "react";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const Homecard = ({ apidata }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true });

//     const [activeIndex, setActiveIndex] = useState(0);

//     return (
//         <div ref={ref} className="pt-20">
//             <div className="container text-center">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl text-slate-700">{apidata?.content}</p>
//             </div>
//             <div className=" mt-10">
//                 <Swiper
//                     slidesPerView={3} // Default 3 cards on larger screens
                    
//                     loop={false} // Disable infinite loop
//                     centeredSlides={true} // Center the slides
//                     autoplay={{
//                         delay: 3000, // Set autoplay delay
//                         disableOnInteraction: false, // Continue autoplay on interaction
//                     }}
//                     pagination={{ clickable: false }} // Disable dots pagination
//                     navigation={false} // Disable arrows
//                     modules={[Pagination, Navigation, Autoplay]} // Import modules
//                     breakpoints={{
//                         1024: { slidesPerView: 3 }, // Show 3 cards on large screens
//                         768: { slidesPerView: 2 }, // Show 2 cards on medium screens
//                         600: { slidesPerView:2 }, // Show 1 card on small screens
//                         480: { slidesPerView: 2 }, // Show 1 card on very small screens
//                     }}
//                     onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    
//                     speed={600} // Smooth transition speed
//                     effect="slide" // Ensure smooth slide transition (not fade)
//                 >
//                     {apidata?.card.map((card, index) => {
//                         const isHighlighted = index === activeIndex; // Center card highlight logic

//                         return (
//                             <div>
//                                 <SwiperSlide key={index} className="p-5 md:hidden">
//                                     <motion.div
//                                         className={`relative pb-10 min-w-[320px] mx-auto h-full border rounded-lg shadow-lg mt-10 transition-transform duration-300
//                                         ${isHighlighted ? "bg-[#013466] text-white" : "bg-white text-black"}`}
//                                         initial="hidden"
//                                         animate={isInView ? "visible" : "hidden"}
//                                     >
//                                         <div className="h-full">
//                                             <div className="px-8 relative -top-10">
//                                                 <div className="w-full relative overflow-hidden">
//                                                     <Image
//                                                         src={`/${apidata?.images[index]?.filePath}`}
//                                                         alt={apidata?.images[index]?.altText || "Card Image"}
//                                                         className="rounded-xl w-full h-auto object-cover border border-slate-400"
//                                                         width={320}
//                                                         height={150}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="px-6">
//                                                 <h2 className="text-[1.7rem] font-bold text-center">{card.title}</h2>
//                                                 <div className="text-muted-foreground text-center mt-2" dangerouslySetInnerHTML={{ __html: card.content }}></div>
//                                                 <hr className="my-4 border-border" />
//                                                 <div className="text-center text-muted" dangerouslySetInnerHTML={{ __html: card.info }}></div>
//                                                 <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
//                                                     <button
//                                                         className={`${
//                                                             isHighlighted
//                                                                 ? "bg-white text-black shadow-md"
//                                                                 : "bg-[#013466] hover:bg-red-600 text-white"
//                                                         } flex m-auto items-center justify-center py-3 px-5 rounded-full`}
//                                                         onClick={() => window.open(card.btnlink, "_blank")}
//                                                     >
//                                                         {card.btnname}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 </SwiperSlide>
                                                        
//                             </div>
//                         );
//                     })}
//                 </Swiper>
//             </div>
//             <div
//                 className="container w-full flex justify-center mt-8 text-xs"
//                 dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}
//             ></div>
//         </div>
//     );
// };

// export default Homecard;









