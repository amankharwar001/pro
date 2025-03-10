import React from 'react';
import Image from 'next/image';
import { Fade, Zoom } from 'react-awesome-reveal';

const AboutUs = ({ data = {}, baseUrl = "" }) => {
  
  const primaryImage = data?.images?.find(
    (image) => image.referenceType === "about_section_primaryImage"
  ) || {};

  const secondaryImage = data?.images?.find(
    (image) => image.referenceType === "about_section_secondaryImage"
  ) || {};

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:space-x-10">

        {/* Text Content */}
        <div className="lg:w-1/2">
          <Fade direction="up" className="flex" triggerOnce delay={100}>
            <h6 className="text-sm bg-[#003167]  text-white font-semibold px-6 py-2 rounded-full uppercase mb-3">
              {data?.title || "Default Title"}
            </h6>
          </Fade>
          <Fade direction="up" triggerOnce delay={300}>
            <h2 className="font-bold about-heading text-gray-900 leading-snug mb-4">
              {data?.heading || "Default Heading"}
            </h2>
          </Fade>
          <Fade triggerOnce delay={400}>
          <div
                className="mb-4  text-start  lg:text-start  "
                dangerouslySetInnerHTML={{ __html: data?.text  }}
              />
            {/* <p>{data?.text || "Default text about your company goes here."}</p> */}
          </Fade>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
          <div className="relative w-full lg:w-auto rounded-lg">
            {/* Primary Image */}
            {primaryImage?.filePath && (
              <Zoom triggerOnce delay={100}>
                <Image
                  src={`${baseUrl}${primaryImage.filePath}`}
                  alt={primaryImage.altText || "Primary Image"}
                  className="w-full md:w-[680px] md:h-[580px] object-cover rounded-lg"
                  width={693}
                  height={580}
                />
              </Zoom>
            )}

            {/* Secondary Image */}
            {secondaryImage?.filePath && (
              <Fade direction="right" triggerOnce delay={200}>
                <div className="hidden md:block absolute bottom-24 -left-10 bg-white overflow-hidden h-44 rounded-lg shadow-md md:w-60">
                  <Image
                    alt={secondaryImage.altText || "Secondary Image"}
                    src={`${baseUrl}${secondaryImage.filePath}`}
                    className="w-full"
                    width={350}
                    height={176}
                  />
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
