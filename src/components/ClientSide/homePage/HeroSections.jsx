



import React from "react";
import { motion } from "framer-motion";
import Header from "../commonComponent/Header";
import Link from "next/link";

const HeroSections = ({ apidata }) => {
  // Destructure the necessary fields from apidata
  const { heading, text, btn, btnLink, images } = apidata || {};

  // Get the image data (first image in the array)
  const image = images?.[0];

  if (!apidata) {
    return <div></div>; // Show a loading state if apidata is not available
  }

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container mx-auto py-5">
        <Header />

        <div className="relative bg-zinc-100 rounded-2xl h-3/4 overflow-hidden mt-5">
          {/* Display the hero image */}
          {image && (
            <motion.img
              src={image.filePath}
              alt={image.altText}
              className="h-[60vh] md:h-[auto] w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          )}
          
          <div className="absolute z-10 top-20 md:top-1/4 flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              {heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 text-base md:text-xl"
            >
              {text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=""
            >
              <Link href={btnLink} className="flex w-auto mt-6 rounded-full overflow-hidden">
                <button className="flex bg-[#003066] text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6">
                  {btn}
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="absolute bg-black opacity-25 w-full h-full top-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSections;
