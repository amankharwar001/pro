// import React from 'react';
// import Image from 'next/image';
// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';

// const Homecard = ({ apidata }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true });

//     const cardVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: (index) => ({
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.8, delay: index * 0.3 } // stagger by index
//         })
//     };

//     return (
//         <div ref={ref}>
//             <div className="container text-center py-20">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
//             </div>
//             <div className="flex flex-wrap justify-center mt-10 md:mt-28 container md:px-0 m-auto gap-y-36 lg:px-10">
//                 {apidata?.card.map((card, index) => (
//                     <motion.div
//                         key={index}
//                         className={`${index === 1 ? 'bg-[#013466] text-white relative md:-top-10 ' : 'bg-white'} grow lg:max-w-[360px] relative pb-10 max-w-sm mx-auto bg-card border rounded-lg shadow-lg`}
//                         initial="hidden"
//                         animate={isInView ? 'visible' : 'hidden'}
//                         variants={cardVariants}
//                         custom={index} // custom prop to control stagger
//                     >
//                         <div>
//                             <div className="px-8 relative -top-10">
//                                 <Image
//                                     src={`/${apidata?.images[index]?.filePath}`}
//                                     alt={apidata?.images[index]?.altText || 'Card Image'}
//                                     className="rounded-xl bg-slate-200 w-full object-cover border border-slate-400"
//                                     width={320}
//                                     height={150}
//                                 />
//                             </div>
//                             <div className="px-6">
//                                 <h2 className="text-2xl font-bold text-center text-primary">{card.title}</h2>
//                                 <div
//                                     className="text-muted-foreground text-center mt-2"
//                                     dangerouslySetInnerHTML={{ __html: card.content }}
//                                 ></div>
//                                 <hr className="my-4 border-border" />
//                                 <div
//                                     className="text-center text-muted"
//                                     dangerouslySetInnerHTML={{ __html: card.info }}
//                                 ></div>
//                                 <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
//                                     <button
//                                         className={`${index === 1 ? "bg-white text-black shadow-md"  :"bg-[#013466] hover:bg-red-600 text-white "}  flex m-auto items-center justify-center py-3 px-5 rounded-full`}
//                                         onClick={() => window.open(card.btnlink, '_blank')}
//                                     >
//                                         {card.btnname}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//             <div
//                 className="container w-full flex justify-center mt-8 text-xs"
//                 dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}

//             ></div>
//         </div>
//     );
// };

// export default Homecard;












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

//     const [activeIndex, setActiveIndex] = useState(null); // Track the active card

//     const cardVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: (index) => ({
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.8, delay: index * 0.3 } // stagger by index
//         })
//     };

//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "60px",
//         slidesToShow: 3,
//         speed: 500,
//         arrows: false,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         beforeChange: (current, next) => setActiveIndex(next), // Update active card index
//         responsive: [
//             {
//                 breakpoint: 1024, // Tablet and above
//                 settings: {
//                     slidesToShow: 3, // Show 3 cards on larger devices
//                 }
//             },
//             {
//                 breakpoint: 768, // Mobile and below
//                 settings: {
//                     slidesToShow: 1, // Show only 1 card on mobile
//                 }
//             }
//         ]
//     };

//     return (
//         <div ref={ref}>
//             <div className="container text-center py-20">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
//             </div>
//             <div className="container">
//                 <Slider {...settings}>
//                     {apidata?.card.map((card, index) => (
//                         <motion.div
//                             key={index}
//                             className={`${index === activeIndex ? 'bg-blue-600 text-white' : 'bg-white'} 
//                                 grow lg:max-w-[360px] relative pb-10 max-w-sm mx-auto bg-card border rounded-lg shadow-lg`}
//                             initial="hidden"
//                             animate={isInView ? 'visible' : 'hidden'}
//                             variants={cardVariants}
//                             custom={index} // custom prop to control stagger
//                         >
//                             <div>
//                                 <div className="px-8 relative -top-10">
//                                     <Image
//                                         src={`/${apidata?.images[index]?.filePath}`}
//                                         alt={apidata?.images[index]?.altText || 'Card Image'}
//                                         className="rounded-xl bg-slate-200 w-full object-cover border border-slate-400"
//                                         width={320}
//                                         height={150}
//                                     />
//                                 </div>
//                                 <div className="px-6">
//                                     <h2 className="text-2xl font-bold text-center text-primary">{card.title}</h2>
//                                     <div
//                                         className="text-muted-foreground text-center mt-2"
//                                         dangerouslySetInnerHTML={{ __html: card.content }}
//                                     ></div>
//                                     <hr className="my-4 border-border" />
//                                     <div
//                                         className="text-center text-muted"
//                                         dangerouslySetInnerHTML={{ __html: card.info }}
//                                     ></div>
//                                     <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
//                                         <button
//                                             className={`${index === activeIndex ? "bg-white text-black shadow-md" : "bg-[#013466] hover:bg-red-600 text-white"}  flex m-auto items-center justify-center py-3 px-5 rounded-full`}
//                                             onClick={() => window.open(card.btnlink, '_blank')}
//                                         >
//                                             {card.btnname}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
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

//     const [activeIndex, setActiveIndex] = useState(null); // Track the active card

//     const cardVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: (index) => ({
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.8, delay: index * 0.3 } // stagger by index
//         })
//     };

//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "60px",
//         slidesToShow: 3, // Default to 3 slides for larger screens
//         speed: 500,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         beforeChange: (current, next) => setActiveIndex(next), // Update active card index
//         responsive: [
//           {
//             breakpoint: 1024, // Tablet and above
//             settings: {
//               slidesToShow: 3, // Show 3 slides on larger devices
//             }
//           },
//           {
//             breakpoint: 768, // Mobile and below
//             settings: {
//               slidesToShow: 1, // Show only 1 slide on mobile
//               centerMode: false, // Disable center mode on mobile for better layout
//               centerPadding: "0", // Remove the extra padding on mobile
//             }
//           }
//         ]
//       };


