// import React from "react";
// import { motion } from "framer-motion";
// import Header from "../commonComponent/Header";
// import Link from "next/link";

// const HeroSections = ({ apidata }) => {
//   // Destructure the necessary fields from apidata
//   const { heading, text, btn, btnLink, images } = apidata || {};

//   // Get the image data (first image in the array)
//   const image = images?.[0];

//   if (!apidata) {
//     return <div></div>; // Show a loading state if apidata is not available
//   }

//   return (
//     <div className="bg-[#F2F2F2]">
//       <div className="container  min-w-[360px] overflow-hidden mx-auto pb-5">
//         <Header />

//         <div className="relative bg-zinc-100 rounded-2xl overflow-hidden mt-5 min-h-[45vh] flex flex-col justify-center">
//           {/* Display the hero image */}
//           {image && (
//             <motion.img
//               src={image.filePath}
//               alt={image.altText}
//               className="w-full object-cover h-[45vh] sm:h-[50vh] lg:h-auto rounded-2xl"
//               initial={{ scale: 1.1 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1 }}
//             />
//           )}

//           <div className="absolute z-10 top-20 md:top-1/4 flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold"
//             >
//               {heading}
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mt-5 text-base md:text-xl"
//             >
//               {text}
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className=""
//             >
//               <Link href={btnLink} className="flex w-auto mt-6 rounded-full overflow-hidden">
//                 <button className="flex bg-[#003066] rounded-full text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6">
//                   {btn}
//                 </button>
//               </Link>
//             </motion.div>
//           </div>

//           <div className="absolute bg-black opacity-25 w-full h-full top-0"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSections;






















import React from "react";
import { motion } from "framer-motion";
import Header from "../commonComponent/Header";
import Link from "next/link";

const HeroSections = ({ apidata }) => {
  const { heading, text, btn, btnLink, images } = apidata || {};
  const image = images?.[0];

  if (!apidata) return <div></div>;

  return (
    <div className="bg-[#F2F2F2]  ">
      {/* <div class="p-4 flex flex-col items-center justify-center">
        <div class="cursor-pointer">
          <button class="relative inline-flex items-center justify-center bg-[#013466] px-6 py-3 overflow-hidden font-medium text-teal-600 transition duration-300 ease-out rounded-md shadow-md group">
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease">
            </span>
            <span class="relative text-white">Contact Us</span>
          </button>
        </div>
      </div> */}
      <div className="">
        <div className="container  min-w-[360px] overflow-hidden mx-auto pb-5">
          {/* <Header /> */}

          {/* Hero Section Wrapper */}
          <div className="relative bg-zinc-100 rounded-2xl overflow-hidden  min-h-[45vh] flex flex-col justify-center">
            {/* Hero Image */}
            {image && (
              <motion.img
                src={image.filePath}
                alt={image.altText}
                className="w-full object-cover h-[45vh] sm:h-[50vh] lg:h-auto rounded-2xl"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              />
            )}

            {/* Overlay & Content */}
            <div className="absolute inset-0 bg-black bg-opacity-30 "></div>

            {/* Hero Content */}
            {/* <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-white px-6 sm:px-10"> */}
            <div className="absolute z-10 top-20 md:top-1/4 flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              >
                {heading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-3 text-sm sm:text-base lg:text-lg max-w-md"
              >
                {text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-5"
              >
                <Link href={btnLink}>
                  <button className="bg-[#013466] hover:bg-red-600 rounded-full text-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3">
                    {btn}
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSections;
