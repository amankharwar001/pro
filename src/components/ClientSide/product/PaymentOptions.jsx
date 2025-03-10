import React from "react";
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';

const PaymentOptions = ({ section5, baseUrl }) => {
  const primaryImage = section5.Images.find(
    (image) => image.referenceId === 5
  );
  const svg1 = section5.Images.find(
    (image) => image.referenceId === 51
  );
  const svg2 = section5.Images.find(
    (image) => image.referenceId === 52
  );
  const svg3 = section5.Images.find(
    (image) => image.referenceId === 53
  );
  return (
    <div className="bg-[#F5F7FA] py-20  sm:px-8">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image Section */}



        <div className="relative w-full  flex items-center justify-center ">
      {/* Background Image */}
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <Zoom delay={50} triggerOnce>
          <img
            src="/product/bg-1.png"
            alt="Background Image"
            className="w-full h-full object-cover opacity-75"
          />
        </Zoom>
      </div>

      {/* Foreground Image (Girl) */}
      <div className="relative z-20 flex justify-center items-center w-full">
        <Image
          src={`${baseUrl}${primaryImage?.filePath}`}
          alt={primaryImage?.altText}
          width={400} // Default width
          height={600} // Default height
          className="max-w-[50%] md:max-w-[90%] h-auto"
        />
      </div>
    </div>


        {/* Right Side - Text & Cards Section */}
        <div className="text-center lg:text-left space-y-6 md:p-4">
          <Fade triggerOnce delay={100}>
            <h2 className="font-bold text-h2_large">{section5.section5Data.heading}</h2>
          </Fade>
          <Fade triggerOnce delay={300}>
            <p className="text-gray-600 max-w-lg mx-auto lg:mx-0">
              {section5.section5Data.text}
            </p>
          </Fade>

          {/* Cards Section */}
          <div className="grid gap-6">
            {/* Card 1 */}
            <Fade direction="up" delay={400} triggerOnce>
              <div className="sm:flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={`${baseUrl}${svg1?.filePath}`}
                  alt={svg1?.altText}
                  className="w-12 h-12 m-auto sm:m-0"
                  width={50}
                  height={50}
                />
                <div>
                  <h5 className="text_h5 font-semibold">{section5.section5Data.info[0].title}</h5>
                  <p className="text-gray-600 text-p">
                    {section5.section5Data.info[0].content}
                  </p>
                </div>
              </div>
            </Fade>

            {/* Card 2 */}
            <Fade direction="up" delay={500} triggerOnce>
              <div className="sm:flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={`${baseUrl}${svg2?.filePath}`}
                  alt={svg2?.altText}
                  className="w-12 h-12 m-auto sm:m-0"
                  width={50}
                  height={50}
                />
                <div>
                  <h5 className="text_h5 font-semibold">{section5.section5Data.info[1].title}</h5>
                  <p className="text-gray-600 text-p">
                    {section5.section5Data.info[1].content}
                  </p>
                </div>
              </div>
            </Fade>

            {/* Card 3 */}
            <Fade direction="up" delay={600} triggerOnce>
              <div className="sm:flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={`${baseUrl}${svg2?.filePath}`}
                  alt={svg2?.altText}
                  className="w-12 h-12 m-auto sm:m-0"
                  width={50}
                  height={50}
                />
                <div>
                  <h5 className="text_h5 font-semibold">{section5.section5Data.info[2].title}</h5>
                  <p className="text-gray-600 text-p">
                    {section5.section5Data.info[2].content}
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
