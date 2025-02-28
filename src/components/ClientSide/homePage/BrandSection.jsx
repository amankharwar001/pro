
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
    <div className="mt-20 px-5 md:px-10">
      <div className="container  mx-auto py-4 flex flex-col ">
        <div className="flex gap-5  items-center flex-col lg:flex-row justify-center lg:justify-between">
          {/* Heading */}
          <div className="w-full lg:w-[28%] mb-4 lg:mb-0">
            <div className="relative text-center lg:text-left">
              <div
                className="mb-4 font-bold text-center  lg:text-start  "
                dangerouslySetInnerHTML={{ __html: apidata?.heading }}
              />
              <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
            </div>
          </div>

          <div className="w-full lg:w-[68%] ">
            {/* Top Row Slider */}
            <div className="lg:hidden">
              <Slider {...reversesettings} className=" brand-slider ">
                {apidata?.images?.map((logo, index) => (
                  <div key={index} className="flex-shrink-0 w-40  md:w-52 md:h-20 justify-end flex item-center h-auto gap-5 ">
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

            <Slider {...reversesettings} className=" ">
              {apidata?.images?.map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-40  md:w-52 md:h-20 justify-end flex item-center h-auto gap-5 ">
                  <Image
                    src={logo?.filePath}
                    alt={logo?.altText}
                    width={180}
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
                  <div key={`bottom-row-${index}`} className="flex-shrink-0 w-40 md:w-52 md:h-20 justify-end flex h-auto item-center">
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
                  <div key={`bottom-row-${index}`} className="flex-shrink-0 w-40  md:w-52 md:h-20 justify-end flex item-center h-auto gap-5 ">
                    <Image
                      src={logo?.filePath}
                      alt={logo?.altText}
                      width={180}
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
