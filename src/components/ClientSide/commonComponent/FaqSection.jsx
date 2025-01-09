import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const FaqSection = ({apidata}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the FAQ visibility
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mb-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            {apidata?.heading}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {apidata?.questions?.map((faq, index) => (
            <motion.div
              key={index}
              className={`${activeIndex === index?"pb-5":"pb-0"} bg-white border border-gray-200 shadow-lg  cursor-pointer overflow-hidden hover:bg-gray-50`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }} // Animation duration
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-black">{faq.question}</span>
                <span
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  {/* Display + when closed and - when open */}
                  {activeIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {/* Animate the answer */}
              {activeIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }} // Animation duration for the answer
                  className=" sm:px-6   px-4 "
                  // className="px-4 "
                 
                >
                  <div className='text-sm'  dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-center text-gray-600 text-base mt-9" dangerouslySetInnerHTML={{ __html: apidata?.bottomtext }}>
          
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
