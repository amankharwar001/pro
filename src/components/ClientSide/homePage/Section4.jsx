
import React from "react";
import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

const BoxCard = ({ box, image }) => (
  <Zoom triggerOnce delay={300} className="md:w-full  flex-grow">
    <div className="bg-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl flex flex-col sm:flex-row gap-4">
      {/* Image Section */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="bg-black rounded-full p-1 w-16 h-16 flex items-center justify-center">
          <Image
            width={100}
            height={100}
            aria-hidden="true"
            alt="icon"
            src={image?.filePath || "/default-image.jpg"}
          />
        </div>
      </div>
      {/* Content Section */}
      <div className="flex-1">
        <h5 className="text-h5 font-bold mb-2">{box?.heading}</h5>
        <p className="text-p">{box?.content}</p>
      </div>
    </div>
  </Zoom>
);

const Section4 = ({ apidata }) => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="md:grid grid-cols-2 ">
          <Fade triggerOnce direction="up" className="max-w-lg">
            <h2 className="text-h2_medium font-bold mb-4 lg:mb-0  text-center md:text-start w-full ">{apidata?.heading}</h2>
          </Fade>
          <div className="relative max-w-3xl">
            <Fade triggerOnce direction="up" delay={200}>
              <p className=" text-p text-center md:text-start pb-5">{apidata?.content}</p>
            </Fade>
            <span className="m-auto flex md:absolute w-32 h-[3px] bg-blue-900"></span>
          </div>
        </div>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-7 mt-10">
          {apidata?.boxes?.map((box, index) => (
            <BoxCard key={index} box={box} image={apidata?.images[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
