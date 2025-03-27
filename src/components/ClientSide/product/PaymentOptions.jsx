// import React from "react";
// import Image from "next/image";
// import { Fade, Zoom } from "react-awesome-reveal";

// const PaymentOptions = ({ section5, baseUrl }) => {
//   const primaryImage = section5.Images.find((image) => image.referenceId === 5);

  
//   const svgImages = section5.Images.filter((image) => image.referenceId >= 51);

//   const infoItems = section5.section5Data.info || [];

//   return (
//     <div className="bg-[#F5F7FA] py-20 sm:px-8 ptb_11rem">
//       <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        
//         <div className="relative w-full flex items-center justify-center">
          
//           <div className="absolute inset-0 z-10 flex justify-center items-center">
//             <Zoom delay={50} triggerOnce>
//               <Image
//                 src={`${baseUrl}/product/bg-1.png`} 
//                 alt="Background Image"
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover opacity-75"
//               />
//             </Zoom>
//           </div>

         
//           <div className="relative z-20 flex justify-center items-center w-full">
//             {primaryImage ? (
//               <Image
//                 src={`${baseUrl}${primaryImage?.filePath}`}
//                 alt={primaryImage?.altText || "Main Image"}
//                 width={400}
//                 height={600}
//                 className="max-w-[50%] md:max-w-[90%] h-auto"
//               />
//             ) : (
//               <p className="text-gray-500">No Image Available</p>
//             )}
//           </div>
//         </div>

       
//         <div className="text-center md:text-left space-y-6 md:p-4 mttab30">
//           <Fade triggerOnce delay={100}>
//             <h2 className="font-bold text-h2_large">{section5.section5Data.heading || "Default Heading"}</h2>
//           </Fade>
//           <Fade triggerOnce delay={300}>
//             <div
//               className="text-gray-600 max-w-lg mx-auto lg:mx-0  "
//               dangerouslySetInnerHTML={{ __html: section5.section5Data.text }}
//             />
          
//           </Fade>

//           {/* Cards Section */}
//           <div className="grid gap-6">
//             {infoItems.map((info, index) => {
//               const icon = svgImages[index]; 
//               return (
//                 <Fade key={index} direction="up" delay={400 + index * 100} triggerOnce>
//                   <div className="sm:flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                     {icon ? (
//                       <Image
//                         src={`${baseUrl}${icon.filePath}`}
//                         alt={icon.altText || `Icon ${index + 1}`}
//                         className="w-12 h-12 m-auto sm:m-0"
//                         width={50}
//                         height={50}
//                       />
//                     ) : (
//                       <div className="w-12 h-12 m-auto sm:m-0 bg-gray-200 rounded-full flex items-center justify-center">
//                         ❌
//                       </div>
//                     )}
//                     <div className="tavleft">
//                       <h5 className="text_h5 font-semibold">{info.title || "Default Title"}</h5>
//                       <div
//                         className="text-gray-600 text-p "
//                         dangerouslySetInnerHTML={{ __html: info.content }}
//                       />
                      
//                     </div>
//                   </div>
//                 </Fade>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentOptions;











import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Fade, Zoom } from "react-awesome-reveal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PaymentOptions = ({ section5, baseUrl }) => {
  const primaryImage = section5.Images.find((image) => image.referenceId === 5);
  const svgImages = section5.Images.filter((image) => image.referenceId >= 51);
  const infoItems = section5.section5Data.info || [];

  // Vertical Slider Settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3, // Number of visible cards
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#F5F7FA] py-20 sm:px-8 ptb_11rem">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side Image Section */}
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <Zoom delay={50} triggerOnce>
              <Image
                src={`${baseUrl}/product/bg-1.png`}
                alt="Background Image"
                width={600}
                height={600}
                className="w-full h-full object-cover opacity-75"
              />
            </Zoom>
          </div>

          <div className="relative z-20 flex justify-center items-center w-full">
            {primaryImage ? (
              <Image
                src={`${baseUrl}${primaryImage?.filePath}`}
                alt={primaryImage?.altText || "Main Image"}
                width={400}
                height={600}
                className="max-w-[50%] md:max-w-[90%] h-auto"
              />
            ) : (
              <p className="text-gray-500">No Image Available</p>
            )}
          </div>
        </div>

        {/* Right Side Content Section */}
        <div className="text-center md:text-left space-y-6 md:p-4 mttab30">
          <Fade triggerOnce delay={100}>
            <h2 className="font-bold text-h2_large">
              {section5.section5Data.heading || "Default Heading"}
            </h2>
          </Fade>
          <Fade triggerOnce delay={300}>
            <div
              className="text-gray-600 max-w-lg mx-auto lg:mx-0"
              dangerouslySetInnerHTML={{ __html: section5.section5Data.text }}
            />
          </Fade>

          {/* Vertical Slider for Cards */}
          <div className="max-h-[400px] overflow-hidden">
            <Slider {...sliderSettings}>
              {infoItems.map((info, index) => {
                const icon = svgImages[index];
                return (
                  <div key={index} className="px-2 mb-4"> {/* Added mb-4 for spacing */}
                    <Fade direction="up" delay={400 + index * 100} triggerOnce>
                      <div className="sm:flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        {icon ? (
                          <Image
                            src={`${baseUrl}${icon.filePath}`}
                            alt={icon.altText || `Icon ${index + 1}`}
                            className="w-12 h-12 m-auto sm:m-0"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div className="w-12 h-12 m-auto sm:m-0 bg-gray-200 rounded-full flex items-center justify-center">
                            ❌
                          </div>
                        )}
                        <div className="tavleft">
                          <h5 className="text_h5 font-semibold">
                            {info.title || "Default Title"}
                          </h5>
                          <div
                            className="text-gray-600 text-p"
                            dangerouslySetInnerHTML={{ __html: info.content }}
                          />
                        </div>
                      </div>
                    </Fade>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
