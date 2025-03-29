import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";

const Brand = ({ section2, baseUrl }) => {
  const settings = {
    dots: false,
    infinite: section2.Images.length > 4, 
    slidesToShow: Math.min(4, section2.Images.length), 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1200,
    cssEase: "linear",
    arrows: false,
    centerMode: true, 
    responsive: [
      {
        breakpoint: 1024, // Tablets & small desktops
        settings: {
          slidesToShow: Math.min(3, section2.Images.length),
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: Math.min(3, section2.Images.length),
          centerMode: true,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="container flex flex-col md:flex-row items-center justify-center lg:justify-between gap-8">
        {/* Heading Section with Fade Effect */}
        <Fade triggerOnce>
          <h5 className="text_h5 text-gray-500 mb-6 max-w-[350px] text-center md:text-left">
            {section2.section2Data.title}
          </h5>
        </Fade>

        {/* Image Carousel Section */}
        <div className="w-full md:w-[70%] px-2 md:px-4">
          <Slider {...settings} className="product-brand-slider">
            {section2.Images.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-40 p-2 md:w-52 md:h-30 flex justify-end items-center h-auto gap-5 px-6"> 
                <Image
                  src={`${baseUrl}${src.filePath}`}
                  alt={src.altText}
                  className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40  transition-all duration-300 ease-in-out "
                  width={200}
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
