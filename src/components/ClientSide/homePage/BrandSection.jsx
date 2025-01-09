import React from "react";
import Image from "next/image";

const BrandSection = ({ apidata }) => {
  
  const logos = [
    { src: "/paramotor_assets/partnerlogo/logo1.png", alt: "@amara logo" },
    { src: "/paramotor_assets/partnerlogo/logo2.png", alt: "treva logo" },
    { src: "/paramotor_assets/partnerlogo/logo3.png", alt: "velocity9 logo" },
    { src: "/paramotor_assets/partnerlogo/logo4.png", alt: "kanba logo" },
    { src: "/paramotor_assets/partnerlogo/logo2.png", alt: "extra logo" }, // Add more logos as needed
  ];

  // Split logos for rows
  const topRow = logos.slice(0, 4); // First 4 images
  const remainingLogos = logos.slice(4); // Remaining images

  // Fill the bottom row with shuffled or repeated images
  const bottomRow = [...remainingLogos, ...logos].slice(0, 4); // Ensure 4 images

  return (
    <div className="mt-10 px-5 md:px-10">
      <div className="container mx-auto py-4 flex flex-col lg:flex-row items-center overflow-hidden">
        {/* Heading */}
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <div className="relative">
            <div
              className="mb-4 font-bold text-center lg:text-start"
              dangerouslySetInnerHTML={{ __html: apidata?.heading }}
            />
            <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
            <span className="absolute block lg:hidden w-44 h-[2px] bg-blue-900 right-1/2 translate-x-2/4"></span>
          </div>
        </div>

        {/* Logos Section */}
        <div className="w-full lg:w-2/3">
          {/* Top Row */}
          <div className="flex justify-start gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {apidata?.images?.map((logo, index) => (
              <div
                key={`top-row-${index}`}
                className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex"
              >
                <Image
                  src={logo.filePath}
                  alt={logo.altText}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex justify-start gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {apidata?.images?.map((logo, index) => (
              <div
                key={`bottom-row-${index}`}
                className="flex-shrink-0 w-36 h-20 md:w-48 md:h-20 justify-end flex"
              >
                <Image
                  src={logo.filePath}
                  alt={logo.altText}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
