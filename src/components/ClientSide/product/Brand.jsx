

// import React from "react";
// import Image from "next/image";
// import { Fade, Zoom } from 'react-awesome-reveal';

// const Brand = ({ section2, baseUrl }) => {
//   return (
//     <div className="bg-gray-50 py-16 px-4">
//       <div className="container mx-auto lg:grid grid-cols-3 items-center gap-8">
//         {/* Heading Section with Fade Effect */}
//         <Fade triggerOnce>
//           <h5 className=" text_h5 text-center lg:text-start text-gray-500 mb-6 lg:mb-0 lg:max-w-[350px] ">
//             {section2.section2Data.title}
//           </h5>
//         </Fade>

//         {/* Images Section with Zoom Effect */}
//         <div className="col-span-2 lg:border-l border-slate-300 grid grid-cols-2 gap-5 md:flex justify-around items-center px-4 lg:px-10">
//           {section2.Images.map((src, index) => (
//             <Zoom triggerOnce key={index}>
//               <div className="flex justify-center w-full">
//                 <Image
//                   src={`${baseUrl}${src.filePath}`}
//                   alt={src.altText}
//                   className="w-24 sm:w-28 md:w-36 lg:w-40 grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
//                   width={250}
//                   height={100}
//                 />
//               </div>
//             </Zoom>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Brand;




// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import React from "react";
// import Image from "next/image";
// import Slider from "react-slick";
// import { Fade } from "react-awesome-reveal";

// const Brand = ({ section2, baseUrl }) => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 4, // Default 4 logos dikhenge
//     slidesToScroll: 1,
//     autoplay: section2.Images.length > 4, // Agar 4+ images hain tabhi autoplay hoga
//     speed: 1200,
//     autoplaySpeed: 5000,
//     cssEase: "linear",
//     arrows: false, // Arrows ko disable kiya hai
//     responsive: [
//       {
//         breakpoint: 1024, // Tablets
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768, // Mobile devices
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480, // Small screens
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-gray-50 py-16 px-4">
//       <div className="container mx-auto lg:grid grid-cols-3 items-center gap-8">
//         {/* Heading Section with Fade Effect */}
//         <Fade triggerOnce>
//           <h5 className="text_h5 text-center lg:text-start text-gray-500 mb-6 lg:mb-0 lg:max-w-[350px]">
//             {section2.section2Data.title}
//           </h5>
//         </Fade>

//         {/* Image Carousel Section */}
//         <div className="col-span-2 lg:border-l border-slate-300 px-4 lg:px-10">
//           <Slider {...settings} className="brand-slider">
//             {section2.Images.map((src, index) => (
//               <div key={index} className="flex justify-center">
//                 <Image
//                   src={`${baseUrl}${src.filePath}`}
//                   alt={src.altText}
//                   className="w-24 sm:w-28 md:w-36 lg:w-40 grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
//                   width={250}
//                   height={100}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Brand;



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";

const Brand = ({ section2, baseUrl }) => {
  const settings = {
    dots: false,
    infinite: section2.Images.length > 4, // Sirf jab 4+ images hon tab scroll hoga
    slidesToShow: Math.min(4, section2.Images.length), // 4 images ya jitni available hain
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: Math.min(3, section2.Images.length),
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: Math.min(2, section2.Images.length),
        },
      },
      {
        breakpoint: 480, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto lg:grid grid-cols-3 items-center gap-8">
        {/* Heading Section with Fade Effect */}
        <Fade triggerOnce>
          <h5 className="text_h5 text-center lg:text-start text-gray-500 mb-6 lg:mb-0 lg:max-w-[350px]">
            {section2.section2Data.title}
          </h5>
        </Fade>

        {/* Image Carousel Section with Spacing */}
        <div className="col-span-2 lg:border-l border-slate-300 px-4 lg:px-10">
          <Slider {...settings} className="brand-slider">
            {section2.Images.map((src, index) => (
              <div key={index} className="px-4 flex justify-center"> {/* Spacing added */}
                <Image
                  src={`${baseUrl}${src.filePath}`}
                  alt={src.altText}
                  className="w-24 sm:w-28 md:w-36 lg:w-40 grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
                  width={250}
                  height={100}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Brand;
