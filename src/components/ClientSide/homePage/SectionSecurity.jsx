import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import { Fade } from 'react-awesome-reveal'; // Import Fade for animation

const SectionSecurity = ({ apidata }) => {
  const { heading, content, btn, btnLink, images } = apidata || {};
  const primaryImage = images && images.length > 0 ? images[0] : null;

  return (
    <div className="bg-[#003066] relative">
      <div className="container overflow-hidden m-auto">
        <div className="bg-primary text-primary-foreground p-6 text-center text-white py-14 max-w-3xl m-auto">

          {/* Animate Image */}
          {primaryImage && (
            <Fade triggerOnce duration={1000}>
              <Image
                src={`/${primaryImage.filePath}`}
                alt={primaryImage.altText || "Section Image"}
                className="w-auto m-auto mb-10"
                width={100}
                height={20}
                layout="intrinsic"
                priority
              />
            </Fade>
          )}

          {/* Animate Heading */}
          <Fade triggerOnce duration={1000} delay={200}>
            <h2 className="text-h2_medium font-bold mb-2">
              {heading}
            </h2>
          </Fade>

          {/* Animate Content */}
          <Fade triggerOnce duration={1000} delay={400}>
            <p className="mt-5 text-p mb-4">
              {content}
            </p>
          </Fade>

          {/* Animate Button */}
          <Fade triggerOnce duration={1000} delay={600} className='flex'>
            <a
              href={btnLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex bg-white text-[#003066] font-bold text-base md:text-lg justify-start m-auto md:justify-center p-2 md:p-4 px-4 md:px-6 rounded-full mt-6"
            >
              {btn}
            </a>
          </Fade>
        </div>
      </div>

      {/* Decorative Images */}
      <div className="absolute animate-zoom-in-out top-2/4 right-[10%] -translate-y-2/4">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-1.png"
          alt="Shape 1"
          className="w-12"
          width={120}
          height={100}
        />
      </div>
      <div className="absolute top-[20%] animate-right-right left-[35%]">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-2.png"
          alt="Shape 2"
          className="w-10"
          width={100}
          height={100}
        />
      </div>
      <div className="absolute animate-right-left top-[4%] right-[30%]">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-3.png"
          alt="Shape 3"
          className="w-12"
          width={100}
          height={100}
        />
      </div>
      <div className="absolute bottom-0 animate-up-down top-[0%] right-[8%]">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-4.png"
          alt="Shape 4"
          className="w-40"
          width={120}
          height={100}
        />
      </div>
      <div className="absolute top-[50%] left-[55%]">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-5.png"
          alt="Shape 5"
          className="w-20"
          width={120}
          height={100}
        />
      </div>
      <div className="absolute bottom-0 right-2/3 animate-zoom-in-out">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-6.png"
          alt="Shape 6"
          className="w-40"
          width={120}
          height={100}
        />
      </div>
      <div className="absolute left-0 bottom-0">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-7.png"
          alt="Shape 7"
          className="w-44 md:w-64 opacity-20"
          width={120}
          height={100}
        />
      </div>
      <div className="absolute -top-10 right-0">
        <Image
          src="/paramotor_assets/yoursecurityourpriority/shape-8.png"
          alt="Shape 8"
          className="w-44 md:w-64 opacity-20"
          width={120}
          height={100}
        />
      </div>
    </div>
  );
};

export default SectionSecurity;
