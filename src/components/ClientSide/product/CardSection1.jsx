import React from 'react';
import Image from "next/image";
import { Fade, Zoom } from 'react-awesome-reveal';

const CardSection1 = ({ section3, baseUrl }) => {

    const primaryImage = section3.Images.find(
        (image) => image.referenceId === 3
    );
    const svg1 = section3.Images.find(
        (image) => image.referenceId === 31
    );
    const svg2 = section3.Images.find(
        (image) => image.referenceId === 32
    );

    return (
        <div className="bg-white sm-pb-0 py-20 mt-0 lg:px-20">
            <div className="container mx-auto flex flex-col md:flex-row lg:flex-row items-center gap-10">

                {/* Left Side - Card Image */}
                <div className="relative flex-shrink-0 w-full md:w-1/2 flex justify-center lg:justify-start tabmb_30">
                    {/* Background Circle */}
                    <div className="absolute top-1/2 -translate-y-2/4  lg:left-2 lg:top-2/4 lg:-translate-y-2/4 flex justify-center items-center">
                        <div className="w-[220px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-[#fff2d7] to-[#f8d9d5] opacity-50 custom-border-radius-1"></div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full max-w-[320px] lg:max-w-[450px] xl:left-14">
                        <Zoom triggerOnce delay={50}>

                            <Image
                                src={`${baseUrl}${primaryImage?.filePath}`}
                                alt={primaryImage?.altText}
                                layout="responsive"
                                width={550} // Width ratio for responsive behavior
                                height={350} // Height ratio for responsive behavior
                                className="rounded-lg"
                            />
                        </Zoom>
                    </div>
                </div>

                {/* Right Side - Text Content */}
                <div className=" text-center md:text-start flex-1">
                    <Fade triggerOnce delay={100}>
                        <h2 className="font-bold text-gray-900 text-h2_large">
                            {section3.section3Data.heading}
                        </h2>
                    </Fade>
                    <Fade triggerOnce direction='left' delay={300}>
                        <div
                            className="mt-4 text-gray-600 text-p md:border-l-2 pl-4 border-blue-500  "
                            dangerouslySetInnerHTML={{ __html: section3.section3Data.text }}
                        />
                    </Fade>

                    {/* Features Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 tabhalf_grid">
                        {/* Online Payments Feature */}
                        <Fade triggerOnce delay={500}>
                            <div>
                                {svg1 && (
                                    <div className="flex-shrink-0 w-10 h-10 m-auto md:m-0 rounded-full bg-red-100 flex items-center justify-center mb-3">
                                        <Image
                                            src={`${baseUrl}${svg1?.filePath}`}
                                            alt={svg1?.altText || "Default Alt Text"}
                                            className="w-6 h-6 rounded-full object-contain"
                                            width={550}
                                            height={20}
                                        />
                                    </div>
                                )}
                                <div>
                                    <h5 className="text_h6 font-semibold text-gray-900 mt-2">{section3.section3Data.info[0].title}</h5>
                                    <p className="text-gray-600 text-p">{section3.section3Data.info[0].content}</p>
                                </div>
                            </div>
                        </Fade>

                        {/* Safe Deposit Feature */}
                        <Fade triggerOnce delay={600}>
                            <div>
                                {svg2 && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full m-auto md:m-0 bg-green-100 flex items-center justify-center mb-3">
                                        <Image
                                            src={`${baseUrl}${svg2?.filePath}`}
                                            alt={svg2?.altText || "Default Alt Text"}
                                            className="w-6 h-6 rounded-full object-contain"
                                            width={550}
                                            height={20}
                                        />
                                    </div>
                                )}
                                <div>
                                    <h5 className="text_h6 font-semibold text-gray-900 mt-2">{section3.section3Data.info[1].title}</h5>
                                    <p className="text-gray-600 text-p">{section3.section3Data.info[1].content}</p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardSection1;
