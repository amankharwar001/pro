import React from 'react';
import Image from "next/image";
import { Fade,Zoom } from 'react-awesome-reveal';

const CardSection2 = ({ section4, baseUrl }) => {
    const primaryImage = section4.Images.find(
        (image) => image.referenceId === 4
    );
    return (
        <div className="relative bg-white py-16  lg:px-20 overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-col lg:flex-row items-center gap-10">
                
                {/* Left Side - Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <Fade triggerOnce delay={100}>
                        <h2 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
                            {section4.section4Data.heading}
                        </h2>
                    </Fade>
                    <Fade triggerOnce delay={300}>
                        <p className="mt-4 text-gray-600 text-sm md:text-base">
                            {section4.section4Data.text}
                        </p>
                    </Fade>
                </div>

                {/* Right Side - Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center relative">
                    
                    {/* Background Circle */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-[#fff2d7] to-[#f8d9d5] opacity-50 custom-border-radius-2"></div>
                    </div>
                    
                    {/* Responsive Image */}
                    <div className="relative w-full max-w-[400px] lg:max-w-[550px]">
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
            </div>
        </div>
    );
}

export default CardSection2;
