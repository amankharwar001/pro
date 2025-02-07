
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const HeroSections = ({
//   heroSection = {},
//   image = "",
//   baseUrl = "",
//   alttext = "Default Alt Text",
// }) => {
//   return (
//     <div className="bg-[#F2F2F2] w-full pb-5 pt-2">
//       <div className="container min-w-[360px] overflow-hidden mx-auto pb-5">
//         {/* Hero Section Wrapper */}
//         <div className="relative bg-zinc-100 rounded-2xl overflow-hidden min-h-[45vh] flex flex-col justify-center">
//           {/* Hero Image */}
//           {image ? (
//             <motion.img
//               src={image ? `${baseUrl}${image}` : "/default-hero-image.jpg"}
//               alt={alttext}
//               className="w-full object-cover h-[45vh] sm:h-[50vh] lg:h-auto rounded-2xl"
//               initial={{ scale: 1.1 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1 }}
//             />
//           ) : (
//             <motion.div
//               className="w-full h-[45vh] bg-gray-300 rounded-2xl"
//               initial={{ scale: 1.1 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1 }}
//             ></motion.div>
//           )}

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-30"></div>

//           {/* Hero Content */}
//           {/* <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-white px-6 sm:px-10"> */}
//           <div className="absolute z-10 top-20 md:top-1/4 flex md:max-w-2xl flex-col md:pl-20 md:items-start text-white px-7">
//             {/* Title */}
//             {heroSection.title && (
//               <motion.h1
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-[20px] text-slate-200 font-bold"
//               >
//                 {heroSection.title}
//               </motion.h1>
//             )}

//             {/* Heading */}
//             {heroSection.heading && (
//               <motion.h1
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-3xl sm:text-4xl lg:text-5xl font-bold"
//               >
//                 {heroSection.heading}
//               </motion.h1>
//             )}

//             {/* Description */}
//             {heroSection.text && (
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="mt-3 text-sm sm:text-base lg:text-lg max-w-md"
//               >
//                 {heroSection.text}
//               </motion.p>
//             )}

//             {/* Button */}
//             {heroSection.btn && heroSection.btnLink && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className="mt-5"
//               >
//                 <Link href={heroSection.btnLink}>
//                   <button className="bg-[#013466] hover:bg-red-600 rounded-full text-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3">
//                     {heroSection.btn}
//                   </button>
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSections;



import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSections = ({ heroSection = {}, image = "", baseUrl = "", alttext = "Default Alt Text" }) => {
  return (
    <div className="bg-[#F2F2F2] pb-5">
      <div className="container min-w-[360px] overflow-hidden mx-auto pb-5">
        {/* Hero Section Wrapper */}
        <div className="relative bg-zinc-100 rounded-2xl overflow-hidden flex flex-col justify-center min-h-[65vh] lg:min-h-[80vh]">
          {/* Hero Image */}
          {image ? (
            <motion.img
              src={`${baseUrl}${image}`}
              alt={alttext}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          ) : (
            <motion.div
              className="absolute inset-0 w-full h-full bg-gray-300"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            ></motion.div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col md:max-w-3xl md:pl-20 md:items-start text-white px-7">
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

            {heroSection.heading && (
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-h1"
              >
                {heroSection.heading}
              </motion.h1>
            )}

            {heroSection.text && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-3 text-p max-w-md"
              >
                {heroSection.text}
              </motion.p>
            )}

            {heroSection.btn && heroSection.btnLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-5"
              >
                <Link href={heroSection.btnLink}>
                  <button className="bg-[#013466] hover:bg-red-600 rounded-full text-white text-button px-4 sm:px-6 py-2 sm:py-3">
                    {heroSection.btn}
                  </button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSections;
