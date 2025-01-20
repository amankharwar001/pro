import React from "react";
import Image from 'next/image';
import { Fade, Zoom } from 'react-awesome-reveal';

const BoxCard = ({ box, image }) => (
  <Zoom triggerOnce delay={300}>
    <div className="bg-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl flex gap-2">
      <div className="w-28">
        {/* Image for Box */}
        {image ? (
          <div className="bg-black rounded-full p-1 w-10 h-10 flex items-center justify-center">
            <Image
              width={100}
              height={100}
              aria-hidden="true"
              alt="icon"
              src={image?.filePath || "/default-image.jpg"}
            />
          </div>
        ) : (
          <div className="bg-black rounded-full p-1 w-10 h-10 flex items-center justify-center">
            <Image
              width={100}
              height={100}
              aria-hidden="true"
              alt="default-image"
              src="/default-image.jpg"
            />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{box?.heading}</h3>
        <p className="text-muted-foreground">
          {box?.content}
        </p>
      </div>
    </div>
  </Zoom>
);

const Section4 = ({ apidata }) => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container  mx-auto px-4">
        <div className="md:flex items-center gap-8">
          {/* Fade In Animation for Heading */}
          <Fade triggerOnce direction="up">
            <h2 className="font-bold text-center md:text-start w-full">
              {apidata?.heading}
            </h2>
          </Fade>

          <div className="relative">
            {/* Fade In Animation for Paragraph */}
            <Fade triggerOnce direction="up" delay={200}>
              <p className="text-center md:text-start pb-5">
                {apidata?.content}
              </p>
            </Fade>

            <span className="m-auto flex md:absolute w-32 h-[3px] bg-blue-900"></span>
          </div>
        </div>

        {/* Grid with Card Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Rendering Boxes */}
          {apidata?.boxes?.map((box, index) => (
            <BoxCard
              key={index}
              box={box}
              image={apidata?.images[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
