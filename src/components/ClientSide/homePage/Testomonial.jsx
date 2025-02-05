import React from 'react';
import Image from 'next/image';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = ({ apidata }) => {
  const { heading, content, info, images } = apidata || {};

  return (
    <div>
      <div className="text-center p-8 bg-background mt-10">
        <div>
          <Fade triggerOnce>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{heading || 'Testimonials'}</h1>
          </Fade>
          <Fade triggerOnce direction="down" delay={200}>
            <p className="text-slate-700 mb-8">{content || 'What our users say about us'}</p>
          </Fade>
        </div>
        <Zoom triggerOnce>
          <div className="container  relative h-72 -mb-10 max-w-[1200px]">
            {images?.map((image, index) => {
              const positions = [
                { className: 'absolute right-2/4 translate-x-2/4 top-[45%] md:top-2/4 -translate-y-2/4', size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' },
                { className: 'absolute right-[18%] md:right-[28%] translate-x-2/4 top-2/4 -translate-y-2/4', size: 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' },
                { className: 'absolute right-[5%] md:right-[8%] translate-x-2/4 top-[18%] md:top-1/4 -translate-y-2/4', size: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' },
                { className: 'absolute right-[15%] -translate-x-[10%] top-[25%] -translate-y-2/4', size: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' },
                { className: 'absolute right-0 md:right-[12%] translate-x-2/4 bottom-[32%] md:bottom-[15%] -translate-y-2/4', size: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' },
                { className: 'absolute left-[0%] md:left-[12%] translate-x-2/4 bottom-[32%] md:bottom-[15%] -translate-y-[0] md:-translate-y-2/4', size: 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' },
                { className: 'absolute left-[18%] translate-x-2/4 top-[30%] -translate-y-2/4', size: 'w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14' },
                { className: 'absolute left-[10%] md:left-[28%] translate-x-2/4 top-2/4 -translate-y-2/4', size: 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' },
                { className: 'absolute left-[0%] md:left-[8%] md:translate-x-2/4 top-[20%] -translate-y-2/4', size: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' },
              ];
              const position = positions[index % positions.length];

              return (
                <div key={image.id} className={position.className}>
                  <Image
                    src={`/${image.filePath}`}
                    alt={image.altText || `Testimonial image ${index + 1}`}
                    className={`bg-slate-200 rounded-full object-cover ${position.size}`}
                    width={96}
                    height={96}
                  />
                </div>
              );
            })}
          </div>
        </Zoom>

        <div className="relative mb-8">
          <Slide direction="up" triggerOnce>
            <blockquote className="bg-card p-10 rounded-lg shadow-lg max-w-xl m-auto border">
              <span  >
                <FaQuoteLeft size={30} className='text-blue-50 mb-5' />
              </span>
              {/* {info || 'Using a debit card makes my transactions easier and more practical. - John Doe, Customer'} */}
              <div
                dangerouslySetInnerHTML={{ __html: info || 'Using a debit card makes my transactions easier and more practical. - John Doe, Customer' }}
              ></div>
            </blockquote>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
