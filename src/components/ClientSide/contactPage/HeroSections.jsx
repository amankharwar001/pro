// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion"; // Import motion from framer-motion
// import Header from "../commonComponent/Header";
// import Link from "next/link";

// // const HeroSection?s = ({info,heading,para,img}) => {
// const HeroSections = ({heroSection,image,baseUrl,alttext}) => {
//   return (
//     <div className="bg-[#F2F2F2]">
//       <div className="container mx-auto py-5">
//       <Header/>
//         {/* Image with zoom animation */}
//         <div className="relative bg-zinc-100 my-5 rounded-2xl h-3/4 overflow-hidden">
//           <motion.img
//             src={`${baseUrl}${image}`}
//             alt={alttext||"alttext"}
//             className="h-[60vh] md:h-[70vh] w-full object-cover"
//             initial={{ scale: 1.1 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           />
//           <div className="absolute z-10 top-20 md:top-1/4  flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
//             {/* Title with fade-up animation */}
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-[20px] text-slate-200 font-bold"
//             >
//               {heroSection?.title}
//             </motion.h1>
//             <motion.h1
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl capitalize md:text-5xl lg:text-6xl font-bold"
//             >
//               {heroSection?.heading}
//             </motion.h1>

//             {/* Description with fade-up animation */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="mt-5 text-base md:text-xl"
//             >
//               {heroSection?.text}
//             </motion.p>

//             {/* Button with fade-up animation */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className=""
//             >
//               <Link href={heroSection?.btnLink} className="flex w-auto mt-6 rounded-full overflow-hidden">
//                 <button className="flex bg-[#003066] text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6">
//                 {heroSection?.btn}
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
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../commonComponent/Header";
import Link from "next/link";

const HeroSections = ({ heroSection = {}, image = "", baseUrl = "", alttext = "Default Alt Text" }) => {
  return (
    <div className="bg-[#F2F2F2]">
      <div className="container mx-auto py-5">
        <Header />
        
        {/* Image Section */}
        <div className="relative bg-zinc-100 my-5 rounded-2xl h-3/4 overflow-hidden">
          <motion.img
            src={image ? `${baseUrl}${image}` : "/default-hero-image.jpg"}
            alt={alttext}
            className="h-[60vh] md:h-[70vh] w-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />

          <div className="absolute z-10 top-20 md:top-1/4 flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
            {/* Title */}
            {heroSection.title && (
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[20px] text-slate-200 font-bold"
              >
                {heroSection.title}
              </motion.h1>
            )}

            {/* Heading */}
            {heroSection.heading && (
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl capitalize md:text-5xl lg:text-6xl font-bold"
              >
                {heroSection.heading}
              </motion.h1>
            )}

            {/* Description */}
            {heroSection.text && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-5 text-base md:text-xl"
              >
                {heroSection.text}
              </motion.p>
            )}

            {/* Button */}
            {heroSection.btn && heroSection.btnLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href={heroSection.btnLink} className="flex w-auto mt-6 rounded-full overflow-hidden">
                  <button className="flex bg-[#003066] text-white text-base md:text-lg justify-start md:justify-center p-2 md:p-4 px-4 md:px-6">
                    {heroSection.btn}
                  </button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Overlay */}
          <div className="absolute bg-black opacity-25 w-full h-full top-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSections;
