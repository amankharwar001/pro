import React from "react";
import Image from "next/image";
import { Fade,Zoom } from 'react-awesome-reveal';


const Brand = ({section2,baseUrl}) => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto lg:grid grid-cols-3 items-center gap-8">
        {/* Heading Section with Fade Effect */}
        <Fade triggerOnce>
          <h5 className="font-bold text-lg text-center lg:text-left mb-6 lg:mb-0 lg:max-w-[300px] leading-snug">
            {/* ACCEPTABLE TO MILLIONS OF CUSTOMERS WORLDWIDE AND IN TOP MARKETPLACES. */}
            {section2.section2Data.title}
          </h5>
        </Fade>

        {/* Images Section with Zoom Effect */}
        <div className="col-span-2 lg:border-l border-slate-300 grid grid-cols-2 gap-5 md:flex justify-around items-center px-4 lg:px-10">
          {section2.Images.map((src, index) => (
            <Zoom triggerOnce key={index}>
              <div className="flex justify-center w-full">
                <Image
                  src={`${baseUrl}${src.filePath}`}
                  alt={src.altText}
                  className="w-24 sm:w-28 md:w-36 lg:w-40"
                  width={250}
                  height={100}
                />
              </div>
            </Zoom>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
