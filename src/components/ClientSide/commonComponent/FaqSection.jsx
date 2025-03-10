





import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { FaMinus } from "react-icons/fa6";
import { Fade } from "react-awesome-reveal"; 
const FaqSection = ({ apidata }) => {
  const [activeIndex, setActiveIndex] = useState(0); // First FAQ open by default

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mb-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h2_medium font-bold text-black">
            {apidata?.heading}
          </h2>
        </div>
        <div className="max-w-[60rem] mx-auto mt-8 space-y-4 md:mt-16">
          {apidata?.questions?.map((faq, index) => (
            <Fade key={index} triggerOnce duration={1000} delay={index * 200}>
              <div
                key={index}
                className={`${
                  activeIndex === index ? "pb-5" : "pb-0"
                } bg-white border border-gray-200 shadow-md hover:shadow-xl cursor-pointer overflow-hidden  rounded-md`}
                
                
              >
                <button
                  type="button"
                  onClick={() => toggleAnswer(index)}
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h4 className="text-h4 text-start font-semibold text-gray-800">
                    {faq.question}
                  </h4>
                  <span
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-300`}
                  >
                    {/* Display + when closed and - when open */}
                    {activeIndex === index ? (
                      <FaMinus size={20}/>
                    ) : (
                      <span className="relative"><FaMinus size={20} /><FaMinus size={20} className="absolute top-0 rotate-90" /></span>
                    )}
                  </span>
                </button>

                {/* Animate the answer */}
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={activeIndex === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="sm:px-6 px-4 bg-white"
                >
                  <div
                    className="text-sm text-start text-slate-700 bg-white"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></div>
                </motion.div>
              </div>
            </Fade>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FaqSection;












// import React, { useState } from "react";
// import { Fade } from "react-awesome-reveal"; // Import Fade for animation
// import { FaMinus } from "react-icons/fa6";

// const FaqSection = ({ apidata }) => {
//   const [activeIndex, setActiveIndex] = useState(0); // First FAQ open by default

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
//   };

//   return (
//     <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mb-20">
//       <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div className="max-w-2xl mx-auto text-center">
//           <Fade triggerOnce duration={1000}>
//             <h2 className="text-h2_medium font-bold text-black">{apidata?.heading}</h2>
//           </Fade>
//         </div>
//         <div className="max-w-[60rem] mx-auto mt-8 space-y-4 md:mt-16">
//           {apidata?.questions?.map((faq, index) => (
//             <Fade key={index} triggerOnce duration={1000*index+1}>
//               <div
//                 className="bg-white border border-gray-200 shadow-md hover:shadow-xl cursor-pointer overflow-hidden rounded-md"
//                 onClick={() => toggleAnswer(index)}
//               >
//                 <button
//                   type="button"
//                   className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
//                   aria-expanded={activeIndex === index}
//                   aria-controls={`faq-answer-${index}`}
//                 >
//                   <h4 className="text-h4 text-start font-semibold text-gray-800">{faq.question}</h4>
//                   <span
//                     className={`w-6 h-6 text-gray-400 transform transition-transform duration-300`}
//                   >
//                     {activeIndex === index ? (
//                       <FaMinus/>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
//                       </svg>
//                     )}
//                   </span>
//                 </button>
//                 {activeIndex === index && (
//                   <Fade triggerOnce duration={1000}>
//                     <div id={`faq-answer-${index}`} className="sm:px-6 px-4 bg-white">
//                       <div
//                         className="text-sm text-start text-slate-700 bg-white py-4"
//                         dangerouslySetInnerHTML={{ __html: faq.answer }}
//                       ></div>
//                     </div>
//                   </Fade>
//                 )}
//               </div>
//             </Fade>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;













// import React, { useState } from "react";
// import { Fade } from "react-awesome-reveal";
// import { FaMinus } from "react-icons/fa6";

// const FaqSection = ({ apidata }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mb-20">
//       <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div className="max-w-2xl mx-auto text-center">
//           <Fade triggerOnce duration={1000}>
//             <h2 className="text-h2_medium font-bold text-black">{apidata?.heading}</h2>
//           </Fade>
//         </div>
//         <div className="max-w-[60rem] mx-auto mt-8 space-y-4 md:mt-16">
//           {apidata?.questions?.map((faq, index) => (
//             <Fade key={index} triggerOnce duration={1000} delay={index * 200}>
//               <div
//                 className="bg-white border border-gray-200 shadow-md hover:shadow-xl cursor-pointer overflow-hidden rounded-md"
//                 onClick={() => toggleAnswer(index)}
//               >
//                 <button
//                   type="button"
//                   className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
//                   aria-expanded={activeIndex === index}
//                   aria-controls={`faq-answer-${index}`}
//                 >
//                   <h4 className="text-h4 text-start font-semibold text-gray-800">{faq.question}</h4>
//                   <span className="w-6 h-6 text-gray-400 transform transition-transform duration-300">
//                     {activeIndex === index ? (
//                       <FaMinus />
//                     ) : (
//                       <span className="relative"><FaMinus /><FaMinus className="absolute top-0 rotate-90" /></span>
//                     )}
//                   </span>
//                 </button>
//                 {activeIndex === index && (
//                   <Fade triggerOnce duration={600}>
//                     <div id={`faq-answer-${index}`} className="sm:px-6 px-4 bg-white">
//                       <div
//                         className="text-sm text-start text-slate-700 bg-white py-4"
//                         dangerouslySetInnerHTML={{ __html: faq.answer }}
//                       ></div>
//                     </div>
//                   </Fade>
//                 )}
//               </div>
//             </Fade>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;
