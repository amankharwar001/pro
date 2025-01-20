// import React from "react";
// import Image from "next/image";

// const BrandSection = ({ apidata }) => {

//   const logos = [
//     { src: "/paramotor_assets/partnerlogo/logo1.png", alt: "@amara logo" },
//     { src: "/paramotor_assets/partnerlogo/logo2.png", alt: "treva logo" },
//     { src: "/paramotor_assets/partnerlogo/logo3.png", alt: "velocity9 logo" },
//     { src: "/paramotor_assets/partnerlogo/logo4.png", alt: "kanba logo" },
//     { src: "/paramotor_assets/partnerlogo/logo2.png", alt: "extra logo" }, // Add more logos as needed
//   ];

//   // Split logos for rows
//   const topRow = logos.slice(0, 4); // First 4 images
//   const remainingLogos = logos.slice(4); // Remaining images

//   // Fill the bottom row with shuffled or repeated images
//   const bottomRow = [...remainingLogos, ...logos].slice(0, 4); // Ensure 4 images

//   return (
//     <div className="mt-10 px-5 md:px-10">
//       <div className="container mx-auto py-4 flex flex-col lg:flex-row items-center overflow-hidden">
//         {/* Heading */}
//         <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
//           <div className="relative">
//             <div
//               className="mb-4 font-bold text-center lg:text-start"
//               dangerouslySetInnerHTML={{ __html: apidata?.heading }}
//             />
//             <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
//             <span className="absolute block lg:hidden w-44 h-[2px] bg-blue-900 right-1/2 translate-x-2/4"></span>
//           </div>
//         </div>

//         {/* Logos Section */}
//         <div className="w-full lg:w-2/3">
//           {/* Top Row */}
//           <div className="flex justify-start gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
//             {apidata?.images?.map((logo, index) => (
//               <div
//                 key={`top-row-${index}`}
//                 className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex"
//               >
//                 <Image
//                   src={logo.filePath}
//                   alt={logo.altText}
//                   width={160}
//                   height={80}
//                   className="object-contain"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Bottom Row */}
//           <div className="flex justify-start gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
//             {apidata?.images?.map((logo, index) => (
//               <div
//                 key={`bottom-row-${index}`}
//                 className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex"
//               >
//                 <Image
//                   src={logo.filePath}
//                   alt={logo.altText}
//                   width={160}
//                   height={80}
//                   className="object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandSection;


// // ye use karo isme react silk ka or normally sare images ko sahi se react silk ke sath kr do or koi logic mt lago simple react silk ki madad se upr niche imges show krwarna ha
// import React from "react";
// import Slider from "react-slick";

// function AutoPlay() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     cssEase: "linear"
//   };
//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <h3>1</h3>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//         <div>
//           <h3>4</h3>
//         </div>
//         <div>
//           <h3>5</h3>
//         </div>
//         <div>
//           <h3>6</h3>
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default AutoPlay;
















// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// import React from "react";
// import Slider from "react-slick";
// import Image from "next/image";

// const BrandSection = ({ apidata }) => {
//   const settings = {
//     dots: false, // You can enable dots if needed
//     infinite: true,
//     slidesToShow: 4, // Show 4 logos at a time
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 1500,
//     autoplaySpeed: 1000,
//     cssEase: "linear",
//     responsive: [
//       {
//         breakpoint: 768, // For small devices
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480, // For very small devices
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="mt-10 px-5 md:px-10">
//       {/* <div className="container mx-auto py-4"> */}
//       <div className="container mx-auto py-4 flex flex-col overflow-hidden">
//         <div className=" flex gap-5 items-center  flex-col lg:flex-row">
//           {/* Heading */}
//           <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
//             <div className="relative text-center lg:text-left">
//               <div
//                 className="mb-4 font-bold text-center lg:text-start"
//                 dangerouslySetInnerHTML={{ __html: apidata?.heading }}
//               />
//               <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
//             </div>
//           </div>

//           <div className="w-full lg:w-2/3 ">

//             {/* Top Row Slider */}
//             <Slider {...settings} className="mb-5">
//               {apidata?.images?.map((logo, index) => (
//                 <div key={index} className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex">
//                   <Image
//                     src={logo?.filePath}
//                     alt={logo?.altText}
//                     width={160}
//                     height={80}
//                     className="object-contain"
//                   />
//                 </div>
//               ))}
//             </Slider>

//             {/* Bottom Row Slider */}
//             <Slider {...settings}>
//               {apidata?.images?.map((logo, index) => (
//                 <div key={`bottom-row-${index}`} className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex">
//                   <Image
//                     src={logo?.filePath}
//                     alt={logo?.altText}
//                     width={160}
//                     height={80}
//                     className="object-contain"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandSection;














import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const BrandSection = ({ apidata }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, // Show 4 logos at a time
    slidesToScroll: 1,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 5000,
    cssEase: "linear",
    rtl: false, // Reverse direction
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 768, // For small devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For very small devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const reversesettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, // Show 4 logos at a time
    slidesToScroll: 1,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 6000,
    cssEase: "linear",
    rtl: true, // Reverse direction
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 768, // For small devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For very small devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10 px-5 md:px-10">
      <div className="container  mx-auto py-4 flex flex-col overflow-hidden">
        <div className="flex gap-5  items-center flex-col lg:flex-row">
          {/* Heading */}
          <div className="w-full lg:w-[35%] mb-4 lg:mb-0">
            <div className="relative text-center lg:text-left">
              <div
                className="mb-4 font-bold text-center lg:text-start"
                dangerouslySetInnerHTML={{ __html: apidata?.heading }}
              />
              <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
            </div>
          </div>

          <div className="w-full lg:w-[60%] ">
            {/* Top Row Slider */}
            <div className="lg:hidden">
              <Slider {...reversesettings} className="mb-5 brand-slider ">
                {apidata?.images?.map((logo, index) => (
                  <div key={index} className="flex-shrink-0 w-36  md:w-48 md:h-20 justify-end flex item-center h-auto gap-5 ">
                    <Image
                      src={logo?.filePath}
                      alt={logo?.altText}
                      width={160}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="hidden lg:block">

            <Slider {...reversesettings} className="mb-5 ">
              {apidata?.images?.map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-36  md:w-48 md:h-20 justify-end flex item-center h-auto gap-5 ">
                  <Image
                    src={logo?.filePath}
                    alt={logo?.altText}
                    width={160}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </Slider>
            </div>

            {/* Bottom Row Slider */}
            <div className="lg:hidden">
              <Slider {...settings} className=" brand-slider">
                {apidata?.images?.map((logo, index) => (
                  <div key={`bottom-row-${index}`} className="flex-shrink-0 w-36 md:w-48 md:h-20 justify-end flex h-auto item-center">
                    <Image
                      src={logo?.filePath}
                      alt={logo?.altText}
                      width={160}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="hidden lg:block">
              <Slider {...settings}>
                {apidata?.images?.map((logo, index) => (
                  <div key={`bottom-row-${index}`} className="flex-shrink-0 w-36 md:w-48 md:h-20 justify-end flex h-auto item-center">
                    <Image
                      src={logo?.filePath}
                      alt={logo?.altText}
                      width={160}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