//     return (
//         <div ref={ref}>
//             <div className="container text-center pt-20 pb-10">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
//             </div>
//             <div className="container overflow-hidden">
//                 <Slider {...settings} className="homepage-card-slider  ">
//                     {apidata?.card.map((card, index) => (
//                         <div key={index}>
//                             <motion.div
//                                 key={index}
//                                 className={`${index === activeIndex ? 'bg-[#013466] text-white' : 'bg-white'} 
//                                 grow lg:max-w-[360px] relative pb-10 max-w-[350px] mx-auto h-full bg-card border rounded-lg shadow-lg mt-10 `}
//                                 initial="hidden"
//                                 animate={isInView ? 'visible' : 'hidden'}
//                                 variants={cardVariants}
//                                 custom={index} // custom prop to control stagger
//                             >
//                                 <div className="h-full">
//                                     <div className="px-8 relative -top-10">
//                                         <div className="w-full relative overflow-hidden"> {/* Adjusted height and flexbox */}
//                                             <Image
//                                                 src={`/${apidata?.images[index]?.filePath}`}
//                                                 alt={apidata?.images[index]?.altText || 'Card Image'}
//                                                 className="rounded-xl w-full h-auto object-cover border border-slate-400" // Ensure image adjusts height automatically
//                                                 width={320}
//                                                 height={150}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="px-6 ">
//                                         <h2 className="text-2xl font-bold text-center text-primary">{card.title}</h2>
//                                         <div
//                                             className="text-muted-foreground text-center mt-2"
//                                             dangerouslySetInnerHTML={{ __html: card.content }}
//                                         ></div>
//                                         <hr className="my-4 border-border" />
//                                         <div
//                                             className="text-center text-muted"
//                                             dangerouslySetInnerHTML={{ __html: card.info }}
//                                         ></div>
//                                         <div className="w-full absolute right-2/4 translate-x-2/4 -bottom-5">
//                                             <button
//                                                 className={`${index === activeIndex ? "bg-white text-black shadow-md" : "bg-[#013466] hover:bg-red-600 text-white"}  flex m-auto items-center justify-center py-3 px-5 rounded-full`}
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
//     console.log("active index show is here",activeIndex)

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
//         slidesToShow: 3,  // Display 3 images at once
//         speed: 500,
//         autoplay: apidata?.card.length > 3,
//         autoplaySpeed: 3000,
//         beforeChange: (current, next) => {
//             // Calculate the middle index and target it
//             // If next index is in the middle (index 1), or first (index 0)
//             const middleIndex = 1;
//             const firstIndex = 0;
            
//             // Set the active index based on the direction of the slide
//             if (next === middleIndex || next === firstIndex) {
//                 setActiveIndex(next);
//             } else {
//                 setActiveIndex(middleIndex); // Fallback to middle
//             }
//         },
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: Math.min(3, apidata?.card.length),
//                     centerMode: true,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                 },
//             },
//         ],
//     };
    
    
    
    




//     return (
//         <div ref={ref}>
//             <div className="container text-center pt-20 pb-10">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
//                 <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
//             </div>
//             <div className="container overflow-hidden">
//                 <Slider {...settings} className="homepage-card-slider">
//                     {apidata?.card.map((card, index) => (
//                         <div key={index}>

//                             <motion.div
//                                 key={index}
//                                 className={`${index === activeIndex || (apidata?.card.length <= 3 && index === Math.floor(apidata?.card.length / 2))
//                                     ? 'bg-[#FF5733] text-white scale-105' // Active card styling
//                                     : 'bg-white text-black' // Default card styling
//                                     } grow lg:max-w-[360px] relative pb-10 max-w-[350px] mx-auto h-full bg-card border rounded-lg shadow-lg mt-10 transition-transform duration-300`}
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
//                                         <h2 className="text-2xl font-bold text-center text-primary">{card.title+ index } </h2>
//                                         <div
//                                             className="text-muted-foreground text-center mt-2"
//                                             dangerouslySetInnerHTML={{ __html: card.content }}
//                                         ></div>
//                                         <hr className="my-4 border-border" />
//                                         <div
//                                             className="text-center text-muted"
//                                             dangerouslySetInnerHTML={{ __html: card.info }}
//                                         ></div>
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
        autoplay: apidata?.card.length > 3,
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
        ],
    };

    return (
        <div ref={ref}>
            <div className="container text-center pt-20 pb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{apidata?.heading}</h2>
                <p className="mt-2 text-base md:text-xl">{apidata?.content}</p>
            </div>
            <div className="container overflow-hidden">
                <Slider {...settings} className="homepage-card-slider">
                    {apidata?.card.map((card, index) => (
                        <div key={index}>

                            <motion.div
                                key={index}
                                className={`${index === activeIndex
                                    ? 'bg-[#013466] text-white scale-105' // Active card styling
                                    : 'bg-white text-black' // Default card styling
                                    } grow lg:max-w-[360px] relative pb-10 max-w-[350px] mx-auto h-full bg-card border rounded-lg shadow-lg mt-10 transition-transform duration-300`}
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
                                    <div className="px-6">
                                        <h2 className="text-2xl font-bold text-center text-primary">{card.title + index}</h2>
                                        <div
                                            className="text-muted-foreground text-center mt-2"
                                            dangerouslySetInnerHTML={{ __html: card.content }}
                                        ></div>
                                        <hr className="my-4 border-border" />
                                        <div
                                            className="text-center text-muted"
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
