
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const BrandSection = ({ apidata }) => {
 
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: apidata?.images[1]?.length > 4,
    speed: 1200,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: false, 
    arrows: false, 
    responsive: [
    {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };
  const reversesettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: apidata?.images[0]?.length > 4,
    speed: 1200,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: false, 
    arrows: false, 
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="mt-20 px-0 md:px-0">
      <div className="container  mx-auto py-4 flex flex-col pl-0">
        <div className="flex gap-5  items-center flex-col md:flex-row justify-center lg:justify-between">
          {/* Heading */}
          <div className="w-full md:w-[28%] mb-4 lg:mb-0">
            <div className="relative text-center md:text-left">
              <div
                className="mb-4 font-bold text-center  md:text-start  "
                dangerouslySetInnerHTML={{ __html: apidata?.heading }}
              />
              <span className="absolute w-20 md:w-32 h-[3px] bg-blue-900 hidden lg:block"></span>
            </div>
          </div>

          <div className="w-full md:w-[68%] ">
            {/* Top Row Slider */}
            <div className="lg:hidden">
              <Slider {...reversesettings} className=" brand-slider ">
                {apidata?.images[0]?.slice().reverse().map((logo, index) => (
                  <div key={index} className="flex-shrink-0  w-40 p-2 md:w-52 md:h-18 justify-end flex item-center h-auto gap-5 ">
                    <Image
                      src={logo?.filePath}
                      alt={logo?.altText}
                      width={160}
                      height={80}
                      className="object-contain "
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="hidden lg:block">

            <Slider {...reversesettings} className=" ">
              {apidata?.images[0]?.map((logo, index) => (
                <div key={index} className="flex-shrink-0   w-40 p-2 md:w-52 md:h-18 justify-end flex item-center h-auto gap-5 ">
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
                {apidata?.images[1]?.slice().reverse().map((logo, index) => (
                  <div key={`bottom-row-${index}`} className="flex-shrink-0 w-40p-2 md:w-52 md:h-18 justify-end flex h-auto item-center">
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
            <div className="hidden lg:block mt-4">
              <Slider {...settings}>
                {apidata?.images[1]?.map((logo, index) => (
                  <div key={`bottom-row-${index}`} className="flex-shrink-0  w-40 p-2 md:w-52 md:h-18 justify-end flex item-center h-auto gap-5 ">
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
